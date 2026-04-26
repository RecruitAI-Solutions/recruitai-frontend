import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { useSendVerificationEmail } from "../hooks/useSendVerificationEmail";
import { Button } from "@/shared/components/ui/Button";
import { ROUTES } from "@/config/routes.config";

export const VerifyEmailForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const {
    mutate: verifyEmail,
    isPending: isVerifying,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
  } = useVerifyEmail();

  const { mutate: sendVerification, isPending: isSending } =
    useSendVerificationEmail();

  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (email && token) {
      verifyEmail({ email, token });
    }
  }, [email, token, verifyEmail]);

  // Nếu có token và đang xác thực
  if (email && token) {
    if (isVerifying) {
      return (
        <div className="text-center py-8">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Đang xác thực email...</p>
        </div>
      );
    }

    if (isVerifySuccess) {
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
          <div className="w-full flex justify-center">
            <Button
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      );
    }

    if (isVerifyError) {
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
          <div className="w-full flex justify-center">
            <Button
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Quay về đăng nhập
            </Button>
          </div>
        </div>
      );
    }
  }

  // Nếu chỉ có email (từ trang đăng ký) => giao diện chờ xác thực
  if (email && !token) {
    return (
      <div className="text-center py-8 flex flex-col items-center justify-center w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Xác thực email của bạn
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          Chúng tôi đã gửi email xác thực đến <strong>{email}</strong>. Vui lòng
          kiểm tra hộp thư và làm theo hướng dẫn.
        </p>
        {!isSent ? (
          <div className="w-full flex justify-center">
            <Button
              onClick={() => {
                sendVerification(email);
                setIsSent(true);
              }}
              isLoading={isSending}
            >
              Gửi lại email xác thực
            </Button>
          </div>
        ) : (
          <p className="text-sm text-green-600">
            Đã gửi lại email. Vui lòng kiểm tra hộp thư.
          </p>
        )}
        <div className="mt-4">
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="cursor-pointer text-sm text-primary hover:underline"
          >
            Quay về đăng nhập
          </button>
        </div>
      </div>
    );
  }

  // Không có email, link không hợp lệ
  return (
    <div className="text-center py-8">
      <p className="text-gray-600">Link xác thực không hợp lệ.</p>
    </div>
  );
};