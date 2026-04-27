import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services/authApi";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () => authApi.getMe(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
