export interface CreatePetRequest {
    userId: string;
    petName: string;
    petBreed: string;
    petWeight: number;
    caloriesPerDay: number;
    activityLevel: "Low" | "Moderate" | "High"
}