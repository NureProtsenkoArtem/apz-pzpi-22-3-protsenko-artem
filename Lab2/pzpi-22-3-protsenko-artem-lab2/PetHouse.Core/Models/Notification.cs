namespace PetHouse.Core.Models;

public class Notification
{
   public Guid NotificationId { get; set; }
   public Guid UserId { get; set; }
   public User User { get; set; }
   public string Message { get; set; }
}