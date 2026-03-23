import { useQuery } from "@tanstack/react-query";
import { jobApi } from "../services/jobApi";

export const useGetJobs = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: () => jobApi.getJobs(),
  });
