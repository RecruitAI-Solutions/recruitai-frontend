import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../config/routes.config";

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

  if (!userRole) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
