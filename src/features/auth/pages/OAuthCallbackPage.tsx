import { useAppDispatch } from "@/app/hooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mapRoleNumberToString, type User } from "../types/auth.types";
import { setCredentials } from "../slices/authSlice";
import { redirectByRole } from "@/routes/utils/roleRedirect";

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const remoteError = searchParams.get("remoteError");

    if (remoteError) {
      toast.error(decodeURIComponent(remoteError), {
        duration: 5000,
      });
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
      const payload = JSON.parse(atob(token.split(".")[1]));

      const user: User = {
        id: payload.sub || payload.userId,
        email: payload.email || payload.Email,
        fullName: payload.fullName || payload.FullName || payload.name,
        role: mapRoleNumberToString(parseInt(payload.role || payload.Role)),
        roleNumber: parseInt(payload.role || payload.Role),
        roleName: payload.roleName || payload.RoleName,
        permissions: payload.permissions || payload.Permissions || [],
      };

      dispatch(
        setCredentials({
          user,
          accessToken: token,
          refreshToken,
        }),
      );

      toast.success(`Chào mừng ${user.fullName}`, {
        duration: 3000,
      });

      const redirectPath = redirectByRole(user.role);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Failed to parse OAuth token: ", error);
      toast.error("Failed to process authentication", {
        duration: 5000,
      });

      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Đang xử lý đăng nhập...
        </h2>
        <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
      </div>
    </div>
  );
}
