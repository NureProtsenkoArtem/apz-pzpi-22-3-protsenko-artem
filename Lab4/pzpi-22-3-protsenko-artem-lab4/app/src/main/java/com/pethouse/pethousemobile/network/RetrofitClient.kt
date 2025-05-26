package com.pethouse.pethousemobile.network

import com.pethouse.pethousemobile.network.Admin.AdminService
import com.pethouse.pethousemobile.network.Auth.AuthService
import com.pethouse.pethousemobile.network.HealthAnalysis.HealthAnalysisService
import com.pethouse.pethousemobile.network.Meal.MealService
import com.pethouse.pethousemobile.network.Pet.PetService
import com.pethouse.pethousemobile.network.User.UserService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2:5181/"

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val authService: AuthService by lazy {
        retrofit.create(AuthService::class.java)
    }

    val petService: PetService by lazy {
        retrofit.create(PetService::class.java)
    }

    val userService: UserService by lazy {
        retrofit.create(UserService::class.java)
    }

    val mealService: MealService by lazy {
        retrofit.create(MealService::class.java)
    }

    val healthAnalysisService: HealthAnalysisService by lazy {
        retrofit.create(HealthAnalysisService::class.java)
    }

    val adminService: AdminService by lazy {
        retrofit.create(AdminService::class.java)
    }
}