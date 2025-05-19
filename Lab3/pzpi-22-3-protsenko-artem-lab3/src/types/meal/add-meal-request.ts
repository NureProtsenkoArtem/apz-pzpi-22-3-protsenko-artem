export interface AddMealRequest {
    portionSize: number,
    startTime: string,
    calorificValue: number,
    adaptiveAdjustment: boolean,
    foodType: string,
    isDaily: boolean
}