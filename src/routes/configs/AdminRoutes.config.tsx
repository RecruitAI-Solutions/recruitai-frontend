import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";

export type UserRole = "candidate" | "recruiter" | "admin";

export const createAdminRoutes = (userRole: UserRole | null): RouteObject => ({
  element: (
    <RoleBasedRoute
      userRole={userRole}
      allowedRoles={["admin"]}
      redirectTo={ROUTES.UNAUTHORIZED}
    />
  ),
  children: [
    {
      path: ROUTES.ADMIN.DASHBOARD,
      element: <>ADMIN DASHBOARD</>,
    },
  ],
});
