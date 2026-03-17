import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { LoginForm } from "../components/LoginForm";
import { OAuthButtons } from "../components/OAuthButtons";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Đăng nhập RecruitAI
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              to={ROUTES.REGISTER}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <LoginForm />

          <OAuthButtons />
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-500">
          Bằng việc đăng nhập, bạn đồng ý với{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Điều khoản dịch vụ
          </a>{" "}
          và{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Chính sách bảo mật
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
