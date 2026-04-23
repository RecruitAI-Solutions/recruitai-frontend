import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cvApi } from "../services/cvApi";
import { CV_QUERY_KEYS } from "./CVQueryKeys";

export const useDeleteCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cvApi.deleteCV(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CV_QUERY_KEYS.myCVs });
      toast.success("Xóa CV thành công!");
    },
    onError: () => {
      toast.error("Không thể xóa CV. Vui lòng thử lại.");
    },
  });
};
