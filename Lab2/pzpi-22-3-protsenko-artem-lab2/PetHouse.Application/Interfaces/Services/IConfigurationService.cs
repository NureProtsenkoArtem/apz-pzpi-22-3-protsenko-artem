using PetHouse.Application.Contracts.Configuration;

namespace PetHouse.Application.Interfaces.Services;

public interface IConfigurationService
{
   ConfigurationDto GetServerConfiguration();
   Task ChangeConfiguration(ConfigurationDto configurationDto);
}