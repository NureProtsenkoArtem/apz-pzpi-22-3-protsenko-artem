package com.pethouse.pethousemobile.network.Admin

import android.util.Log
import com.pethouse.pethousemobile.models.Admin.DbStatus
import com.pethouse.pethousemobile.models.Admin.ServerConfig
import com.pethouse.pethousemobile.models.Admin.ServerStatusDto
import com.pethouse.pethousemobile.models.Admin.SystemLog

import retrofit2.Response
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody


class AdminRepository(private val service: AdminService) {
    suspend fun changeUserRole(userId: String, newRole: String, token: String?)
        = service.updateUserRole(userId, newRole,token)
    suspend fun getStatus(): DbStatus = service.getDbStatus()
    suspend fun createBackup(path: String) = service.createBackup(path)

    suspend fun restoreDb(path: String): Response<Unit> {
        val jsonPath = "\"$path\""
        val requestBody = jsonPath.toRequestBody("application/json".toMediaType())
        return service.restoreDb(requestBody)
    }

    suspend fun getServerStatus(): ServerStatusDto = service.getServerStatus()

    suspend fun getServerConfiguration(): ServerConfig = service.getServerConfiguration()

    suspend fun updateServerConfiguration(config: ServerConfig): Response<Unit> =
        service.updateServerConfiguration(config)

    suspend fun getSystemLogs(): List<SystemLog> = service.getSystemLogs()

    suspend fun deleteOldLogs(days: Int): Response<Unit> = service.deleteOldLogs(days)
}