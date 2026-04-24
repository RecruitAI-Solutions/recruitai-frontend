import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../services/jobApi";
import { useDebouncedFilters } from "./useDebouncedFilters";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";
import type { JobFilters } from "../types/job.types";

export const useFeatureJobs = (filters: JobFilters) => {
  const debouncedFilters = useDebouncedFilters(filters);

  return useQuery({
    queryKey: JOB_QUERY_KEYS.list(debouncedFilters),
    queryFn: () => jobApi.getFeatureJobs(),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
