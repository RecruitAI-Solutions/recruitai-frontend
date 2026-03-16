import { useMutation } from "@tanstack/react-query";
import type { ChangePasswordRequest } from "../types/auth.types";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (credentials: ChangePasswordRequest) =>
      authApi.changePassword(credentials),
    onSuccess: (data) => {
      toast.success(data.message || "Đổi mật khẩu thành công");
    },
    onError: (error: AxiosError) => {
      const message = error.message || "Đổi mật khẩu thất bại";
      toast.error(message);
    },
  });
};
