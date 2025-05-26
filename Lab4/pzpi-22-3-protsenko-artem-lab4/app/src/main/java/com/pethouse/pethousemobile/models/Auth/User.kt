package com.pethouse.pethousemobile.models.Auth

data class User (
    val userId: String = "",
    val name: String,
    val email: String,
    val password: String,
    val userRole: String,
    )