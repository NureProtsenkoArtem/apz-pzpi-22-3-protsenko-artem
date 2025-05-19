import { LoginResponse } from "@pages/LoginPage/types/login-response";
import axios from "axios";

export const $api = axios.create({
    baseURL: "http://localhost:5181/api",
    withCredentials: true
});


$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`
    return config
})

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await $api.post<LoginResponse>(
                    `/auth/refresh`,
                    { withCredentials: true }
                );

                localStorage.setItem('token', response.data.accessToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return $api.request(originalRequest);
            } catch (error: unknown) {
                console.log('Refresh failed', error);
            }
        }

        throw error;
    }
);