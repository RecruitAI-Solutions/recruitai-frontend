import { useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type { RecruiterCandidatesParams } from "../types/application.type";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useRecruiterCandidates = (params?: RecruiterCandidatesParams) => {
  return useQuery({
    queryKey: APPLICATION_QUERY_KEYS.recruiterCandidates(params),
    queryFn: () => applicationApi.getRecruiterCandidates(params),
    staleTime: 1000 * 60 * 2,
  });
};
