package com.pethouse.pethousemobile.network.Auth

import android.content.Context
import android.util.Log
import com.pethouse.pethousemobile.models.Auth.AuthResponse
import com.pethouse.pethousemobile.models.Auth.LoginRequest
import com.pethouse.pethousemobile.models.Auth.RegisterRequest
import com.pethouse.pethousemobile.network.RetrofitClient

class AuthRepository(private val context: Context) {

    suspend fun login(email: String, password: String): AuthResponse? {
        return try {
            val response = RetrofitClient.authService.login(LoginRequest(email, password))
            if (response.isSuccessful) {
                response.body()?.let { authResponse ->
                    saveTokens(authResponse.accessToken, authResponse.refreshToken,authResponse.user.userId, authResponse.user.userRole)
                    Log.d("Auth", "Logged in successfully!")
                    authResponse
                }
            } else {
                Log.e("Auth", "Login failed: ${response.errorBody()?.string()}")
                null
            }
        } catch (e: Exception) {
            Log.e("Auth", "Exception: ${e.message}")
            null
        }
    }

    suspend fun register(name: String, username: String, password: String): String? {
        return try {
            val response = RetrofitClient.authService.register(RegisterRequest(name, username, password))
            if (response.isSuccessful) {
                response.body()?.let { registerResponse ->
                    Log.d("Auth", "Success user registration!")
                    registerResponse.message
                }
            } else {
                Log.e("Auth", "Registration failed: ${response.errorBody()?.string()}")
                null
            }
        } catch (e: Exception) {
            Log.e("Auth", "Exception: ${e.message}")
            null
        }
    }


    private fun saveTokens(accessToken: String, refreshToken: String, userId: String,userRole: String) {
        val sharedPref = context.getSharedPreferences("AuthPrefs", Context.MODE_PRIVATE)
        with(sharedPref.edit()) {
            putString("ACCESS_TOKEN", accessToken)
            putString("REFRESH_TOKEN", refreshToken)
            putString("USER_ID", userId)
            putString("USER_ROLE", userRole)
            apply()
        }
    }
}