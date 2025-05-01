using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Persistence.Repositories;

public class SystemLogRepository : GenericRepository<SystemLog>, ISystemLogRepository
{
   public SystemLogRepository(PetHouseDbContext context) : base(context)
   {
   }
}