using Npgsql;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using PetHouse.Application.Interfaces;
using PetHouse.Core.Enums.Meal;
using PetHouse.Persistence.Interfaces;

namespace PetHouse.Application.Services;

public class StatisticService : IStatisticService
{
   private readonly IUserRepository _userRepository;
   private readonly IPetRepository _petRepository;
   private readonly IMealRepository _mealRepository;
   private readonly IHealthAnalysisRepository _healthAnalysisRepository;
   private readonly IDeviceRepository _deviceRepository;

   public StatisticService(IUserRepository userRepository, IPetRepository petRepository,
      IMealRepository mealRepository, IHealthAnalysisRepository healthAnalysisRepository,
      IDeviceRepository deviceRepository
   )
   {
      _userRepository = userRepository;
      _petRepository = petRepository;
      _mealRepository = mealRepository;
      _healthAnalysisRepository = healthAnalysisRepository;
      _deviceRepository = deviceRepository;
   }

   public async Task<byte[]> GenerateSystemUsageStatisticsPdfAsync()
   {
      var userCount = await _userRepository.CountAsync();
      var petCount = await _petRepository.CountAsync();
      var mealCount = await _mealRepository.CountAsync();
      var healthAnalysisCount = await _healthAnalysisRepository.CountAsync();
      var deviceCount = await _deviceRepository.CountAsync();

      var averageCalories = await CalculateAverageCaloriesAsync();
      var averagePetWeight = await CalculateAveragePetWeightAsync();
      var avgPetsPerUser = CalculateRatio(petCount, userCount);
      var avgDevicesPerUser = CalculateRatio(deviceCount, userCount);
      var avgHealthPerPet = CalculateRatio(healthAnalysisCount, petCount);
      var incompleteMealsCount = await CountIncompleteMealsAsync();
      var avgIntervalHours = await CalculateAverageMealIntervalHoursAsync();
      var (trendLabel, maxDayLabel) = await GetCaloriesTrendAndPeakAsync();

      var document = new PdfDocument();
      var page = document.AddPage();
      var gfx = XGraphics.FromPdfPage(page);
      var font = new XFont("Arial", 14, XFontStyleEx.Regular);

      int y = 40;
      gfx.DrawString("СТАТИСТИКА КОРИСТУВАННЯ СИСТЕМОЮ", font, XBrushes.Black,
         new XRect(0, y, page.Width, page.Height), XStringFormats.TopCenter);
      y += 50;
      gfx.DrawString($"Кількість користувачів: {userCount}", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Кількість тварин: {petCount}", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Кількість пристроїв: {deviceCount}", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Кількість прийомів їжі: {mealCount}", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Кількість медичних аналізів: {healthAnalysisCount}", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Незавершених прийомів їжі: {incompleteMealsCount}", font, XBrushes.Black, 40, y);
      y += 50;
      gfx.DrawString($"Середня кількість спожитих калорій: {Math.Round(averageCalories, 2)} ккал", font, XBrushes.Black,
         40, y);
      y += 30;
      gfx.DrawString($"Середня вага тварин: {Math.Round(averagePetWeight, 2)} кг", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Середня кількість тварин на користувача: {Math.Round(avgPetsPerUser, 2)}", font, XBrushes.Black,
         40, y);
      y += 30;
      gfx.DrawString($"Середня кількість пристроїв на користувача: {Math.Round(avgDevicesPerUser, 2)}", font,
         XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Середня кількість аналізів на тварину: {Math.Round(avgHealthPerPet, 2)}", font, XBrushes.Black,
         40, y);
      y += 30;
      gfx.DrawString($"Середній інтервал між прийомами їжі: {Math.Round(avgIntervalHours, 1)} год", font,
         XBrushes.Black, 40, y);
      y += 50;
      gfx.DrawString("Прогноз:", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Тренд споживання калорій за 7 днів: {trendLabel}", font, XBrushes.Black, 40, y);
      y += 30;
      gfx.DrawString($"Пік споживання калорій: {maxDayLabel}", font, XBrushes.Black, 40, y);

      using var stream = new MemoryStream();
      document.Save(stream, false);
      return stream.ToArray();
   }

   private async Task<double> CalculateAverageCaloriesAsync()
   {
      var completedMeals = await _mealRepository.GetByPredicate(m => m.MealStatus == MealStatus.Completed);
      return completedMeals.Any() ? completedMeals.Average(m => m.CaloriesConsumed) : 0.0;
   }

   private async Task<double> CalculateAveragePetWeightAsync()
   {
      var pets = await _petRepository.GetAll();
      return pets.Any() ? pets.Average(p => p.PetWeight) : 0.0;
   }

   private double CalculateRatio(int numerator, int denominator)
   {
      return denominator > 0 ? (double)numerator / denominator : 0;
   }

   private async Task<int> CountIncompleteMealsAsync()
   {
      return (await _mealRepository.GetByPredicate(m => m.MealStatus != MealStatus.Completed)).Count();
   }

   private async Task<double> CalculateAverageMealIntervalHoursAsync()
   {
      var meals = (await _mealRepository.GetByPredicate(m => m.MealStatus == MealStatus.Completed))
         .OrderBy(m => m.StartTime)
         .ToList();

      if (meals.Count < 2)
         return 0;

      double totalHours = 0;
      for (int i = 1; i < meals.Count; i++)
         totalHours += (meals[i].StartTime - meals[i - 1].StartTime).TotalHours;

      return totalHours / (meals.Count - 1);
   }

   private async Task<(string trend, string maxDay)> GetCaloriesTrendAndPeakAsync()
   {
      var caloriesByDate = await GetCaloriesByDateAsync();
      var today = DateTime.UtcNow.Date;

      var last7Days = caloriesByDate
         .Where(d => d.dayOffset >= -6 && d.dayOffset <= 0)
         .OrderBy(d => d.dayOffset)
         .ToList();

      double trendValue = last7Days.Count >= 2 ? last7Days.Last().calories - last7Days.First().calories : 0;
      string trendLabel = trendValue > 0 ? "Зростання" : trendValue < 0 ? "Зниження" : "Стабільно";

      var maxDay = caloriesByDate.OrderByDescending(c => c.calories).FirstOrDefault();
      string maxDayLabel = $"{Math.Round(maxDay.calories)} ккал ({today.AddDays(maxDay.dayOffset):dd.MM.yyyy})";

      return (trendLabel, maxDayLabel);
   }

   private async Task<List<(int dayOffset, double calories)>> GetCaloriesByDateAsync()
   {
      var meals = await _mealRepository.GetAll();

      var groupedMeals = meals
         .GroupBy(m => m.StartTime.Date)
         .Select(g => new
         {
            Day = g.Key,
            Calories = g.Sum(m => m.CaloriesConsumed)
         })
         .OrderBy(x => x.Day)
         .ToList();

      var result = new List<(int dayOffset, double calories)>();
      var today = DateTime.UtcNow.Date;

      foreach (var group in groupedMeals)
      {
         var dayOffset = (group.Day - today).Days;
         result.Add((dayOffset, group.Calories));
      }

      return result;
   }
}