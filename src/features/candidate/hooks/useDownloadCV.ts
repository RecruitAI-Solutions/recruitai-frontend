import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cvApi } from "../services/cvApi";

export const useDownloadCV = () => {
  return useMutation({
    mutationFn: ({ id, fileName }: { id: string; fileName: string }) =>
      cvApi.download(id, fileName),

    onSuccess: () => {
      toast.success("Tải CV thành công!");
    },

    onError: () => {
      toast.error("Không thể tải CV. Vui lòng thử lại.");
    },
  });
};
