using PetHouse.Core.Models;

namespace PetHouse.Persistence.Interfaces;

public interface IDeviceRepository : IRepository<Device>
{
   Task<Device?> GetByUserId(Guid userId);
}