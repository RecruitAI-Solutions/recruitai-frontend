import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";

export const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900">403</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Unauthorized
      </h2>
      <p className="mt-2 text-gray-500">
        You do not have permission to access this page.
      </p>

      <Link
        to={ROUTES.HOME}
        className="mt-6 rounded-lg bg-black px-6 py-2 text-white transition hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
};
