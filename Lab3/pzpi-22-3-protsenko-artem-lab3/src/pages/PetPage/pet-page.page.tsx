import { MainLayout } from "@ui/layout/layout";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteMeal, useDeletePet, useGetPetById, useGetPetMealsByPetId } from "./hooks/usePet";
import { ActionCell, Button, InfoRow, PageWrapper, PetCard, Table, TableHeader, TableWrapper, Td, Th, Title } from "./pet-page.style";
import { IMeal } from "types/meal/meal.type";
import { parseTime } from "helpers/date-parse";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@pages/router/routes.enums";
import { formatDateByLanguage, formatToLocalizedTime, gramsToOunces, kgToLbs } from "helpers/converter";
import i18n from "locales/i18n";

export const PetPage: FC = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: pet, isLoading } = useGetPetById(id!);
    const { data: meals, isLoading: mealsLoading } = useGetPetMealsByPetId(id!);
    const { mutate: deletePetMutate } = useDeletePet();
    const { mutate: deleteMealMutate } = useDeleteMeal();
    const isEnglish = i18n.language === "en";
    const { t } = useTranslation();

    if (isLoading || mealsLoading) {
        return (
            <MainLayout>
                Loading...
            </MainLayout>
        );
    }

    const handleAddMeal = () => {
        navigate(ROUTES.ADD_MEAL.replace(":id", id!))
    };

    const handleEditMeal = (mealId: string) => {
        navigate(ROUTES.EDIT_MEAL.replace(":id", mealId))
    };

    const handleDeleteMeal = (mealId: string) => {
        const confirm = window.confirm(t("delete_pet_text"));
        if (confirm) {
            deleteMealMutate(mealId)
        }
    };

    const handleEditPet = () => {
        navigate(ROUTES.UPDATE_PET_PAGE.replace(":id", pet!.petId))
    };

    const handleDeletePet = () => {
        const confirm = window.confirm("Ви впевнені, що хочете видалити тварину?");
        if (confirm) {
            deletePetMutate(pet!.petId)
        }
    };

    return (
        <MainLayout>
            <PageWrapper>
                <PetCard>
                    <Title>{pet!.petName} 🐾</Title>
                    <InfoRow>{t("pet_type")} {pet!.petType}</InfoRow>

                    <InfoRow>
                        {t("pet_weight")}{" "}
                        {isEnglish
                            ? `${kgToLbs(pet!.petWeight)} lbs`
                            : `${pet!.petWeight} кг`}
                    </InfoRow>
                    <InfoRow>{t("activity_level")} {pet!.activityLevel}</InfoRow>
                    <InfoRow>{t("calories_per_day")} {pet!.caloriesPerDay}</InfoRow>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <Button onClick={handleEditPet}>{t("update")}</Button>
                        <Button onClick={() => navigate(ROUTES.HEALTH_ANALYSIS_LIST_PAGE.replace(":id", pet!.petId))}>{t("health")}</Button>
                        <Button danger onClick={handleDeletePet}>{t("delete")}</Button>
                    </div>
                </PetCard>

                <TableWrapper>
                    <TableHeader>
                        <Title>{t("meal_history")}</Title>
                        <Button onClick={handleAddMeal}>{t("add_meal")}</Button>
                    </TableHeader>

                    <Table>
                        <thead>
                            <tr>
                                <Th>{t("date")}</Th>
                                <Th>{t("time")}</Th>
                                <Th>{t("meal_type")}</Th>
                                <Th>{t("portion_size")} {" "} {isEnglish ? "oz" : "г"}</Th>
                                <Th>{t("status")}</Th>
                                <Th>{t("options")}</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((meal: IMeal) => (
                                <tr key={meal.mealId}>
                                    <Td>{formatDateByLanguage(meal.startTime, i18n.language)}</Td>
                                    <Td>
                                        {i18n.language === "en"
                                            ? formatToLocalizedTime(meal.startTime, i18n.language)
                                            : parseTime(meal.startTime)}
                                    </Td>

                                    <Td>{meal.foodType}</Td>
                                    <Td>
                                        {isEnglish
                                            ? `${gramsToOunces(meal.portionSize)}`
                                            : `${meal.portionSize}`}
                                    </Td>
                                    <Td>{meal.mealStatus}</Td>
                                    <ActionCell>
                                        <Button danger onClick={() => handleDeleteMeal(meal.mealId)}>🗑️</Button>
                                        {meal.mealStatus !== "Completed" && (
                                            <Button onClick={() => handleEditMeal(meal.mealId)}>✏️</Button>
                                        )}
                                    </ActionCell>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </PageWrapper>
        </MainLayout>
    );
};
