export interface editMealRequest {
    portionSize: number;
    startTime: string;
    calorificValue: number;
    adaptiveAdjustment: boolean;
    foodType: string;
    isDaily: boolean;
    mealStatus?: string;
    caloriesConsumed?: number;
  }