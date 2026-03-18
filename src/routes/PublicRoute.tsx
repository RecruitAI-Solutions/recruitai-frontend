import { Navigate, Outlet } from "react-router-dom";
import { redirectByRole } from "./utils/roleRedirect";

export type UserRole = "candidate" | "recruiter" | "admin";

type PublicRouteProps = {
  isAuthenticated: boolean;
  userRole?: UserRole | null;
  children?: React.ReactNode;
};

export const PublicRoute = ({
  isAuthenticated,
  userRole,
  children,
}: PublicRouteProps) => {
  if (isAuthenticated && userRole) {
    const redirectPath = redirectByRole(userRole);
    return <Navigate to={redirectPath} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};
