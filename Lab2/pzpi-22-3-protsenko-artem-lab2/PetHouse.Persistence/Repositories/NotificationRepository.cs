using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Persistence.Repositories;

public class NotificationRepository : GenericRepository<Notification>, INotificationRepository 
{
   public NotificationRepository(PetHouseDbContext context) : base(context)
   {
   }
}