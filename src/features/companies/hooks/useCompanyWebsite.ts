import { useQuery } from "@tanstack/react-query";
import { companyApi } from "../services/companyApi";

export const useFillCompanyWebsite = (companyId: string | null) => {
  return useQuery({
    queryKey: ["company", companyId, "website"],
    queryFn: () => companyApi.getCompany(companyId!),
    enabled: !!companyId,
    staleTime: 1000 * 60 * 60,
    select: (data) => data.website,
  });
};
