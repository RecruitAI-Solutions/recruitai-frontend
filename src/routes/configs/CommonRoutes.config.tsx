import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { ROUTES } from "@/config/routes.config";
import ChangePasswordPage from "@/features/auth/pages/ChangePasswordPage";
import { ProfilePage } from "@/features/auth/pages/ProfilePage";
// import { NotificationsPage } from "@/features/notifications/pages/NotificationPage";

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
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      // {
      //   path: "/notifications",
      //   element: <NotificationsPage />,
      // },
    ],
  },
];
