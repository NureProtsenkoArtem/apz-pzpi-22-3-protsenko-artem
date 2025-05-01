using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Persistence.Repositories;

public class PetRepository : GenericRepository<Pet> , IPetRepository
{
   public PetRepository(PetHouseDbContext context) : base(context)
   {
   }
   
}