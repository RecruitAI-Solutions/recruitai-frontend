import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  setToken,
  getToken,
  removeToken,
} from "@/services/storage/localStorage";
import type { UserRole } from "@/routes/RoleBasedRoute";

type User = {
  id: string;
  email: string;
  role: UserRole;
  username?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  loading: boolean;
};

const token = getToken();
const initialState: AuthState = {
  user: null,
  isAuthenticated: !!token,
  role: null,
  loading: false,
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
      }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.role = action.payload.user.role;

      setToken(action.payload.accessToken);
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
      removeToken();
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
