package com.pethouse.pethousemobile.network.HealthAnalysis

class HealthAnalysisRepository(private val api: HealthAnalysisService) {
    suspend fun getAnalyses(petId: String,token: String?) = api.getAnalyses(petId,token)
    suspend fun createAnalysis(petId: String, token: String?, startDate: String, endDate: String) =
        api.createAnalysis(petId, token, mapOf("startAnalysisDate" to startDate, "endAnalysisDate" to endDate))
}
