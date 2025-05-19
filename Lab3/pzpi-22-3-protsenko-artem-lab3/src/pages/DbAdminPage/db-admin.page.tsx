import { MainLayout } from "@ui/layout/layout";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Section,
    Title,
    Label,
    Input,
    Button,
    StatusText,
    Row
} from "./db-admin.style";
import { useBackupData, useDbStatus, useRestoreData } from "./hooks/useAdmin";
import { parseTime } from "helpers/date-parse";
import { formatDateByLanguage, formatToLocalizedTime } from "helpers/converter";
import i18n from "locales/i18n";

export const DbAdminPage: FC = () => {
    const { t } = useTranslation();
    const { data: dbStatus, refetch } = useDbStatus();
    const { mutate: backup } = useBackupData();
    const { mutate: restore } = useRestoreData();
    const isEnglish = i18n.language === "en";

    const [backupPath, setBackupPath] = useState("");
    const [restorePath, setRestorePath] = useState("");

    return (
        <MainLayout>
            <Section>
                <Title>{t("dbStatusTitle")}</Title>
                <Row>
                    <StatusText>
                        {t("dbStatus_isDatabaseConnected")}: {" "}
                        {dbStatus?.isDatabaseConnected
                            ? dbStatus.isDatabaseConnected === true ? t("connected") : t("not_connected")
                            : t("loading")
                        }
                    </StatusText>
                    <StatusText>
                        {t("dbStatus_databaseSizeMB")}: {dbStatus?.databaseSizeMB || t("loading")}
                    </StatusText>
                    <StatusText>
                        {t("dbStatus_checkedAt")}:{" "}
                        {dbStatus?.checkedAt
                            ? `${formatDateByLanguage(dbStatus.checkedAt, i18n.language)} - ${
                            isEnglish ? formatToLocalizedTime(dbStatus.checkedAt, i18n.language) : parseTime(dbStatus.checkedAt)}`
                            : t("loading")}
                    </StatusText>
                    <Button onClick={() => refetch()}>{t("refresh")}</Button>
                </Row>
            </Section>

            <Section>
                <Title>{t("createBackup")}</Title>
                <Label>
                    {t("directory")}
                    <Input
                        type="text"
                        value={backupPath}
                        onChange={(e) => setBackupPath(e.target.value)}
                    />
                </Label>
                <Button onClick={() => backup(backupPath)}>{t("backup")}</Button>
            </Section>

            <Section>
                <Title>{t("restoreBackup")}</Title>
                <Label>
                    {t("directory")}
                    <Input
                        type="text"
                        value={restorePath}
                        onChange={(e) => setRestorePath(e.target.value)}
                    />
                </Label>
                <Button onClick={() => restore(restorePath)}>{t("restore")}</Button>
            </Section>
        </MainLayout>
    );
};
