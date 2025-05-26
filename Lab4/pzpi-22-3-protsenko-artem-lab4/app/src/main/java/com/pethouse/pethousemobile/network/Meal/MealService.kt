package com.pethouse.pethousemobile.network.Meal

import com.pethouse.pethousemobile.models.Meal.MealDto
import com.pethouse.pethousemobile.models.Meal.MealRequest
import com.pethouse.pethousemobile.models.Meal.UpdateMealRequest
import com.pethouse.pethousemobile.models.Pet.EditPetRequest
import com.pethouse.pethousemobile.models.Pet.PetDto
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path

interface MealService {
    @GET("api/Meal/pet/{petId}")
    suspend fun getMealsByPetId(@Path("petId") petId: String): List<MealDto>

    @POST("api/Meal/{petId}")
    suspend fun createMeal(
        @Path("petId") petId: String,
        @Header("Authorization") token: String,
        @Body meal: MealRequest
    ): Response<Unit>

    @PATCH("api/Meal/{mealId}")
    suspend fun updateMeal(
        @Path("mealId") mealId: String,
        @Header("Authorization") token: String,
        @Body updateMealRequest: UpdateMealRequest
    ): Response<Unit>

    @GET("api/Meal/{mealId}")
    suspend fun getMealById(
        @Path("mealId") mealId: String,
        @Header("Authorization") token: String
    ): MealDto

    @DELETE("api/Meal/{mealId}")
    suspend fun deleteMealById(
        @Path("mealId") mealId: String,
        @Header("Authorization") token: String
    ): Response<Unit>
}
