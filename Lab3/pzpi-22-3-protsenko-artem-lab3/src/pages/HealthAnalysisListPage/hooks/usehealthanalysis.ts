import { getHealthAnalysisByPetId } from "@api/health-analysis.api";
import { useQuery } from "@tanstack/react-query";
import { IHealthAnalysis } from "types/health-analysis/healthAnalysis.type";

export const useGetPetAnalysis = (id: string) => {
    return useQuery<IHealthAnalysis[]>({
        queryKey: ["health-analyses", id],
        queryFn: () => getHealthAnalysisByPetId(id),
        enabled: !!id,
    });
};