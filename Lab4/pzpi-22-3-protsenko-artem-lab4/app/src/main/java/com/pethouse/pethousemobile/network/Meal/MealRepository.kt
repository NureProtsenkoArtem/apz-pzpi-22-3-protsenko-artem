package com.pethouse.pethousemobile.network.Meal

import android.util.Log
import com.pethouse.pethousemobile.models.Meal.MealDto
import com.pethouse.pethousemobile.models.Meal.MealRequest
import com.pethouse.pethousemobile.models.Meal.UpdateMealRequest
import com.pethouse.pethousemobile.models.Pet.EditPetRequest
import com.pethouse.pethousemobile.models.Pet.PetDto

class MealRepository(private val mealService: MealService) {
    suspend fun getMealsByPetId(petId: String): List<MealDto> {
        return try {
            mealService.getMealsByPetId(petId)
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }

    suspend fun createMeal(petId: String, token: String, mealRequest: MealRequest): Boolean {
        return try {
            val response = mealService.createMeal(petId, token, mealRequest)
            if (response.isSuccessful) {
                Log.i("meals", "Success: ${response.message()}")
                true
            } else {
                val errorBody = response.errorBody()?.string()
                Log.e("meals", "Error ${response.code()}: ${response.message()}")
                Log.e("meals", "Error body: $errorBody")
                false
            }
        } catch (e: Exception) {
            Log.e("meals", "Exception: ${e.message}")
            e.printStackTrace()
            false
        }
    }

    suspend fun getMealById(mealId: String, token: String): MealDto? {
        return try {
            mealService.getMealById(mealId, token)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun updateMeal(mealId: String, token: String, request: UpdateMealRequest): Boolean {
        val response = mealService.updateMeal(mealId, token, request)
        return response.isSuccessful
    }

    suspend fun deleteMealById(mealId: String, token: String): Boolean {
        val response = mealService.deleteMealById(mealId, token)
        return response.isSuccessful
    }
}
