import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { PublicRoute } from "../PublicRoute";

import { HomePage } from "@/pages/HomePage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import LoginPage from "@/features/auth/pages/LoginPage";

export type UserRole = "candidate" | "recruiter" | "admin";

export const createPublicRoutes = (
  isAuthenticated: boolean,
  userRole: UserRole | null,
): RouteObject[] => [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    element: (
      <PublicRoute isAuthenticated={isAuthenticated} userRole={userRole} />
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
];
