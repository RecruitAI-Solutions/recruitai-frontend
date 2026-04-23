import { useQuery } from "@tanstack/react-query";
import { jobApi } from "@/features/jobs/services/jobApi";
import type { JobFilters } from "@/features/jobs/types/job.types";
import { ADMIN_QUERY_KEYS } from "./adminQueryKeys";

export const useAdminJobs = (filters?: JobFilters) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.jobs(filters),
    queryFn: () => jobApi.getJobs(filters),
    staleTime: 2 * 60 * 1000,
  });
};
