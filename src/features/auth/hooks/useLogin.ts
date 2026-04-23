import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi, type LoginRequest } from "../services/authApi";
import { setCredentials } from "../slices/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { redirectByRole } from "@/routes/utils/roleRedirect";

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

    onError: (error) => {
      const data = error.response?.data;

      console.log(error);

      if (status === 403 && message.includes("Email")) {
        return;
      }

      toast.error(data.message || "Đăng nhập thất bại");
    },
  });
};
