import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "../slices/authSlice";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { UpdateProfileRequest } from "../types/auth.types";

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: (response) => {
      dispatch(
        setUser({
          id: response.userId,
          email: response.email,
          fullName: response.fullName,
          avatar: response.avatarUrl ?? undefined,
          // role và permissions giữ nguyên từ Redux
        } as any),
      );
      toast.success("Cập nhật hồ sơ thành công");
    },
    onError: () => toast.error("Cập nhật thất bại"),
  });
};
