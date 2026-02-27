import type { RouteObject } from "react-router-dom";
import { createPublicRoutes } from "./publicRoutes.config";

export type UserRole = "candidate" | "recruiter" | "admin";

export const createRouteConfig = (
  isAuthenticated: boolean,
  userRole: UserRole | null,
): RouteObject[] => {
  return [...createPublicRoutes(isAuthenticated, userRole)];
};
