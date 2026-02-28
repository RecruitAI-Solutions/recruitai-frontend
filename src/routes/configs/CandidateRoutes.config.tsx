import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";

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
      path: ROUTES.CANDIDATE.DASHBOARD,
      element: <>CANDIDATE DASHBOARD</>,
    },
  ],
});
