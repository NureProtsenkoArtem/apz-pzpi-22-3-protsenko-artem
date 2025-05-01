namespace PetHouse.Application.Contracts.Server;

public class ServerStatusDto
{
   public bool IsAlive { get; set; }
   public TimeSpan Uptime { get; set; }
   public double CpuUsagePercent { get; set; }
   public double MemoryUsageMB { get; set; }
}