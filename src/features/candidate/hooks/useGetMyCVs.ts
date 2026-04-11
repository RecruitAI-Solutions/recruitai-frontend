import { useQuery } from "@tanstack/react-query";
import { cvApi } from "../services/cvApi";
import type { CVFilters } from "./useCVFilter";
import { CV_QUERY_KEYS } from "./CVQueryKeys";

export const useGetMyCVs = (filters: CVFilters) => {
  return useQuery({
    queryKey: [...CV_QUERY_KEYS.myCVs, filters],
    queryFn: () => cvApi.getMyCVs(filters),
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      const hasProcessing = data.data.some(
        (cv) => cv.status === "Pending" || cv.status === "Processing",
      );
      return hasProcessing ? 5000 : false;
    },
  });
};
