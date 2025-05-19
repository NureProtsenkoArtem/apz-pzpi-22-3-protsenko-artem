import { deleteOldLogs, getServerConfiguration, getServerStatus, getSystemLogs, setServerConfiguration } from "@api/admin.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IServerConfiguration } from "types/servertypes/serverConfiguration.type";
import { IServerStatus } from "types/servertypes/serverStatus.type";
import { ISystemLog } from "types/systemLog/systemLog.type";

export const useSystemLogs = () => {
    return useQuery<ISystemLog[]>({
        queryKey: ["systemLogs"],
        queryFn: getSystemLogs,
    });
};

export const useServerStatus = () => {
    return useQuery<IServerStatus>({
        queryKey: ["serverStatus"],
        queryFn: getServerStatus,
    });
};

export const useServerConfiguration = () => {
    return useQuery<IServerConfiguration>({
        queryKey: ["serverConfiguration"],
        queryFn: getServerConfiguration,
    });
};


export const useSetServerConfiguration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IServerConfiguration) => setServerConfiguration(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["serverConfiguration"] });
        },
    });
};


export const useDeleteOldLogs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (olderThan: number) => deleteOldLogs(olderThan),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["systemLogs"] });
        },
    });
};