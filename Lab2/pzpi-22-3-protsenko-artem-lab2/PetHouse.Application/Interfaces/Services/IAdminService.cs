using PetHouse.Application.Contracts.Server;
using PetHouse.Core.Enums.User;

namespace PetHouse.Application.Interfaces.Services;

public interface IAdminService
{
   Task<string> BackupData(string? outputDirectory);
   Task RestoreDataAsync(string backupFilePath);
   Task SetUserRole(Guid userId, Role newUserRole);
   Task<ServerStatusDto> GetServerStatusAsync();
   Task<DatabaseStatusDto> GetDatabaseStatusAsync();
}