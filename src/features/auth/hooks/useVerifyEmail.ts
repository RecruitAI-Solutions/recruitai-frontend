import { useMutation } from "@tanstack/react-query";
import type { VerifyEmailRequest } from "../types/auth.types";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (credentials: VerifyEmailRequest) =>
      authApi.verifyEmail(credentials),
    onSuccess: (data) => {
      toast.success(data.message || "Xác thực email thành công!");
    },
    onError: (error: AxiosError) => {
      const message = error.message || "Xác thực email thất bại";
      toast.error(message);
    },
  });
};
