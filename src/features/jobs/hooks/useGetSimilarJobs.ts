import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../services/jobApi";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";

export const useGetSimilarJobs = (jobId: string, enabled = true) =>
  useQuery({
    queryKey: JOB_QUERY_KEYS.similar(jobId),
    queryFn: () => jobApi.getSimilarJobs(jobId),
    enabled: !!jobId && enabled,
    staleTime: 1000 * 60 * 5,
  });
