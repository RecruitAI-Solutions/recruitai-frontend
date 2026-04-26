import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savedJobApi } from "../services/savedJobApi";
import toast from "react-hot-toast";

export const useSaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => savedJobApi.saveJob(jobId),
    onSuccess: (data) => {
      toast.success(data.message || "Đã lưu công việc");
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Lưu thất bại"),
  });
};

export const useUnsaveJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => savedJobApi.unsaveJob(jobId),
    onSuccess: (data) => {
      toast.success(data.message || "Đã bỏ lưu");
      queryClient.invalidateQueries({ queryKey: ["saved-jobs"] });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Bỏ lưu thất bại"),
  });
};
