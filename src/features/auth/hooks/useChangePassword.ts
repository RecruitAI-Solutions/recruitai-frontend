import { useMutation } from "@tanstack/react-query";
import type { ChangePasswordRequest } from "../types/auth.types";
import { authApi } from "../services/authApi";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// Hàm parse lỗi từ API response
const parseErrorMessage = (error: AxiosError): string => {
  const responseData = error.response?.data as any;

  // Trường hợp có errors object (validation errors)
  if (responseData?.errors) {
    const errors = responseData.errors;
    // Lấy tất cả message lỗi từ các field
    const errorMessages = Object.values(errors).flat();
    return errorMessages[0] as string; // Trả về lỗi đầu tiên
  }

  // Trường hợp có message field
  if (responseData?.message) {
    return responseData.message;
  }

  // Fallback
  return error.message || "Đổi mật khẩu thất bại";
};

export const useChangePassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: ChangePasswordRequest) =>
      authApi.changePassword(credentials),
    onSuccess: (data) => {
      toast.success(data.message || "Đổi mật khẩu thành công");
      navigate(-1);
    },
    onError: (error: AxiosError) => {
      const message = parseErrorMessage(error);
      toast.error(message);
    },
  });
};