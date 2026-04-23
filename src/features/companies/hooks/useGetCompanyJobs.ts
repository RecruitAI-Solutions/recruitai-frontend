import { useQuery } from "@tanstack/react-query";
import { COMPANY_QUERY_KEYS } from "./companyQueryKeys";
import { companyApi } from "../services/companyApi";

export const useGetCompanyJobs = (
  id: string,
  params?: { page?: number; pageSize?: number },
) =>
  useQuery({
    queryKey: COMPANY_QUERY_KEYS.jobs(id, params),
    queryFn: () => companyApi.getCompanyJobs(id, params),
    enabled: !!id,
  });
