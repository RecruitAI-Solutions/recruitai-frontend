import { axiosInstance } from "@/services/api/axiosInstance";
import {
  type JobListItem,
  transformJobListItem,
  type JobListPaginatedResponse,
  type JobDetailResponse,
  transformJob,
  type Job,
  type CreateJobRequest,
  type UpdateJobRequest,
} from "../types/job.types";
import { JOB_ENPOINTS } from "@/config/endpoints/job.endpoints";

export const jobApi = {
  getJobs: async (
    params?: Record<string, unknown>,
  ): Promise<{ data: JobListItem[]; total: number }> => {
    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENPOINTS.LIST,
      { params },
    );
    return {
      data: response.data.data.map(transformJobListItem),
      total: response.data.total,
    };
  },
  getMyJobs: async (
    params?: Record<string, unknown>,
  ): Promise<{ data: JobListItem[]; total: number }> => {
    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENPOINTS.MY_JOBS,
      { params },
    );
    return {
      data: response.data.data.map(transformJobListItem),
      total: response.data.total,
    };
  },
  getJob: async (id: string): Promise<Job> => {
    const response = await axiosInstance.get<JobDetailResponse>(
      JOB_ENPOINTS.DETAIL(id),
    );

    return transformJob(response.data);
  },
  createJob: async (payload: CreateJobRequest): Promise<Job> => {
    const response = await axiosInstance.post<JobDetailResponse>(
      JOB_ENPOINTS.CREATE,
      payload,
    );
    return transformJob(response.data);
  },
  updateJob: async (id: string, payload: UpdateJobRequest): Promise<Job> => {
    const response = await axiosInstance.put<JobDetailResponse>(
      JOB_ENPOINTS.UPDATE(id),
      payload,
    );
    return transformJob(response.data);
  },
  deleteJob: async (id: string): Promise<void> => {
    await axiosInstance.delete(JOB_ENPOINTS.DELETE(id));
  },
};
