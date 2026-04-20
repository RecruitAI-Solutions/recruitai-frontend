import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import { ADMIN_QUERY_KEYS } from "./adminQueryKeys";
import type { ReportParams } from "../types/admin.types";

export const useJobsByMonthReport = (params?: ReportParams) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.jobsReport(params),
    queryFn: () => adminApi.getJobsByMonthReport(params),
  });
};

export const useApplicationsByMonthReport = (params?: ReportParams) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.applicationsReport(params),
    queryFn: () => adminApi.getApplicationsByMonthReport(params),
  });
};
