import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  setToken,
  getToken,
  setRefreshToken,
  clearAuthTokens,
} from "@/services/storage/localStorage";
import type { AuthState, User } from "../types/auth.types";

const token = getToken();

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!token,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.role = action.payload.user.role;

      setToken(action.payload.accessToken);
      setRefreshToken(action.payload.refreshToken);
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;

      clearAuthTokens();
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, setUser, logout, setLoading } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.role;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
