import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { cvApi } from "../services/cvApi";
import { CV_STATUS } from "../types/cv.types";
import { CV_QUERY_KEYS } from "./CVQueryKeys";

export const useUploadCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => cvApi.upload(file),

    onSuccess: (cv) => {
      // Invalidate list → tự refetch
      queryClient.invalidateQueries({ queryKey: CV_QUERY_KEYS.myCVs });
      if (cv.status === CV_STATUS.FAILED) {
        toast.error("Upload CV thất bại. Vui lòng thử lại.");
      } else {
        toast.success("Upload CV thành công!");
      }
    },

    onError: (error: AxiosError<{ message: string; errorCode?: number }>) => {
      const errorCode = error.response?.data?.errorCode;
      let message = "Upload thất bại. Vui lòng thử lại.";

      switch (errorCode) {
        case 3009:
          message = "File không hợp lệ hoặc trống.";
          break;
        case 3010:
          message = "File quá lớn, tối đa 10MB.";
          break;
        case 3011:
          message = "Chỉ chấp nhận file PDF.";
          break;
        case 4001:
          message = "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
          break;
        case 4002:
          message = "Bạn không có quyền thực hiện thao tác này.";
          break;
        default:
          message = error.response?.data?.message || message;
      }

      toast.error(message);
    },
  });
};
