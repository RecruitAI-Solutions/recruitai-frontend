import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import { ADMIN_QUERY_KEYS } from "./adminQueryKeys";
import type { AdminStatsParams } from "../types/admin.types";

export const useAdminStats = (params?: AdminStatsParams) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.stats(params),
    queryFn: () => adminApi.getStats(params),
    staleTime: 5 * 60 * 1000,
  });
};
