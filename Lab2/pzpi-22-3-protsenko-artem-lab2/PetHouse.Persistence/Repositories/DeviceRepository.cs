using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Persistence.Repositories;

public class DeviceRepository : GenericRepository<Device>, IDeviceRepository
{
   private readonly PetHouseDbContext _context;
   public DeviceRepository(PetHouseDbContext context) : base(context)
   {
      _context = context;
   }

   public async Task<Device?> GetByUserId(Guid userId)
   {
       return _context.Devices.FirstOrDefault(d => d.UserId == userId);
   }
}