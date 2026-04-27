import { useMutation } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import type { ExportApplicationsParams } from "../types/admin.types";
import toast from "react-hot-toast";

export const useExportApplications = () => {
  return useMutation({
    mutationFn: (params?: ExportApplicationsParams) =>
      adminApi.exportApplications(params),
    onSuccess: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `applications_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Xuất file thành công");
    },
    onError: () => toast.error("Xuất file thất bại"),
  });
};
