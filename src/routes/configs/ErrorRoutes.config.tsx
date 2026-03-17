import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export type UserRole = "candidate" | "recruiter" | "admin";

export const errorRoutes: RouteObject[] = [
  {
    path: ROUTES.UNAUTHORIZED,
    element: <UnauthorizedPage />,
  },
  {
    path: ROUTES.NOTFOUND,
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
