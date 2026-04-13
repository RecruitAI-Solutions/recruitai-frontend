import { useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type { JobApplicationsParams } from "../types/application.type";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useGetApplicationsByJob = (
  jobId: string,
  params?: JobApplicationsParams,
) => {
  return useQuery({
    queryKey: APPLICATION_QUERY_KEYS.jobApplications(jobId, params),
    queryFn: () => applicationApi.getApplicationsByJob(jobId, params),
    enabled: !!jobId,
  });
};
