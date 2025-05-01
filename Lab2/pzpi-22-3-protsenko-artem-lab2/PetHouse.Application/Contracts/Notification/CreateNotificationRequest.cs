namespace PetHouse.Application.Contracts.Notification;

public class CreateNotificationRequest
{
   public Guid UserId { get; set; }
   public string Message { get; set; }
}