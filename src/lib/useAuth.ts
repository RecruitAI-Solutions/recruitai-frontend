import { useAppSelector } from "@/app/hooks";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "@/features/auth/slices/authSlice";

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector((s) => s.auth.isInitialized);

  return {
    user,
    isAuthenticated,
    isInitialized,
    isReady: isInitialized && isAuthenticated && user,
  };
};
