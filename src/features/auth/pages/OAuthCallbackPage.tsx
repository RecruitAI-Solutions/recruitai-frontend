import { useAppDispatch } from "@/app/hooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mapRoleNumberToString, type User } from "../types/auth.types";
import { setCredentials } from "../slices/authSlice";
import { redirectByRole } from "@/routes/utils/roleRedirect";
import {
  clearAuthTokens,
  setRefreshToken,
  setToken,
} from "@/services/storage/localStorage";
import { axiosInstance } from "@/services/api/axiosInstance";
import { authApi } from "../services/authApi";

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const token = searchParams.get("token");
      const refreshToken = searchParams.get("refreshToken");
      const remoteError = searchParams.get("remoteError");

      if (remoteError) {
        toast.error(decodeURIComponent(remoteError), { duration: 5000 });
        navigate("/login", { replace: true });
        return;
      }

      if (!token || !refreshToken) {
        toast.error("OAuth authentication failed. Missing Tokens", {
          duration: 5000,
        });
        navigate("/login", { replace: true });
        return;
      }

      try {
        setToken(token);
        setRefreshToken(refreshToken);

        const fullUser = await authApi.getMe();

        dispatch(
          setCredentials({ user: fullUser, accessToken: token, refreshToken }),
        );

        toast.success(`Chào mừng ${fullUser.fullName}`, { duration: 3000 });
        const redirectPath = redirectByRole(fullUser.role);
        navigate(redirectPath, { replace: true });
      } catch (error) {
        clearAuthTokens();
        console.error("OAuth callback error:", error);
        toast.error("Đăng nhập thất bại. Vui lòng thử lại.", {
          duration: 5000,
        });
        navigate("/login", { replace: true });
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Đang xử lý đăng nhập...
        </h2>
        <p className="text-text-primary">Vui lòng đợi trong giây lát</p>
      </div>
    </div>
  );
}
