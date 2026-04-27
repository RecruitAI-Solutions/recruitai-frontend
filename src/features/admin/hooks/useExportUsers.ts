import { useMutation } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import type { ExportUsersParams } from "../types/admin.types";
import toast from "react-hot-toast";

export const useExportUsers = () => {
  return useMutation({
    mutationFn: (params?: ExportUsersParams) => adminApi.exportUsers(params),
    onSuccess: (blob: Blob) => {
      // Tạo link tải file
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `users_${timestamp}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Xuất file thành công");
    },
    onError: () => toast.error("Xuất file thất bại"),
  });
};
