export interface IMeal {
    mealId: string;
    petId: string;
    portionSize: number;
    startTime: string;
    caloriesPerMeal: number;
    caloriesConsumed: number;
    adaptiveAdjustment: boolean;
    foodType: string;
    calorificValue: number;
    mealStatus: string;
    isDaily: boolean;
}