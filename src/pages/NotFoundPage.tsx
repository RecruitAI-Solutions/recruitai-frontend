import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-6xl font-bold text-text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-text-secondary">
        Page Not Found
      </h2>
      <p className="mt-2 text-text-secondary">
        The page you are looking for does not exist.
      </p>

      <Link
        to={ROUTES.HOME}
        className="mt-6 rounded-lg bg-primary px-6 py-2 text-primary-foreground transition hover:bg-gray-700"
      >
        Go back to Home
      </Link>
    </div>
  );
};
