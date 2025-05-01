using AutoMapper;
using PetHouse.Application.Contracts.Meal;
using PetHouse.Core.Models;

namespace PetHouse.Application.Helpers;

public class MappingProfiles : Profile
{
   public MappingProfiles()
   {
      CreateMap<MealDto, Meal>().ReverseMap();
   }
}