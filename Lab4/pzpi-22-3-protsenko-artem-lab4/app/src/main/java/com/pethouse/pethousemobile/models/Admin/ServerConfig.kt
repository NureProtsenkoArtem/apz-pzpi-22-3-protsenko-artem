package com.pethouse.pethousemobile.models.Admin

data class ServerConfig(
    val accessSecretKey: String,
    val refreshSecretKey: String,
    val encryptionKey: String
)