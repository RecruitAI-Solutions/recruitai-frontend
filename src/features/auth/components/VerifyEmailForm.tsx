import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { Button } from "@/shared/components/ui/Button";
import { ROUTES } from "@/config/routes.config";

export const VerifyEmailForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    mutate: verifyEmail,
    isPending,
    isSuccess,
    isError,
  } = useVerifyEmail();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (email && token) {
      verifyEmail({ email, token });
    }
  }, [searchParams, verifyEmail]);

  // Loading state
  if (isPending) {
    return (
      <div className="text-center py-8">
        <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600">Đang xác thực email...</p>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Xác thực thành công!
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Email của bạn đã được xác thực. Bạn có thể đăng nhập ngay bây giờ.
        </p>
        <Button onClick={() => navigate(ROUTES.LOGIN)}>Đăng nhập</Button>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Xác thực thất bại
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Link xác thực không hợp lệ hoặc đã hết hạn.
        </p>
        <Button onClick={() => navigate(ROUTES.LOGIN)}>
          Quay về đăng nhập
        </Button>
      </div>
    );
  }

  // Invalid link state
  return (
    <div className="text-center py-8">
      <p className="text-gray-600">Link xác thực không hợp lệ.</p>
    </div>
  );
};
