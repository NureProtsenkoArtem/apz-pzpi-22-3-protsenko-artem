import { RegistrationRequest } from "@pages/RegistrationPage/types/register-request";

export type LoginRequest = Omit<RegistrationRequest, "name"> 