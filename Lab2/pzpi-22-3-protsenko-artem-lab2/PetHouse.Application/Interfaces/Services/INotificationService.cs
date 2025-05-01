using PetHouse.Core.Models;

namespace PetHouse.Application.Interfaces.Services;

public interface INotificationService : IGenericService<Notification>
{
   Task<Notification> CreateNotification(Guid userId, string message);
   Task<List<Notification>> GetNotificationsByUserId(Guid userId);
}