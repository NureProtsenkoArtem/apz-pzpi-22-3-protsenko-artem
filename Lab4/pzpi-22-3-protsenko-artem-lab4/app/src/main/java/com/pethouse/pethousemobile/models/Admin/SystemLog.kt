package com.pethouse.pethousemobile.models.Admin

data class SystemLog(
    val id: String,
    val eventType: String,
    val message: String,
    val createdAt: String
)