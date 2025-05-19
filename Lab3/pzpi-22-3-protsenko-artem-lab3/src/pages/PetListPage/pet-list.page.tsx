import { MainLayout } from "@ui/layout/layout";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserPets } from "./hooks/useGetUserPets";
import { useTranslation } from "react-i18next";
import { Button, Card, Info, Name, PageWrapper } from "./pet-list.style";
import { ROUTES } from "@pages/router/routes.enums";
import i18n from "locales/i18n";
import { kgToLbs } from "helpers/converter";

export const PetListPage: FC = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const { data: pets, isLoading } = useGetUserPets(id!)
    const { t } = useTranslation();
    const isEnglish = i18n.language === "en";

    if (isLoading) {
        return (
            <MainLayout>
                {t("loading")}
            </MainLayout>
        )
    }
    return (
        <MainLayout>
            <h1 style={{ textAlign: "center" }}>{t("pet_list")}</h1>
            <PageWrapper>

                {pets!.map((pet, index) => (
                    <Card key={index}>
                        <label>{t("pet_name")} </label>
                        <Name>{pet.petName}</Name>
                        <label>{t("pet_type")}</label>
                        <Info>{pet.petType}</Info>
                        <label>{t("pet_weight")}</label>
                        <Info>{!isEnglish ?
                            `${pet.petWeight} кг`
                            : `${kgToLbs(pet.petWeight)} lb`}</Info>
                        <Button onClick={() => navigate(ROUTES.PET_PAGE.replace(":id", pet.petId))}>
                            {t("btn_view")}
                        </Button>
                    </Card>
                ))}
            </PageWrapper>
        </MainLayout>
    );
}