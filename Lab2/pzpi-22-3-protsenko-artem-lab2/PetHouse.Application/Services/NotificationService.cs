using PetHouse.Application.Interfaces.Services;
using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Application.Services;

public class NotificationService : GenericService<Notification>, INotificationService
{
   private readonly ISystemLogService _systemLogService;
   
   public NotificationService(IUnitOfWork unitOfWork, ISystemLogService systemLogService) : base(unitOfWork)
   {
      _systemLogService = systemLogService;
   }


   public async Task<Notification> CreateNotification(Guid userId, string message)
   {
      var notification = new Notification()
      {
         Message = message,
         NotificationId = Guid.NewGuid(),
         UserId = userId,
      };
      
      await Repository.Add(notification);

      await _systemLogService.AddLogAsync("Notification creation","Notification added");

      return notification;
   }

   public async Task<List<Notification>> GetNotificationsByUserId(Guid userId)
   {
      return await Repository.GetByPredicate(n => n.UserId == userId);
   }
}