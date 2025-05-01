using PetHouse.Core.Enums.HealthAnalysis;
using PetHouse.Core.Models;

namespace PetHouse.API.Contracts.HealthAnalysis;

public class CreateHealthAnalysisRequest
{
   public DateOnly StartAnalysisDate { get; set; }
   public DateOnly EndAnalysisDate { get; set; }
}