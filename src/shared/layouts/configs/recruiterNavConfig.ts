import { ROUTES } from "@/config/routes.config";
import type { NavConfig } from "@/shared/types/NavConfig";

export const recruiterNavConfig: NavConfig = {
  role: "recruiter",
  roleDisplay: "Recruiter Portal",
  accentColor: "green",

  navItems: [
    {
      label: "Dashboard",
      path: ROUTES.RECRUITER.DASHBOARD,
      icon: "📊",
    },
    {
      label: "My Jobs",
      path: ROUTES.RECRUITER.JOBS,
      icon: "💼",
      permissions: ["P204"], // View All Jobs
    },
    {
      label: "Post a Job",
      path: ROUTES.RECRUITER.JOB_CREATE,
      icon: "➕",
      permissions: ["P006", "P201"], // Create Job
    },
    {
      label: "Applications",
      path: "/recruiter/applications", // Thêm vào routes.config.ts
      icon: "📄",
      permissions: ["P009"], // View Applications
    },
    {
      label: "Candidates",
      path: "/recruiter/candidates", // Thêm vào routes.config.ts
      icon: "👥",
      permissions: ["P010"], // Contact Candidates
    },
  ],

  permissionSection: {
    title: "Your Active Permissions (RECRUITER)",
    badgeColor: "green",
  },
};
