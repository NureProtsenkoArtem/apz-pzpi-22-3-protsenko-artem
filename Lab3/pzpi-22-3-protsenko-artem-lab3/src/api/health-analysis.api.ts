import { $api } from "./base.api"

export const getHealthAnalysisByPetId = async (petId: string) => {
    return (await $api.get(`/HealthAnalysis/Pet/${petId}`)).data
}

export const createHealthAnalysis = async (petId: string, startAnalysisDate: string, endAnalysisDate: string) => {
    return await $api.post(`/HealthAnalysis/${petId}`, { startAnalysisDate, endAnalysisDate })
}