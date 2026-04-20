import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi, type RegisterRequest } from "../services/authApi";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "../slices/authSlice";
import type { AxiosError } from "axios";

export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (credentials: RegisterRequest) => authApi.register(credentials),

    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      toast.success("Đăng ký thành công", {
        duration: 3000,
      });

      navigate("/login", { replace: true });
    },

    onError: (error: AxiosError<{ message: string; errors?: Record<string, string[]> }>) => {
      console.log("Register error:", error);

      // Cách 1: Lấy message từ response
      const message = error?.response?.data?.message
        || error?.message
        || "Đăng ký thất bại";

      // Cách 2: Lấy chi tiết lỗi từ validation
      const errors = error?.response?.data?.errors;
      if (errors) {
        const firstError = Object.values(errors)[0]?.[0];
        toast.error(firstError || message);
      } else {
        toast.error(message);
      }

      toast.error(message, {
        duration: 3000,
      });
    },
  });
};
