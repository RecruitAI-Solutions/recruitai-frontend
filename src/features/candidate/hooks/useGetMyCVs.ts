import { useQuery } from "@tanstack/react-query";
import { cvApi } from "../services/cvApi";
import type { CVFilters } from "./useCVFilter";
import { CV_QUERY_KEYS } from "./CVQueryKeys";
type UseGetMyCVsOptions = {
  filters: CVFilters;
  enabled?: boolean;
};
export const useGetMyCVs = ({
  filters,
  enabled = true,
}: UseGetMyCVsOptions) => {
  return useQuery({
    queryKey: [...CV_QUERY_KEYS.myCVs, filters],
    queryFn: () => cvApi.getMyCVs(filters),
    staleTime: 2 * 60 * 1000,
    enabled,
    placeholderData: (prev) => prev,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      const hasProcessing = data.data.some(
        (cv) => cv.status === "Processing" || cv.status === "Uploaded",
      );
      return hasProcessing ? 5000 : false;
    },
  });
};
