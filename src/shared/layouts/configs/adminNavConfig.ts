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
      permissions: ["P011"], // Manage Users
    },
    {
      label: "Roles & Permissions",
      path: "/admin/roles-permissions", // Thêm vào routes.config.ts
      icon: "🔐",
      permissions: ["P012"], // Manage Roles
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
      permissions: ["P013"], // View Analytics
    },
    {
      label: "System Settings",
      path: ROUTES.ADMIN.SETTINGS,
      icon: "⚙️",
      permissions: ["P014"], // Manage System
    },
  ],

  permissionSection: {
    title: "Administrator Permissions",
    badgeColor: "purple",
  },
};
