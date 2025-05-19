import { backupData, getDbStatus, restoreData } from "@api/admin.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IDbStatus } from "types/dbtype/dbStatus.type";

export const useBackupData = () => {
    return useMutation({
        mutationFn: (directory: string) => backupData(directory),
    });
};

export const useDbStatus = () => {
    return useQuery<IDbStatus>({
        queryKey: ["dbStatus"],
        queryFn: getDbStatus,
    });
};

export const useRestoreData = () => {
    return useMutation({
        mutationFn: (directoryPath: string) => restoreData(directoryPath),
    });
};