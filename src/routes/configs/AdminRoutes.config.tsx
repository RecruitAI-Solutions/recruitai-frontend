import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";
import { DashboardLayout } from "@/shared/layouts/dashboard/DashboardLayout";
import { adminNavConfig } from "@/shared/layouts/configs";
import { UserManagementPage } from "@/features/admin/pages/UserManagementPage";
import { JobsManagementPage } from "@/features/admin/pages/JobManagementPage";
import { SkillsManagementPage } from "@/features/admin/pages/SkillsManagementPage";
import { AuditLogsPage } from "@/features/admin/pages/AuditLogsPage";
import { AdminDashboard } from "@/features/admin/pages/AdminDashboard";

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
          element: <AdminDashboard />,
        },
        {
          path: ROUTES.ADMIN.USERS,
          element: <UserManagementPage />,
        },
        { path: ROUTES.ADMIN.JOBS, element: <JobsManagementPage /> },
        { path: ROUTES.ADMIN.SKILLS, element: <SkillsManagementPage /> },
        { path: ROUTES.ADMIN.AUDIT_LOGS, element: <AuditLogsPage /> },
      ],
    },
  ],
});
