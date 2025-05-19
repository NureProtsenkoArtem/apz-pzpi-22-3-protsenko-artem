import { $api } from "@api/base.api";
import { getAllUsers } from "@api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mapRoleValueToName } from "helpers/roleMapper";
import { IUser } from "types/user/user.types";

export const useUsers = () => {
    return useQuery<IUser[]>({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });
};

export const useChangeUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, userRole }: { userId: string, userRole: number }) =>
            await $api.post(`/Admin/${userId}?userRole=${mapRoleValueToName(userRole)}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] })
    });
};