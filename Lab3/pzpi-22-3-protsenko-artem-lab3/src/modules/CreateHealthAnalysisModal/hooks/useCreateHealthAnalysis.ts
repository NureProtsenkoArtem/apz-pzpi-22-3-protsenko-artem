import { createHealthAnalysis } from "@api/health-analysis.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateHealthAnalysis = (petId: string, onSuccess: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ startDate, endDate }: { startDate: string; endDate: string }) =>
            createHealthAnalysis(petId, startDate, endDate),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["health-analyses", petId] });
            onSuccess();
        },
    });
  };