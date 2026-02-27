import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Đăng nhập</h2>
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

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <p className="text-center text-gray-600">
            Login form sẽ được implement ở đây
          </p>
        </div>
      </div>
    </div>
  );
};
