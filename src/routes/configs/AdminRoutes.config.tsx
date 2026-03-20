import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";
import { LogoutButton } from "../../features/auth/components/LogoutButton";
import { DashboardLayout } from "@/shared/layouts/dashboard/DashboardLayout";
import { adminNavConfig } from "@/shared/layouts/configs";

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
      element: <DashboardLayout navConfig={adminNavConfig} />,
      children: [
        {
          path: ROUTES.ADMIN.DASHBOARD,
          element: (
            <div className="h-[3000px]">
              ADMINDASHBOARD <LogoutButton />
            </div>
          ),
        },
      ],
    },
  ],
});
