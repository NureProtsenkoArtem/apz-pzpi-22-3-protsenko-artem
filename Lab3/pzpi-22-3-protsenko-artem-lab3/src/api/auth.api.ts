import { RegistrationRequest } from "@pages/RegistrationPage/types/register-request";
import { $api } from "./base.api";

export const login = async (email: string, password: string) => {
    return await $api.post("/Auth/login", { email, password });
};

export const register = async (data: RegistrationRequest) => {
    return await $api.post("/Auth/register", data);
};

export const verifyEmail = async (email: string, activationCode: string) => {
    return await $api.post("Auth/verify-email", { email, activationCode })
}