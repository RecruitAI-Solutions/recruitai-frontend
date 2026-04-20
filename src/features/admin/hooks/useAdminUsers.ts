import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import { ADMIN_QUERY_KEYS } from "./adminQueryKeys";
import type {
  AdminUsersParams,
  AdminUserUpdateRequest,
  AdminUserStatusUpdateRequest,
  AdminUserRoleUpdateRequest,
} from "../types/admin.types";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useAdminUsers = (params?: AdminUsersParams) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.users(params),
    queryFn: () => adminApi.getUsers(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useAdminUserDetail = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.userDetail(id),
    queryFn: () => adminApi.getUserDetail(id),
    enabled: !!id && enabled,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUserUpdateRequest }) =>
      adminApi.updateUser(id, data),
    onSuccess: (_, { id }) => {
      toast.success("Cập nhật người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.userDetail(id),
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Cập nhật thất bại");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onSuccess: () => {
      toast.success("Xóa người dùng thành công");
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Xóa thất bại");
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: AdminUserStatusUpdateRequest;
    }) => adminApi.updateUserStatus(id, data),
    onSuccess: (_, { id }) => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.userDetail(id),
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data?.message || "Cập nhật trạng thái thất bại",
      );
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: AdminUserRoleUpdateRequest;
    }) => adminApi.updateUserRole(id, data),
    onSuccess: (_, { id }) => {
      toast.success("Cập nhật vai trò thành công");
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.userDetail(id),
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "Cập nhật vai trò thất bại");
    },
  });
};
