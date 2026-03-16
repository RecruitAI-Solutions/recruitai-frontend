import { type RouteObject } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { PublicRoute } from "../PublicRoute";

import { HomePage } from "@/pages/HomePage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import OAuthCallbackPage from "@/features/auth/pages/OAuthCallbackPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";

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
      {
        path: ROUTES.AUTH_CALLBACK,
        element: <OAuthCallbackPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.RESET_PASSWORD,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTES.VERIFY_EMAIL,
        element: <VerifyEmailPage />,
      },
    ],
  },
];
