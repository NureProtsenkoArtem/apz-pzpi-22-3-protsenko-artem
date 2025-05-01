namespace PetHouse.Core.Models;

public class SystemLog
{
   public Guid Id { get; set; }
   public string EventType { get; set; } = default!;
   public string Message { get; set; } = default!;
   public DateTime CreatedAt { get; set; }
}