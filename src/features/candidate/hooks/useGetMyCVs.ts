import { useQuery } from "@tanstack/react-query";
import { cvApi } from "../services/cvApi";
import { CV_QUERY_KEYS } from "./useUploadCV";

export const useGetMyCVs = (params?: Parameters<typeof cvApi.getMyCVs>[0]) => {
  return useQuery({
    queryKey: [...CV_QUERY_KEYS.myCVs, params],
    queryFn: () => cvApi.getMyCVs(params),
    staleTime: 2 * 60 * 1000,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      // Kiểm tra xem có CV nào đang pending hoặc processing không
      const hasProcessing = data.data.some(
        (cv) => cv.status === "Pending" || cv.status === "Processing",
      );
      return hasProcessing ? 5000 : false;
    },
  });
};
