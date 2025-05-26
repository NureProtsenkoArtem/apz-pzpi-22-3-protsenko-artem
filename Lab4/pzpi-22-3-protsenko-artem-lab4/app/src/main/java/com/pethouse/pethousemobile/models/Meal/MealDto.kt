package com.pethouse.pethousemobile.models.Meal

data class MealDto(
    val mealId: String,
    val petId: String,
    val portionSize: Int,
    val startTime: String,
    val caloriesPerMeal: Double,
    val caloriesConsumed: Int,
    val adaptiveAdjustment: Boolean,
    val foodType: String,
    val calorificValue: Int,
    val mealStatus: String,
    val isDaily: Boolean
)
