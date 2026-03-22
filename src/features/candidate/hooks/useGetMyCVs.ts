import { useQuery } from "@tanstack/react-query";
import { cvApi } from "../services/cvApi";
import { CV_QUERY_KEYS } from "./useUploadCV";

export const useGetMyCVs = () => {
  return useQuery({
    queryKey: CV_QUERY_KEYS.myCVs,
    queryFn: cvApi.getMyCVs,
    staleTime: 2 * 60 * 1000,
  });
};
