import { useQuery } from "@tanstack/react-query";
import { JOB_QUERY_KEYS } from "./jobQueryKeys";
import { jobApi } from "../services/jobApi";

export const useGetMyJobs = () =>
  useQuery({
    queryKey: JOB_QUERY_KEYS.myJobs,
    queryFn: () => jobApi.getMyJobs(),
  });
