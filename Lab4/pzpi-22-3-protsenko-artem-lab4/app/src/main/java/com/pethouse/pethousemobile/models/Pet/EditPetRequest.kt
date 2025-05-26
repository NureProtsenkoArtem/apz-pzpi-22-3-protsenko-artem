package com.pethouse.pethousemobile.models.Pet

data class EditPetRequest(
    val petName: String,
    val petBreed: String,
    val petWeight: Double,
    val caloriesPerDay: Double,
    val activityLevel: String
)