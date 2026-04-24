import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { companyApi } from "../services/companyApi";
import { COMPANY_QUERY_KEYS } from "./companyQueryKeys";
import type { UpdateCompanyRequest } from "../types/company.types";

export const useUpdateCompany = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCompanyRequest) =>
      companyApi.updateCompany(id, data),
    onSuccess: () => {
      toast.success("Cập nhật công ty thành công");
      queryClient.invalidateQueries({
        queryKey: COMPANY_QUERY_KEYS.detail(id),
      });
    },
    onError: () => toast.error("Cập nhật thất bại"),
  });
};
