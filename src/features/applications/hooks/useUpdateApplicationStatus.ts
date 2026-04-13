import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationApi } from "../services/applicationApi";
import type {
  UpdateStatusRequest,
  UpdateStatusResponse,
} from "../types/application.type";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { APPLICATION_QUERY_KEYS } from "./applicationQueryKeys";

export const useUpdateApplicationStatus = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateStatusResponse,
    AxiosError<{ message: string }>,
    UpdateStatusRequest
  >({
    mutationFn: (data) => applicationApi.updateStatus(applicationId, data),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: APPLICATION_QUERY_KEYS.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Cập nhật thất bại";
      toast.error(message);
    },
  });
};
