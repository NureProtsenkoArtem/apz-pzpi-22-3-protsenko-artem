using PetHouse.Core.Enums.Meal;

namespace PetHouse.Application.Contracts.Meal;

public class MealDto
{
   public Guid MealId { get; set; }
   public Guid PetId { get; set; }
   public double  PortionSize { get; set; }
   public bool IsDaily { get; set; }
   public double CalorificValue { get; set; }
   public double  CaloriesPerMeal { get; set; }
   public DateTime StartTime { get; set; }
   public MealStatus MealStatus { get; set; }
}