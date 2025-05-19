import { useAuthStore } from "@pages/LoginPage/store/auth-store";
import { MainLayout } from "@ui/layout/layout";
import { FC, useState } from "react";
import { Button, FormWrapper, Input, Select, Title, Error, OuterWrapper } from "./createPetPage.style";
import { useTranslation } from "react-i18next";
import { useCreatePet } from "./hooks/useCreatePet";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@pages/router/routes.enums";

type ActivityLevel = "Low" | "Moderate" | "High";

export const CreatePetPage: FC = () => {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const { mutate } = useCreatePet();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        petName: '',
        petBreed: '',
        petWeight: '',
        caloriesPerDay: '',
        activityLevel: 'Low' as ActivityLevel,
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.petName || !formData.petBreed || !formData.petWeight || !formData.caloriesPerDay) {
            setError(t("error_all_fields"));
            return;
        }

        if (!user) return

        mutate({
            userId: user.userId,
            petName: formData.petName,
            petBreed: formData.petBreed,
            petWeight: Number(formData.petWeight),
            caloriesPerDay: Number(formData.caloriesPerDay),
            activityLevel: formData.activityLevel,
        });

        navigate(ROUTES.HOME)


        setError('');
    };

    return (
        <MainLayout>
            <OuterWrapper>
                <FormWrapper>
                    <Title>{t("pet_create_title")}</Title>
                    <form onSubmit={handleSubmit}>
                        {error && <Error>{error}</Error>}

                        <Input
                            type="text"
                            name="petName"
                            placeholder={t("petname")}
                            value={formData.petName}
                            onChange={handleChange}
                        />

                        <Input
                            type="text"
                            name="petBreed"
                            placeholder={t("petbreed")}
                            value={formData.petBreed}
                            onChange={handleChange}
                        />

                        <Input
                            type="number"
                            name="petWeight"
                            placeholder={t("petWeight")}
                            value={formData.petWeight}
                            onChange={handleChange}
                        />

                        <Input
                            type="number"
                            name="caloriesPerDay"
                            placeholder={t("calories_per_day")}
                            value={formData.caloriesPerDay}
                            onChange={handleChange}
                        />

                        <Select
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                        >
                            <option value="Low">{t("low_activity")}</option>
                            <option value="Moderate">{t("medium_activity")}</option>
                            <option value="High">{t("high_activity")}</option>
                        </Select>

                        <Button type="submit">{t("add")}</Button>
                    </form>

                </FormWrapper>
            </OuterWrapper>
        </MainLayout >
    );
};