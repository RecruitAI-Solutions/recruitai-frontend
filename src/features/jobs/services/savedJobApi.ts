import { axiosInstance } from "@/services/api/axiosInstance";
import type {
  SavedJobListResponse,
  SaveJobResponse,
  UnsaveJobResponse,
} from "../types/job.types";
import { JOB_ENDPOINTS } from "@/config/endpoints/job.endpoints";

export const savedJobApi = {
  saveJob: (jobId: string) =>
    axiosInstance
      .post<SaveJobResponse>(JOB_ENDPOINTS.SAVE(jobId))
      .then((r) => r.data),

  getSavedJobs: (params?: { page?: number; pageSize?: number }) =>
    axiosInstance
      .get<SavedJobListResponse>(JOB_ENDPOINTS.GET_SAVED, { params })
      .then((r) => r.data),

  unsaveJob: (jobId: string) =>
    axiosInstance
      .delete<UnsaveJobResponse>(JOB_ENDPOINTS.UNSAVE(jobId))
      .then((r) => r.data),
};
