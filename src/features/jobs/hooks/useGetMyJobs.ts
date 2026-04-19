import { useQuery } from "@tanstack/react-query";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";
import { jobApi } from "../services/jobApi";
import type { JobFilters } from "../types/job.types";

export const useGetMyJobs = (filters?: JobFilters) =>
  useQuery({
    queryKey: [...JOB_QUERY_KEYS.myJobs, filters],
    queryFn: () => jobApi.getMyJobs(filters),
  });
