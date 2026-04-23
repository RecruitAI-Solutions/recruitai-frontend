import { useQuery } from "@tanstack/react-query";
import { companyApi } from "../services/companyApi";
import { COMPANY_QUERY_KEYS } from "./companyQueryKeys";
import type { CompanyFilters } from "../types/company.types";

export const useGetCompanies = (params?: CompanyFilters) =>
  useQuery({
    queryKey: COMPANY_QUERY_KEYS.list(params),
    queryFn: () => companyApi.getCompanies(params),
    staleTime: 1000 * 60 * 5,
  });
