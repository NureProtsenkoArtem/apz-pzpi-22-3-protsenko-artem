export interface IServerStatus {
    isAlive: boolean;
    uptime: string;
    cpuUsagePercent: number;
    memoryUsageMB: number;
}