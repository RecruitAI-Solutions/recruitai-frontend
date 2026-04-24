import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { candidateDashboardApi } from "../services/candidateDashboardApi";
import type { DashboardSummary } from "../types/dashboard.types";
import { DASHBOARD_QUERY_KEYS } from "./dachboardQueryKeys";

export const useCandidateDashboard = (
    options?: Omit<UseQueryOptions<DashboardSummary>, "queryKey" | "queryFn">
) => {
    return useQuery<DashboardSummary>({
        queryKey: DASHBOARD_QUERY_KEYS.DASHBOARD,
        queryFn: () => candidateDashboardApi.getDashboard(),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        ...options,
    });
};