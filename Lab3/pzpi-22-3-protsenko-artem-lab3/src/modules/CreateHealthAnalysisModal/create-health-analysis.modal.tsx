import { FC, useState } from "react";
import { Button, Input, Modal, Overlay, Title } from "./create-health-analysis.style";
import { useTranslation } from "react-i18next";
import { useCreateHealthAnalysis } from "./hooks/useCreateHealthAnalysis";

interface Props {
    petId: string;
    isOpen: boolean;
    onClose: () => void;
  }

export const CreateHealthAnalysisModal: FC<Props> = ({ petId, isOpen, onClose }) => {
    const { mutate, isLoading } = useCreateHealthAnalysis(petId, onClose);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Title>{t("healthAnalysis.add")}</Title>
                <label>
                    {t("healthAnalysis.startDate")}
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    {t("healthAnalysis.endDate")}
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <Button onClick={() => mutate({ startDate, endDate })} disabled={isLoading}>
                    {t("healthAnalysis.add")}
                </Button>
            </Modal>
        </Overlay>
    );
};
  