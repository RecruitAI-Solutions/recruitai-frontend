import { useMutation } from "@tanstack/react-query";
import type { ChangePasswordRequest } from "../types/auth.types";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useChangePassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials: ChangePasswordRequest) =>
      authApi.changePassword(credentials),
    onSuccess: (data) => {
      toast.success(data.message || "Đổi mật khẩu thành công");
      navigate(-1);
    },
    onError: (error: AxiosError) => {
      const message = error.message || "Đổi mật khẩu thất bại";
      toast.error(message);
    },
  });
};
