import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { ResetPasswordRequest } from "../types/auth.types";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import { ROUTES } from "@/config/routes.config";
import type { AxiosError } from "axios";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: ResetPasswordRequest) =>
      authApi.resetPassword(credentials),
    onSuccess: (data) => {
      toast.success(data.message || "Đặt lại mật khẩu thành công");
      navigate(ROUTES.LOGIN);
    },
    onError: (error: AxiosError) => {
      const message = error.message || "Đặt lại mật khẩu thất bại";
      toast.error(message);
    },
  });
};
