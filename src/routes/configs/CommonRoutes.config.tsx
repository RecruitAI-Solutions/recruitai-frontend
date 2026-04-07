import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { ROUTES } from "@/config/routes.config";
import ChangePasswordPage from "@/features/auth/pages/ChangePasswordPage";

export const createCommonRoutes = (isAuthenticated: boolean): RouteObject[] => [
  {
    element: (
      <ProtectedRoute
        isAuthenticated={isAuthenticated}
        redirectTo={ROUTES.LOGIN}
      />
    ),
    children: [
      {
        path: ROUTES.CHANGE_PASSWORD,
        element: <ChangePasswordPage />,
      },
    ],
  },
];
