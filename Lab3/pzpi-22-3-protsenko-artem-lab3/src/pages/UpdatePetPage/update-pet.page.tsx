import { useGetPetById } from "@pages/PetPage/hooks/usePet";
import { MainLayout } from "@ui/layout/layout";
import { FC, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { Button, Input, Label, Select } from "./update-pet.style";
import { useTranslation } from "react-i18next";
import { useUpdatePet } from "./hooks/useUpdatePet";
import { ROUTES } from "@pages/router/routes.enums";
import { convertKgToLbs, convertLbsToKg } from "helpers/converter";
import i18n from "locales/i18n";

export const UpdatePetPage: FC = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: pet, isLoading } = useGetPetById(id!);
    const { t } = useTranslation();
    const { mutate, } = useUpdatePet();


    if (isLoading || !pet) {
        return <MainLayout>Loading...</MainLayout>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState({
        petName: pet?.petName || "",
        petBreed: pet?.petType || "",
        petWeight: i18n.language === "en" ? convertKgToLbs(pet?.petWeight || 0) : pet?.petWeight || 0,
        caloriesPerDay: pet?.caloriesPerDay || 0,
        activityLevel: pet?.activityLevel || "Low",
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "petWeight" || name === "caloriesPerDay" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const weightInKg = i18n.language === "en"
            ? convertLbsToKg(formData.petWeight)
            : formData.petWeight;

        mutate(
            {
                petId: id!,
                data: {
                    ...formData,
                    petWeight: weightInKg,
                }
            },
            {
                onSuccess: () => {
                    navigate(ROUTES.PET_PAGE.replace(":id", id!));
                }
            }
        );
    };

    return (
        <MainLayout>
            <Form onSubmit={handleSubmit}>
                <h2>{t("edit_pet_label")}</h2>

                <Label>
                    {t("petname")}
                    <Input name="petName" value={formData.petName} onChange={handleChange} />
                </Label>

                <Label>
                    {t("petbreed")}
                    <Input name="petBreed" value={formData.petBreed} onChange={handleChange} />
                </Label>

                <Label>
                    {t("petWeight")} ({i18n.language === "en" ? "lbs" : "кг"})
                    <Input
                        name="petWeight"
                        type="number"
                        min={0}
                        value={formData.petWeight}
                        onChange={handleChange}
                    />
                </Label>

                <Label>
                    {t("calories_per_day")}
                    <Input
                        name="caloriesPerDay"
                        type="number"
                        min={0}
                        value={formData.caloriesPerDay}
                        onChange={handleChange}
                    />
                </Label>

                <Label>
                    Рівень активності:
                    <Select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                        <option value="Low">{t("low_activity")}</option>
                        <option value="Moderate">{t("medium_activity")}</option>
                        <option value="High">{t("high_activity")}</option>
                    </Select>
                </Label>

                <Button type="submit">{t("update")}</Button>
            </Form>
        </MainLayout>
    );
};