using Org.BouncyCastle.Crypto.Digests;
using PetHouse.Application.Helpers;
using PetHouse.Application.Interfaces.Services;
using PetHouse.Core.Enums.Device;
using PetHouse.Core.Models;
using PetHouse.Persistence.Interfaces;
using PetHouse.Persistence.Repositories;

namespace PetHouse.Application.Services;

public class DeviceService : GenericService<Device>, IDeviceService
{
   private readonly IUnitOfWork _unitOfWork;
   private readonly ISystemLogService _systemLogService;


   public DeviceService(IUnitOfWork unitOfWork, ISystemLogService systemLogService) : base(unitOfWork)
   {
      _unitOfWork = unitOfWork;
      _systemLogService = systemLogService;
   }

   public async Task<Guid> CreateDevice(Guid userId)
   {
      
      var userRepository = _unitOfWork.Repository<User>();
      var user = await userRepository.FindById(userId);
      if (user == null)
      {
         throw new ApiException("User wasn't found", 404);
      }
      
      var device = new Device
      {
         DeviceId = Guid.NewGuid(),
         UserId = userId,
         Model = "Default Model",
         DeviceStatus = DeviceStatus.Offline,
         FeedingMode = FeedingMode.Pause,
         RecognitionEnabled = false,
         CameraEnabled = false
      };

      await Repository.Add(device);
      
      await _unitOfWork.SaveChangesAsync();
      
      await _systemLogService.AddLogAsync("DeviceCreated", $"Initialize new device {device.DeviceId} for user {userId}");

      return device.DeviceId;
   }

   public async Task<Device> UpdateDevice(Guid deviceId, DeviceStatus deviceStatus, FeedingMode feedingMode,
      bool recognitionEnabled,bool cameraEnabled,double mealsWeight)
   {
      var device = await Repository.FindById(deviceId);

      if (device == null)
         throw new ApiException("Device wasn't found", 404);

      device.DeviceStatus = deviceStatus;
      device.FeedingMode = feedingMode;
      device.RecognitionEnabled = recognitionEnabled;
      device.CameraEnabled = cameraEnabled;
      device.MealWeight = mealsWeight;

      await Repository.Update(device);
      await _unitOfWork.SaveChangesAsync();
      
      await _systemLogService.AddLogAsync("DeviceUpdate", $"Update device {device.DeviceId}");
      return device;
   }

   public async Task<Device?> GetByUserId(Guid userId)
   {
      var device = (await Repository.GetByPredicate(d => d.UserId == userId)).FirstOrDefault();

      return device;
   }

   public async Task ChangeMealWeight(Guid deviceId, double mealWeight)
   {
      var device = await GetById(deviceId);

      if (device == null)
      {
         throw new ApiException("Device not found", 404);
      }

      device.MealWeight = mealWeight;

      await Repository.Update(device);

      await _systemLogService.AddLogAsync(nameof(ChangeMealWeight),
         $"Meal weight for device with Id: {device.DeviceId}");
   }
}