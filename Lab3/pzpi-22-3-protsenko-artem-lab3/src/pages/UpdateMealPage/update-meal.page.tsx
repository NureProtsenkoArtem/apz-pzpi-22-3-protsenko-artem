import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMealById } from "./hooks/useGetMealById";
import { useUpdateMeal } from "./hooks/useUpdateMeal";
import { MainLayout } from "@ui/layout/layout";
import { Input, Label, Checkbox, Button } from "./update-meal.style";
import { useTranslation } from "react-i18next";
import i18n from "locales/i18n";
import { gramsToOunces, ouncesToGrams } from "helpers/converter";

export const UpdateMealPage: FC = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const isOunces = i18n.language === "en";

    const { data: meal, isLoading } = useGetMealById(id!);
    const { mutate: updateMeal } = useUpdateMeal(id!, meal?.petId || "");

    const [formData, setFormData] = useState({
        portionSize: 0,
        startTime: "",
        adaptiveAdjustment: false,
        foodType: "",
        calorificValue: 0,
        isDaily: false,
    });

    // Оновлюємо formData, коли meal буде завантажено
    useEffect(() => {
        if (meal) {
            setFormData({
                portionSize: isOunces ? gramsToOunces(meal.portionSize || 0) : meal.portionSize || 0,
                startTime: meal.startTime?.slice(0, 16) || "",
                adaptiveAdjustment: meal.adaptiveAdjustment || false,
                foodType: meal.foodType || "",
                calorificValue: meal.calorificValue || 0,
                isDaily: meal.isDaily || false,
            });
        }
    }, [meal, isOunces]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const portionInGrams = isOunces
            ? ouncesToGrams(Number(formData.portionSize))
            : Number(formData.portionSize);

        updateMeal({
            ...formData,
            portionSize: portionInGrams,
            mealStatus: meal!.mealStatus,
            caloriesConsumed: meal!.caloriesConsumed,
        });
    };

    if (isLoading || !meal) {
        return <MainLayout>Loading...</MainLayout>;
    }

    return (
        <MainLayout>
            <h1>{t("update_meal_text")}</h1>
            <form onSubmit={handleSubmit}>
                <Label>
                    {t("portionSize")} ({isOunces ? "oz" : "г"})
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
                    {t("foodType")}
                    <Input
                        name="foodType"
                        value={formData.foodType}
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
                    <Checkbox
                        type="checkbox"
                        name="adaptiveAdjustment"
                        checked={formData.adaptiveAdjustment}
                        onChange={handleChange}
                    />
                    {t("adaptiveAdjustment")}
                </Label>

                <Label>
                    <Checkbox
                        type="checkbox"
                        name="isDaily"
                        checked={formData.isDaily}
                        onChange={handleChange}
                    />
                    {t("isDaily")}
                </Label>

                <Button type="submit">{t("save")}</Button>
            </form>
        </MainLayout>
    );
};
