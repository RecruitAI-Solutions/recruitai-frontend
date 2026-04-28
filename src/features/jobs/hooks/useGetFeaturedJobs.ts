import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../services/jobApi";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";

export const useGetFeaturedJobs = () =>
  useQuery({
    queryKey: JOB_QUERY_KEYS.featured(),
    queryFn: () => jobApi.getFeatureJobs,
    staleTime: 1000 * 60 * 5,
  });
