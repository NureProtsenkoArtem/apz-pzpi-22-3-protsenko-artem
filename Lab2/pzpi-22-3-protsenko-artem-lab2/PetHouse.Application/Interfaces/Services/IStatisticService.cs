namespace PetHouse.Application.Interfaces;

public interface IStatisticService
{
   Task<byte[]> GenerateSystemUsageStatisticsPdfAsync();

}