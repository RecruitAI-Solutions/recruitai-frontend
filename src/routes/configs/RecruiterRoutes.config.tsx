import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";
import { DashboardLayout } from "@/shared/layouts/dashboard/DashboardLayout";
import { recruiterNavConfig } from "@/shared/layouts/configs";
import RecruiterDashboard from "@/features/jobs/pages/RecruiterDashboard";
import { MyJobsPage } from "@/features/jobs/pages/MyJobPage";
import { CreateJobPage } from "@/features/jobs/pages/CreateJobPage";
import { EditJobPage } from "@/features/jobs/pages/EditJobPage";
import { JobApplicationsPage } from "@/features/applications/pages/JobApplicationsPage";
import { ApplicationDetailPage } from "@/features/applications/pages/ApplicationDetailPage";

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
        {
          path: ROUTES.RECRUITER.JOBS,
          element: <MyJobsPage />,
        },
        {
          path: ROUTES.RECRUITER.JOB_CREATE,
          element: <CreateJobPage />,
        },
        {
          path: ROUTES.RECRUITER.JOB_EDIT(":id"),
          element: <EditJobPage />,
        },
        {
          path: ROUTES.RECRUITER.APPLICANTS(":jobId"),
          element: <JobApplicationsPage />,
        },
        {
          path: ROUTES.RECRUITER.APPLICATION_DETAIL(":applicationId"),
          element: <ApplicationDetailPage />,
        },
      ],
    },
  ],
});
