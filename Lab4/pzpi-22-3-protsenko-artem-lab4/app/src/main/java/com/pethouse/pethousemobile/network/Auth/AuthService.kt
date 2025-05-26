package com.pethouse.pethousemobile.network.Auth

import com.pethouse.pethousemobile.models.Auth.AuthResponse
import com.pethouse.pethousemobile.models.Auth.LoginRequest
import com.pethouse.pethousemobile.models.Auth.RegisterRequest
import com.pethouse.pethousemobile.models.Auth.RegisterResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("api/Auth/register")
    suspend fun register(@Body request:RegisterRequest): Response<RegisterResponse>

    @POST("api/Auth/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>
}