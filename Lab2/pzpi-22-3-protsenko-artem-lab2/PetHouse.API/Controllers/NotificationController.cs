using Microsoft.AspNetCore.Mvc;
using PetHouse.Application.Contracts.Notification;
using PetHouse.Application.Interfaces.Services;

namespace PetHouse.API.Controllers;

[ApiController]
[Route("api/notifications")]
public class NotificationController : ControllerBase
{
   private readonly INotificationService _notificationService;
   
   public NotificationController(INotificationService notificationService)
   {
      _notificationService = notificationService;
   }

   [HttpGet]
   public async Task<IActionResult> GetAllNotifications()
   {
      var notifications = await _notificationService.GetAll();
      return Ok(notifications);
   }

   [HttpGet("{userId:guid}")]
   public async Task<IActionResult> GetNotificationByUserId(Guid userId)
   {
      var notifications = await _notificationService.GetNotificationsByUserId(userId);
      return Ok(notifications);
   }

   [HttpDelete("{notificationId:guid}")]
   public async Task<IActionResult> DeleteNotification(Guid notificationId)
   {
      var notificationDeletionResult = await _notificationService.DeleteAsync(notificationId);
      return Ok(notificationDeletionResult);
   }

   [HttpPost]
   public async Task<IActionResult> CreateNotification(CreateNotificationRequest request)
   {
      var createNotificationResult = await _notificationService
         .CreateNotification(request.UserId, request.Message);

      return Ok(createNotificationResult);
   }
}