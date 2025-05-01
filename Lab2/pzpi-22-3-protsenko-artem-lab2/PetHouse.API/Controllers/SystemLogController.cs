using Microsoft.AspNetCore.Mvc;
using PetHouse.API.Helpers;
using PetHouse.Application.Interfaces.Services;
using PetHouse.Core.Enums.User;

namespace PetHouse.API.Controllers;

[ApiController]
[Route("api/system-log")]
public class SystemLogController : ControllerBase
{
   public readonly ISystemLogService _systemLogService;
   public SystemLogController(ISystemLogService systemLogService)
   {
      _systemLogService = systemLogService;
   }

   [HttpGet]
 //  [RoleVerification(Role.ApplicationAdmin)]
   public async Task<IActionResult> GetLogs()
   {
      var systemLogs = await _systemLogService.GetAll();
      return Ok(systemLogs);
   }

   [HttpDelete("delete-old-logs")]
//   [RoleVerification(Role.ApplicationAdmin)]
   public async Task<IActionResult> DeleteOldLogs(int olderThan)
   {
      var systemLogDeletionResult = await _systemLogService.DeleteLogsOlderThanAsync(olderThan);
      return Ok(systemLogDeletionResult);
   }
   
   
}