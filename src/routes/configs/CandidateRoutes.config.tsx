import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";
import { CandidateLayout } from "@/shared/layouts/candidate/CandidateLayout";
import { CVManagementPage } from "@/features/candidate/pages/CVManagementPage";
import { CVDetailPage } from "@/features/candidate/pages/CVDetailPage";
import { MatchingJobsPage } from "@/features/candidate/pages/MatchingJobPage";
import { MyApplicationsPage } from "@/features/applications/pages/MyApplicationsPage";
import { ApplicationDetailPage } from "@/features/applications/pages/ApplicationDetailPage";
import CandidateDashboard from "@/features/candidate/pages/CandidateDashboard";
import { JobSuggestPage } from "@/features/candidate/pages/JobsSuggestPage";
import { SavedJobsPage } from "@/features/jobs/pages/SavedJobsPage";

export type UserRole = "candidate" | "recruiter" | "admin";

export const createCandidateRoutes = (
  userRole: UserRole | null,
): RouteObject => ({
  element: (
    <RoleBasedRoute
      userRole={userRole}
      allowedRoles={["candidate"]}
      redirectTo={ROUTES.UNAUTHORIZED}
    />
  ),
  children: [
    {
      element: <CandidateLayout />,
      children: [
        {
          path: ROUTES.CANDIDATE.DASHBOARD,
          element: <CandidateDashboard />,
        },
        {
          path: ROUTES.CANDIDATE.CV_MANAGEMENT,
          element: <CVManagementPage />,
        },
        {
          path: "/candidate/cv/:id",
          element: <CVDetailPage />,
        },
        {
          path: "/candidate/cv/:cvId/matching-jobs/history",
          element: <MatchingJobsPage />,
        },
        {
          path: "/candidate/cv/:cvId/matching-jobs/suggestions",
          element: <JobSuggestPage />,
        },
        {
          path: ROUTES.CANDIDATE.APPLICATIONS,
          element: <MyApplicationsPage />,
        },

        {
          path: ROUTES.CANDIDATE.APPLICATION_DETAIL(":applicationId"),
          element: <ApplicationDetailPage />,
        },
        {
          path: ROUTES.CANDIDATE.SAVED_JOBS,
          element: <SavedJobsPage />,
        },
      ],
    },
  ],
});
