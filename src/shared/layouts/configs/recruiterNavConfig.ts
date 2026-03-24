import { PERMISSIONS } from "@/config/permissions.constants";
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
      permissions: [PERMISSIONS.VIEW_ALL_JOBS], // View All Jobs
    },
    {
      label: "Post a Job",
      path: ROUTES.RECRUITER.JOB_CREATE,
      icon: "➕",
      permissions: [PERMISSIONS.CREATE_JOB], // Create Job
    },
    {
      label: "Applications",
      path: "/recruiter/applications", // Thêm vào routes.config.ts
      icon: "📄",
      permissions: [PERMISSIONS.VIEW_APPLICATIONS], // View Applications
    },
    {
      label: "Candidates",
      path: "/recruiter/candidates", // Thêm vào routes.config.ts
      icon: "👥",
      permissions: [PERMISSIONS.CONTACT_CANDIDATES], // Contact Candidates
    },
  ],
};
