package com.pethouse.pethousemobile.network.Pet

import com.pethouse.pethousemobile.models.Pet.CreatePetRequest
import com.pethouse.pethousemobile.models.Pet.EditPetRequest
import com.pethouse.pethousemobile.models.Pet.PetDto
import com.pethouse.pethousemobile.models.Pet.PetResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.Path

interface PetService {
    @POST("/api/Pet/{id}")
    suspend fun createPet(
        @Path("id") userId: String,
        @Body request: CreatePetRequest,
        @Header("Authorization") token: String
    ): Response<String>

    @GET("/api/Pet/user/{userId}")
    suspend fun getUserPets(
        @Path("userId") userId: String,
        @Header("Authorization") token: String
    ): Response<List<PetResponse>>

    @GET("api/Pet/{petId}")
    suspend fun getPetById(
        @Path("petId") petId: String,
        @Header("Authorization") token: String
    ): PetDto

    @PATCH("api/Pet/{petId}")
    suspend fun updatePet(
        @Path("petId") petId: String,
        @Body request: EditPetRequest,
        @Header("Authorization") token: String
    ): Response<Unit>

}