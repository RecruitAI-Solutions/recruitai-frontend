import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/app/hooks";
import { logout as logoutAction } from "../slices/authSlice";
import { authApi } from "../services/authApi";
import { getRefreshToken } from "@/services/storage/localStorage";
import { ROUTES } from "@/config/routes.config";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          await authApi.logout({ refreshToken });
        } catch (error) {
          console.error("Logout API error:", error);
        }
      }
    },

    onSuccess: () => {
      dispatch(logoutAction());

      toast.success("Đăng xuất thành công!", {
        duration: 2000,
      });

      navigate(ROUTES.LOGIN, { replace: true });
    },

    onError: (error) => {
      dispatch(logoutAction());

      console.error("Logout error:", error);
      toast.error("Có lỗi xảy ra khi đăng xuất", {
        duration: 3000,
      });

      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
};
