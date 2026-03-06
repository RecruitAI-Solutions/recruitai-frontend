import { useRoutes } from "react-router-dom";
import { createRouteConfig } from "./configs";
import { useAppSelector } from "@/app/hooks";
import {
  selectIsAuthenticated,
  selectUserRole,
} from "@/features/auth/slices/authSlice";

export const AppRoutes = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);

  const routeConfig = createRouteConfig(isAuthenticated, userRole);

  const element = useRoutes(routeConfig);

  return element;
};
