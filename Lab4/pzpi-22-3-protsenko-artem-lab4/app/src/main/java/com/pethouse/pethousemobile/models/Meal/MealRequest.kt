package com.pethouse.pethousemobile.models.Meal

data class MealRequest(
    val portionSize: Double,
    val startTime: String,
    val calorificValue: Double,
    val adaptiveAdjustment: Boolean,
    val foodType: String,
    val isDaily: Boolean
)
