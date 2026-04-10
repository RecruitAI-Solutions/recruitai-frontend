import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../services/jobApi";
import { useDebouncedFilters } from "./useDebouncedFilters";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";

export const useGetJobs = () => {
  const debouncedFilters = useDebouncedFilters();

  return useQuery({
    queryKey: JOB_QUERY_KEYS.list(debouncedFilters),
    queryFn: () => jobApi.getJobs(debouncedFilters),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
};
