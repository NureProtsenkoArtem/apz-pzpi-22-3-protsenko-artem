package com.pethouse.pethousemobile.models.Auth

data class AuthResponse(
    val accessToken: String,
    val refreshToken: String,
    val user: User
)