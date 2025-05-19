import { deleteMeal, getPetMeals } from "@api/meals.api";
import { deletePet, getPetById } from "@api/pet.api";
import { ROUTES } from "@pages/router/routes.enums";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IMeal } from "types/meal/meal.type";
import { IPet } from "types/pet/pet.type";


export const useGetPetById = (id: string) => {
    return useQuery<IPet>({
        queryKey: ["pet", id],
        queryFn: () => getPetById(id),
        enabled: !!id,
    });
};

export const useGetPetMealsByPetId = (id: string) => {
    return useQuery<IMeal[]>({
        queryKey: ["meals", id],
        queryFn: () => getPetMeals(id),
        enabled: !!id,
    });
}

export const useDeletePet = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: deletePet,
        onSuccess: () => {
            navigate(ROUTES.HOME)
        }
    })
}

export const useDeleteMeal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealId: string) => deleteMeal(mealId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["meals"] });
        },
    });
};