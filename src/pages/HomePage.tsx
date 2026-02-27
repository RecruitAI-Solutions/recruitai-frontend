import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes.config";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Chào mừng đến với RecruitAI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Nền tảng tuyển dụng thông minh với công nghệ AI
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to={ROUTES.LOGIN}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Đăng nhập
          </Link>
          <Link
            to={ROUTES.REGISTER}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};
