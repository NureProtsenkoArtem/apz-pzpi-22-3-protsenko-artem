import { updatePet } from "@api/pet.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePet = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ petId, data }: { petId: string; data: any }) =>
            updatePet(petId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pet"] });
        },
    });
};
