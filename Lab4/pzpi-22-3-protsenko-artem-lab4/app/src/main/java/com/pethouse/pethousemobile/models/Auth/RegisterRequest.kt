package com.pethouse.pethousemobile.models.Auth

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String
)