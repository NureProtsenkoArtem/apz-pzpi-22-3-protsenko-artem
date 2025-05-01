namespace PetHouse.Application.Contracts.Server;

public class DatabaseStatusDto
{
   public bool IsDatabaseConnected { get; set; }
   public double DatabaseSizeMB { get; set; }
   public DateTime CheckedAt { get; set; }
}