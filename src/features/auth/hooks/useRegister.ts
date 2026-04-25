import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi, type RegisterRequest } from "../services/authApi";
import type { AxiosError } from "axios";
import { ROUTES } from "@/config/routes.config";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: RegisterRequest) => {
      const data = await authApi.register(credentials);
      await authApi.sendVerificationEmail({ email: data.user.email });
      return data;
    },

    onSuccess: (data) => {
      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
        {
          duration: 5000,
        },
      );
      navigate(
        `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(data.user.email)}`,
        { replace: true },
      );
    },

    onError: (
      error: AxiosError<{ message: string; errors?: Record<string, string[]> }>,
    ) => {
      console.log("Register error:", error);

      let message =
        error?.response?.data?.message || error?.message || "Đăng ký thất bại";

      const errors = error?.response?.data?.errors;
      if (errors) {
        const firstKey = Object.keys(errors)[0];
        if (firstKey) {
          const firstError = errors[firstKey]?.[0];
          if (firstError) {
            message = firstError;
          }
        }
      }

      toast.error(message, { duration: 3000 });
    },
  });
};
