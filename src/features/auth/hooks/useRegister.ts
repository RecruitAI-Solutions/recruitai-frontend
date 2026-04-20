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

      let message = error?.response?.data?.message || error?.message || "Đăng ký thất bại";

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
