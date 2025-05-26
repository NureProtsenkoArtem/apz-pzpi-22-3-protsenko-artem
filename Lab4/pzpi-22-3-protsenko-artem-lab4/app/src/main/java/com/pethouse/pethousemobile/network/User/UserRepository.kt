package com.pethouse.pethousemobile.network.User

import com.pethouse.pethousemobile.models.Auth.User
import com.pethouse.pethousemobile.models.user.UserResponse

class UserRepository(private val service: UserService) {
    suspend fun getUserById(userId: String, token: String): UserResponse? {
        return try {
            val response = service.getUserById(userId, token)
            if (response.isSuccessful) response.body() else null
        } catch (e: Exception) {
            null
        }
    }

    suspend fun fetchUsers(token: String?): List<User> = service.getUsers(token)
}
