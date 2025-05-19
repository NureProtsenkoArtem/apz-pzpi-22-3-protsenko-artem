import { MainLayout } from "@ui/layout/layout";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetPetAnalysis } from "./hooks/usehealthanalysis";
import { Card, CardInfo, CardList, CardTitle, CreateButton, Header, PageWrapper, Title } from "./health-analysis-list.stle";
import { CreateHealthAnalysisModal } from "@modules/CreateHealthAnalysisModal/create-health-analysis.modal";
import { formatDateByLanguage } from "helpers/converter";
import i18n from "locales/i18n";

export const HealthAnalysisListPage: FC = () => {
    const { id } = useParams();
    const { data: analyses, isLoading } = useGetPetAnalysis(id!);
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <MainLayout>
            <PageWrapper>
                <Header>
                    <Title>{t("healthAnalysis.title")}</Title>
                    <CreateButton onClick={() => setIsModalOpen(true)}>
                        + {t("healthAnalysis.add")}
                    </CreateButton>
                </Header>

                {isLoading ? (
                    <p>{t("healthAnalysis.loading")}</p>
                ) : (
                    <CardList>
                        {analyses?.map((item) => (
                            <Card key={item.healthAnalysisId}>
                                <CardTitle>{item.healthAnalysisType}</CardTitle>
                                <CardInfo><strong>{t("healthAnalysis.date")}:</strong> {formatDateByLanguage(item.analysisDate, i18n.language)}</CardInfo>
                                <CardInfo><strong>{t("healthAnalysis.period")}:</strong> {item.analysisStartDate} – {item.analysisEndDate}</CardInfo>
                                <CardInfo><strong>{t("healthAnalysis.calories")}:</strong> {item.caloriesConsumed}</CardInfo>
                                <CardInfo><strong>{t("healthAnalysis.recommendations")}:</strong> {item.recomendations}</CardInfo>
                            </Card>
                        ))}
                    </CardList>
                )}

                {isModalOpen && (
                    <CreateHealthAnalysisModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        petId={id!}
                    />
                )}
            </PageWrapper>
        </MainLayout>
    );
};