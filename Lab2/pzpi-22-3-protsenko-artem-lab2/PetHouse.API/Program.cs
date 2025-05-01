using System.Text.Json.Serialization;
using Amazon.S3;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PetHouse.API.Contracts.Storage;
using PetHouse.API.Exstensions;
using PetHouse.API.Helpers;
using PetHouse.Application.Contracts.Configuration;
using PetHouse.Application.Contracts.Mail;
using PetHouse.Application.Interfaces.Services;
using PetHouse.Application.Services;
using PetHouse.Infrastructure.Interfaces;
using PetHouse.Infrastructure.Security;
using PetHouse.Infrastructure.Security.Jwt;
using PetHouse.Persistence;
using PetHouse.Persistence.Interfaces;
using PetHouse.Persistence.Repositories;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var services = builder.Services;

services.AddCors(corsOptions =>
{
   corsOptions.AddPolicy("AllowAll", policy =>
   {
      policy.WithHeaders().AllowAnyHeader();
      policy.WithHeaders().AllowCredentials();
      policy.WithOrigins()
         .AllowAnyMethod()
         .AllowAnyHeader();
   });
});
services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));
services.AddApiAuthentication(configuration);
services.AddControllers().AddJsonOptions(options =>
{
   options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
services.AddEndpointsApiExplorer();
services.AddSwaggerConfig();

services.Configure<SenderSettings>(configuration.GetSection("SenderData"));
services.Configure<AwsOptions>(configuration.GetSection("AWS"));
services.AddSingleton<IAmazonS3>(AwsS3ClientFactory.CreateS3Client(configuration));
services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
configuration.AddJsonFile("runtimeConfig.json", optional: false, reloadOnChange: true);
services.Configure<ConfigurationDto>(configuration.GetSection("DynamicConfiguration"));

services.AddRepositories();
services.AddServices();

services.AddScoped<IPasswordHasher, PasswordHasher>();
services.AddScoped<IJwtProvider, JwtProvider>();

services.AddDbContext<PetHouseDbContext>(options =>
{
   options.UseNpgsql(configuration.GetConnectionString("PetHouseDbContext"));
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI();
   app.MapScalarApiReference();
}


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();