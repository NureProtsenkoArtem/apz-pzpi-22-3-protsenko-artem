import { MainLayout } from "@ui/layout/layout";
import { FC, useEffect, useState } from "react";
import { useSystemLogs, useServerStatus, useServerConfiguration, useSetServerConfiguration, useDeleteOldLogs } from "./hooks/useSystemAdmin";
import {
    Container,
    Tab,
    Tabs,
    Table,
    TableRow,
    TableCell,
    SectionTitle,
    Pagination,
    StatusBlock,
    ConfigBlock,
    DeleteLogsBlock,
    DeleteButton,
    DeleteLabel,
    Form,
    FormGroup,
    Label,
    Input,
    SubmitButton,
} from "./system-admin.style";
import { ISystemLog } from "types/systemLog/systemLog.type";
import { parseTime } from "helpers/date-parse";
import { useTranslation } from "react-i18next";
import { IServerConfiguration } from "types/servertypes/serverConfiguration.type";
import { formatDateByLanguage, formatToLocalizedTime } from "helpers/converter";
import i18n from "locales/i18n";

export const SystemAdminPage: FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<"logs" | "status" | "config">("logs");
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;
    const [daysOld, setDaysOld] = useState(30);
    const { mutate: deleteLogs, isPending } = useDeleteOldLogs();
    const { data: logs = [] } = useSystemLogs();
    const { data: serverStatus } = useServerStatus();
    const { data: serverConfig } = useServerConfiguration();
    const isEnglish = i18n.language === "en";
    const [configForm, setConfigForm] = useState<IServerConfiguration>({
        accessSecretKey: serverConfig?.accessSecretKey || "",
        refreshSecretKey: serverConfig?.refreshSecretKey || "",
        encryptionKey: serverConfig?.encryptionKey || "",
    });

    useEffect(() => {
        if (serverConfig) {
            setConfigForm(serverConfig);
        }
    }, [serverConfig]);

    const { mutate: updateConfig, isPending: isSaving } = useSetServerConfiguration();

    const paginatedLogs = logs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);
    const totalPages = Math.ceil(logs.length / logsPerPage);


    return (
        <MainLayout>
            <Container>
                <Tabs>
                    <Tab active={activeTab === "logs"} onClick={() => setActiveTab("logs")}>{t("logs.title")}</Tab>
                    <Tab active={activeTab === "status"} onClick={() => setActiveTab("status")}>{t("server_status.title")}</Tab>
                    <Tab active={activeTab === "config"} onClick={() => {
                        setActiveTab("config");
                    }}>{t("config.title")}</Tab>
                </Tabs>

                {activeTab === "logs" && (
                    <>
                        <SectionTitle>{t("logs.title")}</SectionTitle>
                        <DeleteLogsBlock>
                            <DeleteLabel>
                                {t("logs.deleteOlderThan")}:
                                <input
                                    type="number"
                                    min={1}
                                    value={daysOld}
                                    onChange={(e) => setDaysOld(Number(e.target.value))}
                                />
                                {t("logs.days")}
                            </DeleteLabel>
                            <DeleteButton onClick={() => deleteLogs(daysOld)} disabled={isPending}>
                                {isPending ? t("logs.deleting") : t("logs.deleteButton")}
                            </DeleteButton>
                        </DeleteLogsBlock>

                        <Table>
                            <thead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>{t("logs.time")}</TableCell>
                                    <TableCell>{t("logs.message")}</TableCell>
                                </TableRow>
                            </thead>
                            <tbody>
                                {paginatedLogs.map((log: ISystemLog, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{log.id || index}</TableCell>
                                        <TableCell>{`${formatDateByLanguage(log.createdAt, i18n.language)} -- 
                                        ${isEnglish ? formatToLocalizedTime(log.createdAt, i18n.language) : parseTime(log.createdAt)}`}</TableCell>
                                        <TableCell>{log.message}</TableCell>
                                    </TableRow>
                                ))}
                            </tbody>
                        </Table>

                        <Pagination>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    disabled={currentPage === i + 1}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </Pagination>
                    </>
                )}

                {activeTab === "status" && (
                    <StatusBlock>
                        <SectionTitle>{t("server_status.title")}</SectionTitle>
                        <p>{t("server_status.cpu")}: {serverStatus?.cpuUsagePercent || "—"}%</p>
                        <p>{t("server_status.ram")}: {serverStatus?.memoryUsageMB || "—"} MB</p>
                        <p>{t("server_status.uptime")}: {serverStatus?.uptime || "—"}</p>
                    </StatusBlock>
                )}

                {activeTab === "config" && (
                    <ConfigBlock>
                        <SectionTitle>{t("server_config.configuration")}</SectionTitle>

                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            updateConfig(configForm);
                        }}>
                            <FormGroup>
                                <Label>{t("server_config.accessSecretKey")}</Label>
                                <Input
                                    type="text"
                                    value={configForm.accessSecretKey}
                                    onChange={(e) => setConfigForm(prev => ({ ...prev, accessSecretKey: e.target.value }))}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>{t("server_config.refreshSecretKey")}</Label>
                                <Input
                                    type="text"
                                    value={configForm.refreshSecretKey}
                                    onChange={(e) => setConfigForm(prev => ({ ...prev, refreshSecretKey: e.target.value }))}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>{t("server_config.encryptionKey")}</Label>
                                <Input
                                    type="text"
                                    value={configForm.encryptionKey}
                                    onChange={(e) => setConfigForm(prev => ({ ...prev, encryptionKey: e.target.value }))}
                                />
                            </FormGroup>

                            <SubmitButton type="submit" disabled={isSaving}>
                                {isSaving ? t("saving") : t("save")}
                            </SubmitButton>
                        </Form>
                    </ConfigBlock>
                )}
            </Container>
        </MainLayout>
    );
};
