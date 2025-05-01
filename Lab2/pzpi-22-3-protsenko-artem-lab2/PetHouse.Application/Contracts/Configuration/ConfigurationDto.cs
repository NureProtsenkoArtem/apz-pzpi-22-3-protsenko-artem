namespace PetHouse.Application.Contracts.Configuration;

public class ConfigurationDto
{
   public string? AccessSecretKey { get; set; }
   public string? RefreshSecretKey { get; set; }
   public string? EncryptionKey { get; set; }

}