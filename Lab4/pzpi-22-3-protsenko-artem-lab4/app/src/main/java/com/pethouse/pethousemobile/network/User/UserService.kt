package com.pethouse.pethousemobile.network.User

import com.pethouse.pethousemobile.models.Auth.User
import com.pethouse.pethousemobile.models.user.UserResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

interface UserService {
    @GET("api/User/{userId}")
    suspend fun getUserById(
        @Path("userId") userId: String,
        @Header("Authorization") token: String
    ): Response<UserResponse>

    @GET("/api/User/")
    suspend fun getUsers(
        @Header("Authorization") token: String?,
    ): List<User>
}