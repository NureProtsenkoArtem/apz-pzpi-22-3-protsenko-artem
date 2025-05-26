package com.pethouse.pethousemobile.models.HealthAnalysis

data class HealthAnalysis(
    val healthAnalysisId: String,
    val petId: String,
    val analysisDate: String,
    val analysisStartDate: String,
    val analysisEndDate: String,
    val caloriesConsumed: Double,
    val healthAnalysisType: String,
    val recomendations: String
)