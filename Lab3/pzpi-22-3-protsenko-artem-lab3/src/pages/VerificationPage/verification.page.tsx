import { MainLayout } from "@ui/layout/layout";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useVerifyEmail } from "./hooks/useVerifyEmail";
import {
    VerificationContainer,
    VerificationTitle,
    VerificationForm,
    Input,
    Button,
    Message,
} from "./verification.style";

export const VerificationPage: FC = () => {
    const { email = "" } = useParams();
    const { t } = useTranslation();
    const [code, setCode] = useState("");
    const { mutate: verify, isPending, isSuccess, isError } = useVerifyEmail();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        verify({ email, activationCode: code });
    };

    return (
        <MainLayout>
            <VerificationContainer>
                <VerificationTitle>{t("verification.title")}</VerificationTitle>

                <VerificationForm onSubmit={handleSubmit}>
                    <label>{t("verification.code")}</label>
                    <Input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={t("verification.codePlaceholder") || ""}
                    />

                    <Button type="submit" disabled={isPending}>
                        {isPending ? t("verification.verifying") : t("verification.verify")}
                    </Button>

                    {isSuccess && <Message success>{t("verification.success")}</Message>}
                    {isError && <Message error>{t("verification.error")}</Message>}
                </VerificationForm>
            </VerificationContainer>
        </MainLayout>
    );
};
