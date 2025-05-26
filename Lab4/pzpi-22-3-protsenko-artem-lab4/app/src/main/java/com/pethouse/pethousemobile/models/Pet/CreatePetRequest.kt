package com.pethouse.pethousemobile.models.Pet

data class CreatePetRequest(
    val petName: String,
    val petBreed: String,
    val petWeight: Double,
    val caloriesPerDay: Int,
    val activityLevel: String
)