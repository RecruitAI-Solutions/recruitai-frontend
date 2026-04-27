import { useMutation } from "@tanstack/react-query";
import { adminApi } from "../services/adminApi";
import type { ExportJobsParams } from "../types/admin.types";
import toast from "react-hot-toast";

export const useExportJobs = () => {
  return useMutation({
    mutationFn: (params?: ExportJobsParams) => adminApi.exportJobs(params),
    onSuccess: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `jobs_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Xuất file thành công");
    },
    onError: () => toast.error("Xuất file thất bại"),
  });
};
