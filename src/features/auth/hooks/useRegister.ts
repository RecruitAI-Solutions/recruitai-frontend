import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authApi, type RegisterCredentials } from "../services/authApi";

import type { AxiosError } from "axios";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      authApi.register(credentials),

    onSuccess: () => {
      toast.success("Đăng ký thành công", {
        duration: 3000,
      });

      navigate("/login", { replace: true });
    },

    onError: (error: AxiosError) => {
      console.error("Register erorr: ", error);
      toast.error("Đăng ký thất bại", {
        duration: 3000,
      });
    },
  });
};
