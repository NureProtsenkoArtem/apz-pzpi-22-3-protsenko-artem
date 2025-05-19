import { MainLayout } from "@ui/layout/layout";
import { FC, useState } from "react";
import { Button, ErrorText, FormContent, FormWrapper, Input, Title } from "./loginPage.style";
import { useTranslation } from "react-i18next";
import { useLogin } from "./hooks/useLogin";

export const LoginPage: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const loginMutation = useLogin();
    const { t } = useTranslation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError(t("error_all_fields"));
            return;
        }

        loginMutation.mutate({ email, password });
    };

    return (
        <MainLayout>
            <FormWrapper>
                <FormContent>
                    <Title>{t("login_text")}</Title>
                    <form onSubmit={handleSubmit}>
                        {error && <ErrorText>{error}</ErrorText>}
                        <Input
                            type="email"
                            placeholder={t("email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder={t("password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit">{t("login")}</Button>
                    </form>
                </FormContent>
            </FormWrapper>
        </MainLayout>
    );
}