export interface IHealthAnalysis {
    healthAnalysisId: string,
    petId: string,
    analysisDate: string,
    analysisStartDate: string,
    analysisEndDate: string,
    caloriesConsumed: number,
    healthAnalysisType: string
    recomendations: string;
}