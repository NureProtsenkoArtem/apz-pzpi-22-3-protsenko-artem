import { MainLayout } from "@ui/layout/layout";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Form,
    Label,
    Input,
    Button,
    CheckboxWrapper,
} from "./add-meal.style"
import { useParams } from "react-router-dom";
import { AddMealRequest } from "types/meal/add-meal-request";
import { useAddMeal } from "./hooks/useAddMeal";

export const AddMealPage: FC = () => {
    const { id: petId } = useParams();
    const { t } = useTranslation();
    const { mutate: addMealMutation, } = useAddMeal(petId!);

    const [formData, setFormData] = useState({
        portionSize: 0,
        startTime: new Date().toISOString().slice(0, 16),
        calorificValue: 0,
        adaptiveAdjustment: false,
        foodType: "",
        isDaily: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const requestData: AddMealRequest = {
            ...formData,
            portionSize: Number(formData.portionSize),
            calorificValue: Number(formData.calorificValue),
        };

        addMealMutation(requestData);
    };


    return (
        <MainLayout>
            <Form onSubmit={handleSubmit}>
                <h2>{t("add_meal_title")}</h2>

                <Label>
                    {t("portionSize")}
                    <Input
                        type="number"
                        name="portionSize"
                        value={formData.portionSize}
                        onChange={handleChange}
                    />
                </Label>

                <Label>
                    {t("startTime")}
                    <Input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                    />
                </Label>

                <Label>
                    {t("calorificValue")}
                    <Input
                        type="number"
                        name="calorificValue"
                        value={formData.calorificValue}
                        onChange={handleChange}
                    />
                </Label>

                <Label>
                    {t("foodType")}
                    <Input
                        type="text"
                        name="foodType"
                        value={formData.foodType}
                        onChange={handleChange}
                    />
                </Label>

                <CheckboxWrapper>
                    <label>
                        <input
                            type="checkbox"
                            name="adaptiveAdjustment"
                            checked={formData.adaptiveAdjustment}
                            onChange={handleChange}
                        />
                        {t("adaptiveAdjustment")}
                    </label>
                </CheckboxWrapper>

                <CheckboxWrapper>
                    <label>
                        <input
                            type="checkbox"
                            name="isDaily"
                            checked={formData.isDaily}
                            onChange={handleChange}
                        />
                        {t("isDaily")}
                    </label>
                </CheckboxWrapper>

                <Button type="submit">{t("submit")}</Button>
            </Form>
        </MainLayout>
    );
};
