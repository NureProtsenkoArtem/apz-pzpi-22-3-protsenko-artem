using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Persistence.Repositories;

public class HealthAnalysisRepository : GenericRepository<HealthAnalysis>, IHealthAnalysisRepository
{
   public HealthAnalysisRepository(PetHouseDbContext context) : base(context)
   {
   }
   
}