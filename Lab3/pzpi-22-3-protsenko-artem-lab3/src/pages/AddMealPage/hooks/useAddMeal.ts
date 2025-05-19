import { addMeal } from "@api/meals.api";
import { ROUTES } from "@pages/router/routes.enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AddMealRequest } from "types/meal/add-meal-request";

export const useAddMeal = (petId: string,) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (req: AddMealRequest) => addMeal(petId, req),
        onSuccess: () => {
            navigate(ROUTES.PET_PAGE.replace(':id', petId))
            queryClient.invalidateQueries({ queryKey: ["meals", petId] });
        },
    });
};