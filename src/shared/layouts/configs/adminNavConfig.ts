import { PERMISSIONS } from "@/config/permissions.constants";
import { ROUTES } from "@/config/routes.config";
import type { NavConfig } from "@/shared/types/NavConfig";

export const adminNavConfig: NavConfig = {
  role: "admin",
  roleDisplay: "Admin Panel",
  accentColor: "purple",

  navItems: [
    {
      label: "Dashboard",
      path: ROUTES.ADMIN.DASHBOARD,
      icon: "📊",
    },
    {
      label: "User Management",
      path: ROUTES.ADMIN.USERS,
      icon: "👤",
      permissions: [PERMISSIONS.MANAGE_USERS], // Manage Users
    },
    {
      label: "Roles & Permissions",
      path: "/admin/roles-permissions", // Thêm vào routes.config.ts
      icon: "🔐",
      permissions: [PERMISSIONS.MANAGE_ROLES], // Manage Roles
    },
    {
      label: "Job Moderation",
      path: "/admin/job-moderation", // Thêm vào routes.config.ts
      icon: "💼",
    },
    {
      label: "CV Management",
      path: "/admin/cv-management", // Thêm vào routes.config.ts
      icon: "📄",
    },
    {
      label: "Analytics",
      path: ROUTES.ADMIN.ANALYTICS,
      icon: "📈",
      permissions: [PERMISSIONS.VIEW_ANALYTICS], // View Analytics
    },
    {
      label: "System Settings",
      path: ROUTES.ADMIN.SETTINGS,
      icon: "⚙️",
      permissions: [PERMISSIONS.MANAGE_SYSTEM], // Manage System
    },
  ],
};
