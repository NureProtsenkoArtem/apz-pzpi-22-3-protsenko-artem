using PetHouse.Application.Interfaces.Services;
using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Application.Services;

public class SystemLogService : GenericService<SystemLog>, ISystemLogService
{
   public SystemLogService(IUnitOfWork unitOfWork) : base(unitOfWork)
   {
   }

   public async Task AddLogAsync(string eventType, string message)
   {
      var log = new SystemLog
      {
         Id = Guid.NewGuid(),
         EventType = eventType,
         Message = message,
         CreatedAt = DateTime.UtcNow
      };

      await Repository.Add(log);
   }
   
   public async Task<int> DeleteLogsOlderThanAsync(int days)
   {
      var cutoffDate = DateTime.UtcNow.AddDays(-days);

      var oldLogs = await Repository
         .GetByPredicate(log => log.CreatedAt < cutoffDate);

      if (oldLogs.Count == 0)
         return 0;

      await Repository.DeleteRange(oldLogs);

      return oldLogs.Count;
   }
   
}