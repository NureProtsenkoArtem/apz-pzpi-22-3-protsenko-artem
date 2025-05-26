package com.pethouse.pethousemobile.network.Admin

import com.pethouse.pethousemobile.models.Admin.DbStatus
import com.pethouse.pethousemobile.models.Admin.ServerConfig
import com.pethouse.pethousemobile.models.Admin.ServerStatusDto
import com.pethouse.pethousemobile.models.Admin.SystemLog
import okhttp3.RequestBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface AdminService {
    @POST("/api/Admin/{userId}")
    suspend fun updateUserRole(
        @Path("userId") userId: String,
        @Query("userRole") newRole: String,
        @Header("Authorization") token: String?,
    ): Response<Unit>

    @GET("/api/Admin/db-status")
    suspend fun getDbStatus(): DbStatus

    @GET("/api/Admin/backup")
    suspend fun createBackup(
        @Query("outputDirectory") outputDirectory: String
    ): Response<Unit>

    @POST("/api/Admin/restore")
    suspend fun restoreDb(@Body backupPathJson: RequestBody): Response<Unit>

    @GET("/api/Admin/server-status")
    suspend fun getServerStatus(): ServerStatusDto

    @GET("/api/Admin/server-configuration")
    suspend fun getServerConfiguration(): ServerConfig

    @POST("/api/Admin/server-configuration")
    suspend fun updateServerConfiguration(@Body config: ServerConfig): Response<Unit>

    @GET("/api/system-log")
    suspend fun getSystemLogs(): List<SystemLog>

    @DELETE("/api/system-log/delete-old-logs")
    suspend fun deleteOldLogs(@Query("olderThan") days: Int): Response<Unit>
}