import { getMealById } from "@api/meals.api";
import { useQuery } from "@tanstack/react-query";
import { IMeal } from "types/meal/meal.type";

export const useGetMealById = (id: string) => {
    return useQuery<IMeal>({
        queryKey: ["pet", id],
        queryFn: () => getMealById(id),
        enabled: !!id,
    });
};