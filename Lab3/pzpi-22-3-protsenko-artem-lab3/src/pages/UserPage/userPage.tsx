import { FC } from 'react';
import { MainLayout } from '@ui/layout/layout';
import { Container, Field, Label, Title, Value } from './userPage.style';
import { useGetUser } from './hooks/useGetUser';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mapRoleValueToName } from 'helpers/roleMapper';
import { formatDateByLanguage } from 'helpers/converter';
import i18n from 'locales/i18n';

export const UserPage: FC = () => {
    const { id } = useParams();
    const { data: user, isLoading } = useGetUser(id!);
    const { t } = useTranslation();

    if (isLoading || !user) {
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <Container>
                <Title>{t("user_profile")}</Title>

                <Field>
                    <Label>{t("name")}</Label>
                    <Value>{user.name}</Value>
                </Field>

                <Field>
                    <Label>{t("email")}</Label>
                    <Value>{user.email}</Value>
                </Field>

                <Field>
                    <Label>{t("role")}</Label>
                    <Value>{mapRoleValueToName(user.userRole)}</Value>
                </Field>

                <Field>
                    <Label>{t("created_at")}</Label>
                    <Value>{formatDateByLanguage(user.createdAt,i18n.language)}</Value>
                </Field>
            </Container>
        </MainLayout>
    );
};
