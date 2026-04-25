import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCurrentUser, setUser } from "../slices/authSlice";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { GenderType, UpdateProfileRequest } from "../types/auth.types";

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authApi.updateProfile(data),
    onSuccess: (response) => {
      if (!currentUser) {
        toast.error("Không tìm thấy thông tin người dùng");
        return;
      }
      dispatch(
        setUser({
          ...currentUser,
          fullName: response.fullName,
          phoneNumber: response.phoneNumber ?? currentUser.phoneNumber,
          gender:
            response.gender !== null && response.gender !== undefined
              ? (response.gender as GenderType)
              : currentUser.gender,
          dateOfBirth: response.dateOfBirth ?? currentUser.dateOfBirth,
          avatar: response.avatarUrl ?? currentUser.avatar,
        }),
      );
      toast.success("Cập nhật hồ sơ thành công");
    },
    onError: () => toast.error("Cập nhật thất bại"),
  });
};
