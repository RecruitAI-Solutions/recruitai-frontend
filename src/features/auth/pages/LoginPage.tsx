import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { LoginForm } from "../components/LoginForm";
import { OAuthButtons } from "../components/OAuthButtons";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Đăng nhập RecruitAI
        </h2>
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-100">
        <LoginForm />
        <OAuthButtons />
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500 mt-6">
        Bằng việc đăng nhập, bạn đồng ý với{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Điều khoản dịch vụ
        </a>
      </p>
    </div>
  );
}
