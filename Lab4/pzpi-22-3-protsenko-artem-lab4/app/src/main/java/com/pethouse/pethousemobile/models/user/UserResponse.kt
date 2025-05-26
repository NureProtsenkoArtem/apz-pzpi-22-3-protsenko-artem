package com.pethouse.pethousemobile.models.user

data class UserResponse(
    val userId: String,
    val name: String,
    val email: String,
    val userRole: String,
    val createdAt: String
)