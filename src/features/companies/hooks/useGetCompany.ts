import { useQuery } from "@tanstack/react-query";
import { COMPANY_QUERY_KEYS } from "./companyQueryKeys";
import { companyApi } from "../services/companyApi";

export const useGetCompany = (id: string) =>
  useQuery({
    queryKey: COMPANY_QUERY_KEYS.detail(id),
    queryFn: () => companyApi.getCompany(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
