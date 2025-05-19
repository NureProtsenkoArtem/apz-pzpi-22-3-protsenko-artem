import { IServerConfiguration } from "types/servertypes/serverConfiguration.type";
import { $api } from "./base.api"
import { UserRole } from "types/user/userRole.enum";

export const backupData = async (directory: string) => {
    return await $api.get("/Admin/backup", {
        params: {
            outputDirectory: directory
        }
    });
}

export const getDbStatus = async () => {
    return (await $api.get("/Admin/db-status")).data
}


export const restoreData = async (backupFilePath: string) => {
    return await $api.post("/Admin/restore", JSON.stringify(backupFilePath), {
        headers: {
            "Content-Type": "text/json",
        },
    });
}

export const getSystemLogs = async () => {
    return (await $api.get("/system-log")).data
}

export const deleteOldLogs = async (olderThan: number) => {
    return await $api.delete("/system-log/delete-old-logs", {
        params: {
            olderThan: olderThan
        }
    })
}

export const getServerStatus = async () => {
    return (await $api.get("/Admin/server-status")).data
}

export const getServerConfiguration = async () => {
    return (await $api.get("/Admin/server-configuration")).data
}

export const setServerConfiguration = async (req: IServerConfiguration) => {
    return (await $api.post("/Admin/server-configuration", { ...req })).data
}


export const changeUserRole = async (userId: string, userRole: UserRole) => {
    return await $api.post(`/Admin/${userId}?userRole=${userRole}`);
};