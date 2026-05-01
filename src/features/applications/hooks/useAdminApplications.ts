import { useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type { AdminApplicationsParams } from "../types/application.type";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useAdminApplications = (params?: AdminApplicationsParams) => {
  return useQuery({
    queryKey: APPLICATION_QUERY_KEYS.adminApplications(params),
    queryFn: () => applicationApi.getAdminApplications(params),
    staleTime: 1000 * 60 * 2,
  });
};
