import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCurrentUser, setUser } from "../slices/authSlice";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";

export const useUploadAvatar = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  return useMutation({
    mutationFn: (file: File) => authApi.uploadAvatar(file),
    onSuccess: (data) => {
      if (currentUser) {
        dispatch(setUser({ ...currentUser, avatar: data.avatarUrl }));
      }
      toast.success("Cập nhật ảnh đại diện thành công");
    },
    onError: () => toast.error("Upload ảnh thất bại"),
  });
};

export const useDeleteAvatar = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  return useMutation({
    mutationFn: () => authApi.deleteAvatar(),
    onSuccess: (data) => {
      if (currentUser) {
        dispatch(setUser({ ...currentUser, avatar: data.avatarUrl }));
      }
      toast.success("Đã xóa ảnh đại diện");
    },
    onError: () => toast.error("Xóa ảnh thất bại"),
  });
};
