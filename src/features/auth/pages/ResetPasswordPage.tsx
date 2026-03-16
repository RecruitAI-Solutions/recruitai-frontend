import { ResetPasswordForm } from "../components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Đặt lại mật khẩu</h2>
          <p className="mt-2 text-sm text-gray-600">
            Nhập mật khẩu mới của bạn
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
