package com.pethouse.pethousemobile.models.Pet

data class PetDto(
    val petId: String,
    val userId: String,
    val petName: String,
    val petType: String,
    val petWeight: Double,
    val caloriesPerDay: Int,
    val activityLevel: String,
    val recognizableData: String
)
