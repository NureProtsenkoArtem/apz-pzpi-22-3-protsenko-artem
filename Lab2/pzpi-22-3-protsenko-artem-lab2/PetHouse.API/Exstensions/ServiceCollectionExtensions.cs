using Microsoft.OpenApi.Models;
using PetHouse.Application.Interfaces;
using PetHouse.Application.Interfaces.Services;
using PetHouse.Application.Services;
using PetHouse.Persistence.Interfaces;
using PetHouse.Persistence.Repositories;

namespace PetHouse.API.Exstensions;

public static class ServiceCollectionExtensions
{
   public static IServiceCollection AddRepositories(this IServiceCollection services)
   {
      services.AddScoped<IUserRepository, UserRepository>();
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped<IMealRepository, MealRepository>();
      services.AddScoped<IDeviceRepository, DeviceRepository>();
      services.AddScoped<IPetRepository, PetRepository>();
      services.AddScoped<INotificationRepository, NotificationRepository>();
      services.AddScoped<ISystemLogRepository, SystemLogRepository>();
      services.AddScoped<IHealthAnalysisRepository, HealthAnalysisRepository>();
      
      return services;
   }

   public static IServiceCollection AddServices(this IServiceCollection services)
   {
      services.AddScoped<IAuthService, AuthService>();
      services.AddScoped<IStorageService, StorageService>();
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IUserService, UserService>();
      services.AddScoped<IPetService, PetService>();
      services.AddScoped<IDeviceService, DeviceService>();
      services.AddScoped<IHealthAnalysisService, HealthAnalysisService>();
      services.AddScoped<IMealService, MealService>();
      services.AddScoped<IMailService, MailService>();
      services.AddScoped<ISystemLogService, SystemLogService>();
      services.AddScoped<INotificationService, NotificationService>();
      services.AddScoped<IStatisticService, StatisticService>();
      services.AddScoped<IConfigurationService, ConfigurationService>();
      services.AddTransient<IPasswordService, PasswordService>();
      services.AddTransient<IAdminService, AdminService>();
      
      return services;
   }

   public static IServiceCollection AddSwaggerConfig(this IServiceCollection services)
   {
      services.AddSwaggerGen(options =>
      {
         options.EnableAnnotations();

         options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
         {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Введіть токен у форматі 'Bearer {your JWT token}'"
         });

         options.AddSecurityRequirement(new OpenApiSecurityRequirement
         {
            {
               new OpenApiSecurityScheme
               {
                  Reference = new OpenApiReference
                  {
                     Type = ReferenceType.SecurityScheme,
                     Id = "Bearer"
                  }
               },
               Array.Empty<string>()
            }
         });
      });

      return services;
   }
}