using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using PetHouse.Application.Contracts.Server;
using PetHouse.Application.Helpers;
using PetHouse.Application.Interfaces.Services;
using PetHouse.Core.Enums.User;
using PetHouse.Persistence;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Application.Services;

using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Npgsql;

public class AdminService : IAdminService
{
   private readonly string? _connectionString;
   private readonly string _encryptionKey;
   private static readonly DateTime ServerStartTime = DateTime.UtcNow;
   private readonly IUserRepository _userRepository;
   private readonly ISystemLogService _systemLogService;
   private readonly PetHouseDbContext _context;

   public AdminService(IConfiguration configuration, IUserRepository userRepository,
      ISystemLogService systemLogService, PetHouseDbContext context)
   {
      _userRepository = userRepository;
      _systemLogService = systemLogService;
      _context = context;
      _connectionString = configuration.GetConnectionString(nameof(PetHouseDbContext));
      _encryptionKey = configuration["EncryptionKey"];
   }

   // Creates an encrypted JSON backup of the PostgreSQL database.
   public async Task<string> BackupData(string? outputDirectory)
   {
      try
      {
         outputDirectory ??= Path.GetTempPath();
         if (!Directory.Exists(outputDirectory))
         {
            Directory.CreateDirectory(outputDirectory);
         }

         string backupFileName = $"backup_{DateTime.Now:yyyyMMddHHmmss}.json.enc";
         string backupFilePath = Path.Combine(outputDirectory, backupFileName);

         var data = await ExportDatabaseToJson();
         var json = JsonSerializer.Serialize(data, new JsonSerializerOptions
         {
            WriteIndented = true
         });
         await _systemLogService.AddLogAsync("Add Backup", $"Backup data saved in {backupFileName}");

         byte[] encryptedJson = EncryptJson(json, _encryptionKey);

         await File.WriteAllBytesAsync(backupFilePath, encryptedJson);

         return backupFilePath;
      }
      catch (Exception ex)
      {
         await _systemLogService.AddLogAsync("Add Backup", $"Backup data error");
         throw new ApiException($"An error occurred while creating the backup: {ex.Message}", 500);
      }
   }

   // Restores the database from an encrypted JSON backup.
   public async Task RestoreDataAsync(string backupFilePath)
   {
      try
      {
         var data = await ReadAndDecryptBackupAsync(backupFilePath);

         await using var connection = new NpgsqlConnection(_connectionString);
         await connection.OpenAsync();

         var orderedTables = GetOrderedTables(data);

         foreach (var table in orderedTables)
         {
            await TruncateTableAsync(connection, table);

            var rows = data[table];
            foreach (var row in rows)
            {
               await InsertRowAsync(connection, table, row);
            }
         }
         await _systemLogService.AddLogAsync("Restore", $"Backup data {backupFilePath} restored");
      }
      catch (Exception ex)
      {
         await _systemLogService.AddLogAsync("Restore", $"Backup data {backupFilePath} restore failed. {ex.Message}");
         throw new ApiException($"An error occurred during restore: {ex.Message}", 500);
      }
   }

   public async Task SetUserRole(Guid userId, Role newUserRole)
   {
      var user = (await _userRepository.GetByPredicate(u => u.UserId == userId)).FirstOrDefault();

      if (user == null)
      {
         throw new ApiException("Користувач не знайдений", 404);
      }

      user.UserRole = newUserRole;

      await _userRepository.Update(user);
   }

   public async Task<ServerStatusDto> GetServerStatusAsync()
   {
      var uptime = DateTime.UtcNow - ServerStartTime;
      var memoryUsage = GC.GetTotalMemory(false) / (1024.0 * 1024.0);
      
      double cpuUsagePercent = await GetCpuUsageAsync();

      return new ServerStatusDto
      {
         IsAlive = true,
         Uptime = uptime,
         CpuUsagePercent = cpuUsagePercent,
         MemoryUsageMB = memoryUsage
      };
   }

   public async Task<DatabaseStatusDto> GetDatabaseStatusAsync()
   {
      var status = new DatabaseStatusDto
      {
         CheckedAt = DateTime.UtcNow,
         IsDatabaseConnected = false,
         DatabaseSizeMB = 0.0
      };

      try
      {
         var connection = (NpgsqlConnection)_context.Database.GetDbConnection();
         await connection.OpenAsync();

         var dbName = connection.Database;

         var sql = $"SELECT pg_database_size('{dbName}')";

         using var command = new NpgsqlCommand(sql, connection);
         var result = await command.ExecuteScalarAsync();

         if (result != null && long.TryParse(result.ToString(), out long sizeBytes))
         {
            status.DatabaseSizeMB = Math.Round(sizeBytes / 1024.0 / 1024.0, 2);
         }

         status.IsDatabaseConnected = true;
      }
      catch
      {
         status.IsDatabaseConnected = false;
      }
      finally
      {
         if (_context.Database.GetDbConnection().State == System.Data.ConnectionState.Open)
            await _context.Database.CloseConnectionAsync();
      }

      return status;
   }


   private async Task<double> GetCpuUsageAsync()
   {
      using var cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
      
      _ = cpuCounter.NextValue();
      await Task.Delay(500);

      var cpuUsage = cpuCounter.NextValue();
      return Math.Round(cpuUsage, 2);
   }

   // Exports all public tables from the database into a structured JSON object.
   private async Task<Dictionary<string, List<Dictionary<string, object>>>> ExportDatabaseToJson()
   {
      var result = new Dictionary<string, List<Dictionary<string, object>>>();

      await using var connection = new NpgsqlConnection(_connectionString);
      await connection.OpenAsync();

      var tables = new List<string>();
      await using (var cmd = new NpgsqlCommand(
                      "SELECT table_name FROM information_schema.tables WHERE table_schema='public';", connection))
      await using (var reader = await cmd.ExecuteReaderAsync())
      {
         while (await reader.ReadAsync())
         {
            tables.Add(reader.GetString(0));
         }
      }

      foreach (var table in tables)
      {
         var rows = new List<Dictionary<string, object>>();

         await using (var cmd = new NpgsqlCommand($"SELECT * FROM \"{table}\";", connection))
         await using (var reader = await cmd.ExecuteReaderAsync())
         {
            while (await reader.ReadAsync())
            {
               var row = new Dictionary<string, object>();
               for (int i = 0; i < reader.FieldCount; i++)
               {
                  row[reader.GetName(i)] = reader.IsDBNull(i) ? null! : reader.GetValue(i);
               }

               rows.Add(row);
            }
         }

         result[table] = rows;
      }

      return result;
   }

   // Encrypts the given JSON string using AES-256 encryption.
   private byte[] EncryptJson(string plainText, string key)
   {
      using var aes = Aes.Create();
      aes.Key = Encoding.UTF8.GetBytes(PadKey(key, 32));
      aes.GenerateIV();

      using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
      using var ms = new MemoryStream();
      ms.Write(aes.IV, 0, aes.IV.Length);
      using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
      using (var sw = new StreamWriter(cs))
      {
         sw.Write(plainText);
      }

      return ms.ToArray();
   }

   // Decrypts the encrypted JSON data back into a string.
   private string DecryptJson(byte[] cipherData, string key)
   {
      using var aes = Aes.Create();
      aes.Key = Encoding.UTF8.GetBytes(PadKey(key, 32));

      using var ms = new MemoryStream(cipherData);

      byte[] iv = new byte[16];
      ms.Read(iv, 0, iv.Length);
      aes.IV = iv;

      using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
      using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
      using var sr = new StreamReader(cs);
      return sr.ReadToEnd();
   }

   // Pads or trims the encryption key to the required length.
   private string PadKey(string key, int length)
   {
      if (key.Length > length)
         return key.Substring(0, length);
      if (key.Length < length)
         return key.PadRight(length, '0');
      return key;
   }

   private async Task<Dictionary<string, List<Dictionary<string, object>>>> ReadAndDecryptBackupAsync(
      string backupFilePath)
   {
      if (!File.Exists(backupFilePath))
      {
         throw new FileNotFoundException("Backup file not found.");
      }

      byte[] encryptedData = await File.ReadAllBytesAsync(backupFilePath);
      string decryptedJson = DecryptJson(encryptedData, _encryptionKey);

      var data = JsonSerializer.Deserialize<Dictionary<string, List<Dictionary<string, object>>>>(decryptedJson);
      if (data == null)
      {
         throw new ApiException("Decrypted backup is empty or invalid.", 500);
      }

      return data;
   }

   private List<string> GetOrderedTables(Dictionary<string, List<Dictionary<string, object>>> data)
   {
      var preferredOrder = new List<string>
      {
         "Users",
         "Pets",
         "HealthAnalyses",
         "PetPhotos",
         "Comments"
      };

      var orderedTables = preferredOrder.Where(data.ContainsKey).ToList();

      orderedTables.AddRange(data.Keys.Except(orderedTables));

      return orderedTables;
   }

   private async Task TruncateTableAsync(NpgsqlConnection connection, string table)
   {
      await using var truncateCmd =
         new NpgsqlCommand($"TRUNCATE TABLE \"{table}\" RESTART IDENTITY CASCADE;", connection);
      await truncateCmd.ExecuteNonQueryAsync();
   }

   private async Task InsertRowAsync(NpgsqlConnection connection, string table, Dictionary<string, object> row)
   {
      var columns = string.Join(", ", row.Keys.Select(k => $"\"{k}\""));
      var parameters = string.Join(", ", row.Keys.Select(k => $"@{k}"));

      await using var insertCommand =
         new NpgsqlCommand($"INSERT INTO \"{table}\" ({columns}) VALUES ({parameters});", connection);

      foreach (var kvp in row)
      {
         var paramName = $"@{kvp.Key}";
         var value = kvp.Value;

         if (value == null)
         {
            insertCommand.Parameters.AddWithValue(paramName, DBNull.Value);
            continue;
         }

         if (kvp.Key.EndsWith("Id", StringComparison.OrdinalIgnoreCase) &&
             Guid.TryParse(value.ToString(), out var guidValue))
         {
            insertCommand.Parameters.AddWithValue(paramName, guidValue);
         }
         else if (value is JsonElement jsonElement)
         {
            switch (jsonElement.ValueKind)
            {
               case JsonValueKind.String:
                  if (Guid.TryParse(jsonElement.GetString(), out var parsedGuid))
                  {
                     insertCommand.Parameters.AddWithValue(paramName, parsedGuid);
                  }
                  else if (DateTime.TryParse(jsonElement.GetString(), out var parsedDateTime))
                  {
                     insertCommand.Parameters.AddWithValue(paramName, parsedDateTime);
                  }
                  else
                  {
                     insertCommand.Parameters.AddWithValue(paramName, jsonElement.GetString());
                  }

                  break;
               case JsonValueKind.Number:
                  if (jsonElement.TryGetInt32(out var intValue))
                  {
                     insertCommand.Parameters.AddWithValue(paramName, intValue);
                  }
                  else if (jsonElement.TryGetDouble(out var doubleValue))
                  {
                     insertCommand.Parameters.AddWithValue(paramName, doubleValue);
                  }

                  break;
               case JsonValueKind.True:
               case JsonValueKind.False:
                  insertCommand.Parameters.AddWithValue(paramName, jsonElement.GetBoolean());
                  break;
               case JsonValueKind.Null:
                  insertCommand.Parameters.AddWithValue(paramName, DBNull.Value);
                  break;
               default:
                  insertCommand.Parameters.AddWithValue(paramName, jsonElement.ToString());
                  break;
            }
         }
         else
         {
            insertCommand.Parameters.AddWithValue(paramName, value);
         }
      }

      await insertCommand.ExecuteNonQueryAsync();
   }
   

}