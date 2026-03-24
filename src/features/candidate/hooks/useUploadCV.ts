import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { cvApi } from "../services/cvApi";

export const CV_QUERY_KEYS = {
  myCVs: ["cvs", "my"] as const,
  detail: (id: string) => ["cvs", id] as const,
};

export const useUploadCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => cvApi.upload(file),

    onSuccess: () => {
      // Invalidate list → tự refetch
      queryClient.invalidateQueries({ queryKey: CV_QUERY_KEYS.myCVs });
      toast.success("Upload CV thành công!");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message || "Upload thất bại. Vui lòng thử lại.";
      toast.error(message);
    },
  });
};
