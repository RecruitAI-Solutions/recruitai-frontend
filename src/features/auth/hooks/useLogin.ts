import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi, type LoginRequest } from "../services/authApi";
import { setCredentials } from "../slices/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { redirectByRole } from "@/routes/utils/roleRedirect";
import type { AxiosError } from "axios";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),
      );

      toast.success(`Chào mừng`, {
        duration: 3000,
      });

      const redirectPath = redirectByRole(data.user.role);
      navigate(redirectPath, { replace: true });
    },

    onError: (error: AxiosError) => {
      console.error("Login error: ", error);
      const message = error.message;
      toast.error(message, {
        duration: 3000,
      });
    },
  });
};
