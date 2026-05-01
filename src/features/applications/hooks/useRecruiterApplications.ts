import { useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type { RecruiterApplicationsParams } from "../types/application.type";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useRecruiterApplications = (
  params?: RecruiterApplicationsParams,
) => {
  return useQuery({
    queryKey: [...APPLICATION_QUERY_KEYS.all, "recruiter", params],
    queryFn: () => applicationApi.getRecruiterApplications(params),
    staleTime: 1000 * 60 * 2,
  });
};
