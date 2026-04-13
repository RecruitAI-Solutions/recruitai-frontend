import { useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useApplicationDetail = (applicationId: string) => {
  return useQuery({
    queryKey: APPLICATION_QUERY_KEYS.detail(applicationId),
    queryFn: () => applicationApi.getDetail(applicationId),
    enabled: !!applicationId,
  });
};
