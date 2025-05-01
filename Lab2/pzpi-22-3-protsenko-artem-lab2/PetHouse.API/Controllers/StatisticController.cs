using Microsoft.AspNetCore.Mvc;
using PetHouse.Application.Interfaces;

namespace PetHouse.API.Controllers;

[ApiController]
[Route("api/statistic")]
public class StatisticController : ControllerBase
{
   private readonly IStatisticService _statisticService;

   public StatisticController(IStatisticService statisticService)
   {
      _statisticService = statisticService;
   }

   [HttpGet]
   public async Task<IActionResult> GetSystemUsageStatistic()
   {
      var pdfBytes = await _statisticService.GenerateSystemUsageStatisticsPdfAsync();

      return File(pdfBytes, "application/pdf", $"system-usage-statistics-{DateTime.UtcNow}.pdf");
   }
   
}