import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth-store";
import { LoginRequest } from "../types/login-request";
import axios from "axios";
import toast from "react-hot-toast";
import { LoginResponse } from "../types/login-response";
import { login } from "@api/auth.api";
import { ErrorType } from "types/error/error.types";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@pages/router/routes.enums";

export const useLogin = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const setAccessToken = useAuthStore(state => state.setAccessToken);
    const setUser = useAuthStore(state => state.setUser);

    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await login(data.email, data.password)
            return response.data;
        },
        onSuccess: (data: LoginResponse) => {
            setAccessToken(data.accessToken);
            setUser(data.user);
            localStorage.setItem("token", data.accessToken)
            toast.success(t("login_success"));
            navigate(ROUTES.HOME)
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data as ErrorType;
                toast.error(`${t("error")} ${data.message}`);
            }
        }
    });
};