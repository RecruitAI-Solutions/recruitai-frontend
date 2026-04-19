import { useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type { MyApplicationsParams } from "../types/application.type";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useGetMyApplications = (params?: MyApplicationsParams) => {
  return useQuery({
    queryKey: APPLICATION_QUERY_KEYS.myApplications(params),
    queryFn: () => applicationApi.getMyApplications(params),
    staleTime: 2 * 60 * 1000,
  });
};
