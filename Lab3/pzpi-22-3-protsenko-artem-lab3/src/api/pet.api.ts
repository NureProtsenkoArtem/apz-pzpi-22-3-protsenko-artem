import { CreatePetRequest } from "@pages/CreatePetPage/types/createPetRequest";
import { $api } from "./base.api";
import { IPet } from "types/pet/pet.type";

export const createPet = async (req: CreatePetRequest) => {
    const { data } = await $api.post(`/Pet/${req.userId}`,
        {
            petName: req.petName,
            petBreed: req.petBreed,
            petWeight: req.petWeight,
            caloriesPerDay: req.caloriesPerDay,
            activityLevel: req.activityLevel
        })

    return data;
}

export const getPetById = async (petId: string) => {
    const { data } = await $api.get(`/Pet/${petId}`)
    return data
}

export const updatePet = async (petId: string, req: Omit<IPet, "userId">) => {
    const { data } = await $api.patch(`/Pet/${petId}`, { ...req })
    return data
}

export const deletePet = async (petId: string) => {
    return await $api.delete(`/Pet/${petId}`)
}

export const getUserPets = async (id: string) => {
    const { data } = await $api.get(`/Pet/user/${id}`)
    return data
}