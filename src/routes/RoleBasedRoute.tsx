import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../config/routes.config";
import { useAppSelector } from "@/app/hooks";

export type UserRole = "candidate" | "recruiter" | "admin";

type RoleBasedRouteProps = {
  userRole: UserRole | null;
  allowedRoles: UserRole[];
  redirectTo?: string;
  children?: React.ReactNode;
};

export const RoleBasedRoute = ({
  userRole,
  allowedRoles,
  redirectTo = ROUTES.UNAUTHORIZED,
  children,
}: RoleBasedRouteProps) => {
  const location = useLocation();
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!userRole) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
