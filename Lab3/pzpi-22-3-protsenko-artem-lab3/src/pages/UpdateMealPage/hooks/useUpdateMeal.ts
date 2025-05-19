import { editMeal } from "@api/meals.api";
import { ROUTES } from "@pages/router/routes.enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editMealRequest } from "types/meal/edit-meal.type";

export const useUpdateMeal = (mealId: string, petId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (req: editMealRequest) => editMeal(mealId, req),
        onSuccess: (_, __) => {
            queryClient.invalidateQueries({ queryKey: ["meals"] });
            queryClient.invalidateQueries({ queryKey: ["meal", mealId] });
            navigate(ROUTES.PET_PAGE.replace(":id", petId))
        },
    });
};