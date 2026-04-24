import { useQuery } from "@tanstack/react-query";
import { COMPANY_QUERY_KEYS } from "./companyQueryKeys";
import { companyApi } from "../services/companyApi";

export const useSuggestCompanies = (q: string, enabled = true) =>
  useQuery({
    queryKey: COMPANY_QUERY_KEYS.suggest(q),
    queryFn: () => companyApi.suggestCompanies(q),
    enabled: !!q && enabled,
    staleTime: 1000 * 60 * 2,
  });
