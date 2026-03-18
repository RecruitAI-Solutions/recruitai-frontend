import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { RoleBasedRoute } from "../RoleBasedRoute";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

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
      path: ROUTES.RECRUITER.DASHBOARD,
      element: (
        <>
          RECRUITER DASHBOARD <LogoutButton />
        </>
      ),
    },
  ],
});
