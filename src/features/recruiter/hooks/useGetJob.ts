import { useQuery } from "@tanstack/react-query";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";
import { jobApi } from "../services/jobApi";

export const useGetJob = (id: string) =>
  useQuery({
    queryKey: JOB_QUERY_KEYS.detail(id),
    queryFn: () => jobApi.getJob(id),
    enabled: !!id,
  });
