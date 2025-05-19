import { useMutation } from "@tanstack/react-query";
import { register } from "@api/auth.api";
import { RegistrationRequest } from "../types/register-request";

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegistrationRequest) =>
            await register(data),
    });
};
