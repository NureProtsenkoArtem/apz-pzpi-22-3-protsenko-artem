import { verifyEmail } from "@api/auth.api";
import { ROUTES } from "@pages/router/routes.enums";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const useVerifyEmail = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    return useMutation({
        mutationFn: ({
            email,
            activationCode,
        }: {
            email: string;
            activationCode: string;
        }) => verifyEmail(email, activationCode),
        onSuccess: () => {
            toast.success(t("verification.success"))
            navigate(ROUTES.LOGIN_PAGE)
        }
    });
};