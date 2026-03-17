import { ROUTES } from "../../config/routes.config";
import { type UserRole } from "../RoleBasedRoute";

export const redirectByRole = (role: UserRole): string => {
  const roleRouteMap: Record<UserRole, string> = {
    candidate: ROUTES.CANDIDATE.DASHBOARD,
    recruiter: ROUTES.RECRUITER.DASHBOARD,
    admin: ROUTES.ADMIN.DASHBOARD,
  };
  return roleRouteMap[role] || ROUTES.HOME;
};

export const isPublicRoute = (pathname: string): boolean => {
  const publicPaths = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.ABOUT,
    ROUTES.CONTACT,
  ];

  return (publicPaths as readonly string[]).includes(pathname);
};

export const getDashboardRoute = (role: UserRole): string => {
  return redirectByRole(role);
};
