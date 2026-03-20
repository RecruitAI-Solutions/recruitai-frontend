import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";
import { DashboardLayout } from "@/shared/layouts/dashboard/DashboardLayout";
import { recruiterNavConfig } from "@/shared/layouts/configs";
import RecruiterDashboard from "@/features/recruiter/pages/RecruiterDashboard";

export type UserRole = "candidate" | "recruiter" | "admin";

export const createRecuiterRoutes = (
  userRole: UserRole | null,
): RouteObject => ({
  element: (
    <RoleBasedRoute
      userRole={userRole}
      allowedRoles={["recruiter"]}
      redirectTo={ROUTES.UNAUTHORIZED}
    />
  ),
  children: [
    {
      element: <DashboardLayout navConfig={recruiterNavConfig} />,
      children: [
        {
          path: ROUTES.RECRUITER.DASHBOARD,
          element: <RecruiterDashboard />,
        },
      ],
    },
  ],
});
