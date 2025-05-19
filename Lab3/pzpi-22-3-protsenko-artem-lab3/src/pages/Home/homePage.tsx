import { MainLayout } from "@ui/layout/layout";
import { FC } from "react";
import { Title, WelcomeCard, Text } from "./home.style";
import { useTranslation } from "react-i18next";


export const Home: FC = () => {
    const { t } = useTranslation()

    return (
        <MainLayout>
            <WelcomeCard>
                <Title>{t("welcome_card.welcome_text")}</Title>
                <Text>{t("welcome_card.welcome_text_2")}</Text>
            </WelcomeCard>
        </MainLayout>
    )
};
