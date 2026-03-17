import type { RouteObject } from "react-router-dom";
import { createPublicRoutes } from "./publicRoutes.config";
import { ProtectedRoute } from "../ProtectedRoute";
import { ROUTES } from "@/config/routes.config";
import { createCandidateRoutes } from "./CandidateRoutes.config";
import { createRecuiterRoutes } from "./RecruiterRoutes.config";
import { createAdminRoutes } from "./AdminRoutes.config";
import { errorRoutes } from "./ErrorRoutes.config";

export type UserRole = "candidate" | "recruiter" | "admin";

export const createRouteConfig = (
  isAuthenticated: boolean,
  userRole: UserRole | null,
): RouteObject[] => {
  return [
    ...createPublicRoutes(isAuthenticated, userRole),

    {
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          redirectTo={ROUTES.LOGIN}
        />
      ),
      children: [
        createCandidateRoutes(userRole),
        createRecuiterRoutes(userRole),
        createAdminRoutes(userRole),
      ],
    },
    ...errorRoutes,
  ];
};
