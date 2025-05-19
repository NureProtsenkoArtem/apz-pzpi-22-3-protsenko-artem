import { getUserPets } from "@api/pet.api";
import { useQuery } from "@tanstack/react-query";
import { IPet } from "types/pet/pet.type";

export const useGetUserPets = (id: string) => {
    return useQuery<IPet[]>({
        queryKey: ["pets", id],
        queryFn: () => getUserPets(id),
        enabled: !!id,
    });
};