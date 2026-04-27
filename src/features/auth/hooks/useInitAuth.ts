import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
  setInitialized,
  setUser,
} from "../slices/authSlice";
import { useEffect } from "react";
import { authApi } from "../services/authApi";
import { signalRService } from "@/services/signalR/signalRService";

export const useInitAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const init = async () => {
      if (!isAuthenticated) {
        dispatch(setInitialized(true));
        return;
      }

      if (user) {
        dispatch(setInitialized(true));
        return;
      }

      try {
        const me = await authApi.getMe();
        dispatch(setUser(me));
      } catch {
        dispatch(logout());
      } finally {
        dispatch(setInitialized(true));
      }
    };

    if (isAuthenticated) {
      signalRService.start();
    }

    init();
  }, [isAuthenticated, user, dispatch]);

  return {};
};
