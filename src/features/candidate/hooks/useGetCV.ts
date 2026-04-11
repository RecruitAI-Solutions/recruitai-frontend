import { useQuery } from "@tanstack/react-query";
import { cvApi } from "../services/cvApi";
import { CV_QUERY_KEYS } from "./CVQueryKeys";

export const useGetCV = (id: string) => {
  return useQuery({
    queryKey: CV_QUERY_KEYS.detail(id),
    queryFn: () => cvApi.getCV(id),
    enabled: !!id, // chỉ fetch khi có id
  });
};
