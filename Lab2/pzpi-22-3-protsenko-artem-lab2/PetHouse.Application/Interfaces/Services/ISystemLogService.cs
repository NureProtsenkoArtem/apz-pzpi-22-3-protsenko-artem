using PetHouse.Core.Models;

namespace PetHouse.Application.Interfaces.Services;

public interface ISystemLogService : IGenericService<SystemLog>
{
   Task AddLogAsync(string eventType, string message);
   Task<int> DeleteLogsOlderThanAsync(int days);
}