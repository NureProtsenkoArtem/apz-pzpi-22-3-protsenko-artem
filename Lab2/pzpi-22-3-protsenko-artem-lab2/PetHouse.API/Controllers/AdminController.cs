using Microsoft.AspNetCore.Mvc;
using PetHouse.API.Helpers;
using PetHouse.Application.Contracts.Configuration;
using PetHouse.Application.Helpers;
using PetHouse.Application.Interfaces.Services;
using PetHouse.Core.Enums.User;

namespace PetHouse.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
   private readonly IAdminService _adminService;
   private readonly IConfigurationService _configurationService;

   public AdminController(IAdminService adminService, IConfigurationService configurationService)
   {
      _adminService = adminService;
      _configurationService = configurationService;
   }

   [HttpGet("backup")]
  // [RoleVerification(Role.DbAdmin)]
   public async Task<IActionResult> BackupDatabase([FromQuery] string outputDirectory = null)
   {
      string backupFilePath = await _adminService.BackupData(outputDirectory);
      return Ok(new { message = $"Backup successfully created at {backupFilePath}" });
   }

   [HttpPost("restore")]
 //  [RoleVerification(Role.DbAdmin)]
   public async Task<IActionResult> RestoreDatabase([FromBody] string backupFilePath)
   {
      await _adminService.RestoreDataAsync(backupFilePath);
      return Ok(new { message = "Database restore completed successfully." });
   }

   [HttpPost("{userId:guid}")]
 //  [RoleVerification(Role.Admin)]
   public async Task<IActionResult> SetUserRole(Guid userId, Role userRole)
   {
      await _adminService.SetUserRole(userId, userRole);
      return Ok(new { Message = "User role was successfully changed" });
   }

   [HttpGet("server-status")]
   //[RoleVerification(Role.ApplicationAdmin)]
   public async Task<IActionResult> GetServerStatus()
   {
      var serverStatus = await _adminService.GetServerStatusAsync();
      return Ok(serverStatus);
   }

   [HttpGet("db-status")] 
   //[RoleVerification(Role.DbAdmin)]
   public async Task<IActionResult> GetDatabaseStatus()
   {
      var dbStatus = await _adminService.GetDatabaseStatusAsync();
      return Ok(dbStatus);
   }

   [HttpGet("server-configuration")]
   //[RoleVerification(Role.ApplicationAdmin)]
   public async Task<IActionResult> GetServerConfiguration()
   {
      var configuration = _configurationService.GetServerConfiguration();

      return Ok(configuration);
   }

   [HttpPost("server-configuration")]
   //[RoleVerification(Role.ApplicationAdmin)]
   public async Task<IActionResult> ChangeServerConfiguration(ConfigurationDto configurationDto)
   {
      await _configurationService.ChangeConfiguration(configurationDto);

      return Ok(new { Message = "Config updated" });
   }
   

}