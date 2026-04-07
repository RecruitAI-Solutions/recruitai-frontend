import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../services/jobApi";

export const useGetJobs = (params?: Record<string, unknown>) =>
  useQuery({
    queryKey: ["jobs", params],
    queryFn: () => jobApi.getJobs(params),
  });
