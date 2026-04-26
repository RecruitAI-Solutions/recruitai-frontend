import { useQuery } from "@tanstack/react-query";
import { savedJobApi } from "../services/savedJobApi";

export const useGetSavedJobs = (params?: {
  page?: number;
  pageSize?: number;
}) =>
  useQuery({
    queryKey: ["saved-jobs", params],
    queryFn: () => savedJobApi.getSavedJobs(params),
    staleTime: 1000 * 60 * 2,
  });
