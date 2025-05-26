package com.pethouse.pethousemobile.models.Meal

data class UpdateMealRequest(
    val portionSize: Double,
    val startTime: String,
    val mealStatus: String,
    val caloriesConsumed: Double,
    val adaptiveAdjustment: Boolean,
    val foodType: String,
    val calorificValue: Double,
    val isDaily: Boolean
)
