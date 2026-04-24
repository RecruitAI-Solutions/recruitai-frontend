import { useQuery } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type { GetMyApplicationsParams } from "../types/application.type";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";
import { useState } from "react";

export const useGetMyApplications = (initialParams?: GetMyApplicationsParams) => {
  const [params, setParams] = useState<GetMyApplicationsParams>({
    page: 1,
    pageSize: 10,
    sortBy: "appliedAt",
    sortOrder: "desc",
    ...initialParams,
  });

  const query = useQuery({
    queryKey: APPLICATION_QUERY_KEYS.myApplications(params),
    queryFn: () => applicationApi.getMyApplications(params),
    staleTime: 2 * 60 * 1000,
  });

  const updateParams = (newParams: Partial<GetMyApplicationsParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: 1 }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    ...query,
    params,
    updateParams,
    handlePageChange,
  };
};