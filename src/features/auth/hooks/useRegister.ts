import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi, type RegisterRequest } from "../services/authApi";
import { useAppDispatch } from "@/app/hooks";
import { setCredentials } from "../slices/authSlice";

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

    onError: (error) => {
      const message = error.message || "Đăng ký thất bật";
      toast.error(message || "Đăng ký thất bại", {
        duration: 3000,
      });
      console.log(error.response?.data.message);
    },
  });
};
