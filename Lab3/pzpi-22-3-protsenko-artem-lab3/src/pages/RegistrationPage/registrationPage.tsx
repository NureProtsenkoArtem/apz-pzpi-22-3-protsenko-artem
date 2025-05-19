import { MainLayout } from '@ui/layout/layout';
import { FC, useState } from 'react';
import { Button, ErrorText, FormContent, FormWrapper, Input, Title } from './registrationPage.style';
import { useTranslation } from 'react-i18next';
import { useRegister } from './hooks/useRegister';
import { ROUTES } from '@pages/router/routes.enums';
import toast from 'react-hot-toast';
import { RegistrationRequest } from './types/register-request';
import { useNavigate } from 'react-router-dom';


export const RegistrationPage: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [error, setError] = useState('');
    const registerMutation = useRegister();
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !name) {
            setError(t("error_all_fields"));
            return;
        }

        const request: RegistrationRequest = {
            name: name,
            email: email,
            password: password,
        }

        setError('');
        registerMutation.mutate(request, {
            onSuccess: () => {
                toast.success(t("register_successfully"));
                navigate(ROUTES.VERIFICATION_PAGE.replace(":email", email));
            },
            onError: () => {
                toast.error(t("error_register"));
            }
        });
        console.log('Зареєстровано:', { email, password });
    };

    return (
        <MainLayout>
            <FormWrapper>
                <FormContent>
                    <Title>{t("register")}</Title>
                    <form onSubmit={handleSubmit}>
                        {error && <ErrorText>{error}</ErrorText>}
                        <Input
                            type="text"
                            placeholder={t("name")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <Button type="submit">{t("btn-register")}</Button>
                    </form>
                </FormContent>
            </FormWrapper>
        </MainLayout>
    );
};
