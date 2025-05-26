package com.pethouse.pethousemobile.models.Admin

data class DbStatus(
    val isDatabaseConnected: Boolean,
    val databaseSizeMB: Double,
    val checkedAt: String
)