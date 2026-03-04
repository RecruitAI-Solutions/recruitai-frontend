import { useRoutes } from "react-router-dom";
import { createRouteConfig } from "./configs";

export const AppRoutes = () => {
  const isAuthenticated = true;
  const userRole = null;

  const routeConfig = createRouteConfig(isAuthenticated, userRole);

  const element = useRoutes(routeConfig);

  return element;
};
