package com.pethouse.pethousemobile.network.Pet

import android.util.Log
import com.pethouse.pethousemobile.models.Pet.CreatePetRequest
import com.pethouse.pethousemobile.models.Pet.EditPetRequest
import com.pethouse.pethousemobile.models.Pet.PetDto
import com.pethouse.pethousemobile.models.Pet.PetResponse
import retrofit2.Response

class PetRepository(private val petService: PetService) {

    suspend fun createPet(
        userId: String,
        request: CreatePetRequest,
        token: String
    ): String? {
        return try {
            val response: Response<String> = petService.createPet(userId, request, token)
            if (response.isSuccessful) {
                Log.d("PetRepository", "@")
                response.body()
            } else {
                Log.e("PetRepository", "Failed to create pet: ${response.errorBody()?.string()}")
                null
            }
        } catch (e: Exception) {
            Log.e("PetRepository", "Exception creating pet: ${e.message}")
            null
        }
    }

    suspend fun getUserPets(userId: String, token: String): List<PetResponse>? {
        val response = petService.getUserPets(userId, token)
        return if (response.isSuccessful) response.body() else null
    }

    suspend fun getPetById(petId: String, token: String): PetDto? {
        return try {
            petService.getPetById(petId, token)
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }

    suspend fun updatePet(petId: String, token: String, request: EditPetRequest): Boolean {
        val response = petService.updatePet(petId, request, token)
        return response.isSuccessful
    }
}
