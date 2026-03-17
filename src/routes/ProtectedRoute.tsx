import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../config/routes.config";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
};

export const ProtectedRoute = ({
  isAuthenticated,
  redirectTo = ROUTES.LOGIN,
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};
