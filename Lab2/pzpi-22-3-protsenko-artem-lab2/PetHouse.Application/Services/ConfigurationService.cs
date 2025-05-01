using System.Text.Json;
using Microsoft.Extensions.Options;
using PetHouse.Application.Contracts.Configuration;
using PetHouse.Application.Interfaces.Services;

namespace PetHouse.Application.Services;

public class ConfigurationService : IConfigurationService
{
   private readonly IOptionsMonitor<ConfigurationDto> _options;

   public ConfigurationService(IOptionsMonitor<ConfigurationDto> options)
   {
      _options = options;
   }
   
   public ConfigurationDto GetServerConfiguration()
   {
      return _options.CurrentValue;
   }

   public async Task ChangeConfiguration(ConfigurationDto config)
   {
      var newJson = JsonSerializer.Serialize(new { DynamicConfiguration = config },
         new JsonSerializerOptions { WriteIndented = true });
      await File.WriteAllTextAsync("runtimeconfig.json", newJson);
   }
   
}