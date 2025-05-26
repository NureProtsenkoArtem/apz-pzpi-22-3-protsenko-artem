package com.pethouse.pethousemobile.network.HealthAnalysis

import com.pethouse.pethousemobile.models.HealthAnalysis.HealthAnalysis
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

interface HealthAnalysisService {
    @GET("api/HealthAnalysis/Pet/{petId}")
    suspend fun getAnalyses(
        @Path("petId") petId: String,
        @Header("Authorization") token: String?,
    ): List<HealthAnalysis>

    @POST("api/HealthAnalysis/{petId}")
    suspend fun createAnalysis(
        @Path("petId") petId: String,
        @Header("Authorization") token: String?,
        @Body data: Map<String, String>
    ): Response<Unit>
}
