import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";
import { CandidateLayout } from "@/shared/layouts/candidate/CandidateLayout";
import CandidateDashboard from "@/features/candidate/pages/Candidate";
import { CVManagementPage } from "@/features/candidate/pages/CVManagementPage";

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
      ],
    },
  ],
});
