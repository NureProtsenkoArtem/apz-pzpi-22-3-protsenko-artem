package com.pethouse.pethousemobile.models.Admin

data class ServerStatusDto(
    val isAlive: Boolean,
    val uptime: String,
    val cpuUsagePercent: Double,
    val memoryUsageMB: Double
)