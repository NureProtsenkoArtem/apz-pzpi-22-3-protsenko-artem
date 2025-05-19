import { AddMealRequest } from "types/meal/add-meal-request"
import { $api } from "./base.api"
import { editMealRequest } from "types/meal/edit-meal.type"

export const getPetMeals = async (petId: string) => {
    return (await $api.get(`/Meal/pet/${petId}`)).data
}

export const getMealById = async (mealId: string) => {
    return (await $api.get(`/Meal/${mealId}`)).data
}

export const editMeal = async (mealId: string, req: editMealRequest) => {
    return (await $api.patch(`/Meal/${mealId}`, { ...req }))
}

export const deleteMeal = async (mealId: string) => {
    return (await $api.delete(`/Meal/${mealId}`)).data
}

export const addMeal = async (petId: string, req: AddMealRequest) => {
    return (await $api.post(`/Meal/${petId}`, { ...req })).data
}