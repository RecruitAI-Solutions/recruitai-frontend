import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordRequest } from "../types/auth.types";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (credentails: ForgotPasswordRequest) =>
      authApi.forgotPassword(credentails),
    onSuccess: (data) => {
      toast.success(data.message || "Email reset mật khẩu đã được gửi!");
    },
    onError: (error: AxiosError) => {
      const message = error.message || "Gửi email thất bại";
      toast.error(message);
    },
  });
};
