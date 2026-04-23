import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useSendVerificationEmail = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.sendVerificationEmail({ email }),
    onSuccess: () => {
      toast.success("Đã gửi email xác thực. Vui lòng kiểm tra hộp thư!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Gửi email thất bại");
    },
  });
};
