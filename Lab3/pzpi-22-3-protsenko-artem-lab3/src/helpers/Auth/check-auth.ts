import { $api } from "@api/base.api";
import { useAuthStore } from "@pages/LoginPage/store/auth-store";
import { LoginResponse } from "@pages/LoginPage/types/login-response";

export const checkAuth = async () => {
    const { setUser, setAccessToken } = useAuthStore.getState();

    try {
        const response = await $api.post<LoginResponse>(
            "/Auth/refresh",
            { withCredentials: true }
        );

        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
    } catch (error) {
        console.error("Failed to refresh token:", error);
    }
};