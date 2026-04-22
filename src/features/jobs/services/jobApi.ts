import { axiosInstance } from "@/services/api/axiosInstance";
import qs from "qs";
import {
  type JobListItem,
  transformJobListItem,
  type JobListPaginatedResponse,
  type JobDetailResponse,
  transformJob,
  type Job,
  type CreateJobRequest,
  type UpdateJobRequest,
  type JobFilters,
} from "../types/job.types";
import { JOB_ENDPOINTS } from "@/config/endpoints/job.endpoints";

export const jobApi = {
  getJobs: async (filters?: JobFilters) => {
    const params = {
      title: filters?.title,
      location: filters?.location,
      minSalary: filters?.minSalary,
      maxSalary: filters?.maxSalary,
      employmentType: filters?.employmentType,
      experienceLevel: filters?.experienceLevel,
      skill: filters?.skill,
      sortBy: filters?.sortBy,
      sortOrder: filters?.sortOrder,
      page: filters?.page,
      pageSize: filters?.pageSize,
    };

    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENDPOINTS.LIST,
      {
        params: {
          ...params,
          employmentType: filters?.employmentType?.split(",").map(Number),
          experienceLevel: filters?.experienceLevel?.split(",").map(Number),
        },
        paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
      },
    );

    const pageSize = filters?.pageSize || 6;
    const totalPages =
      response.data.totalPages ||
      Math.ceil((response.data.total || 0) / pageSize);

    return {
      data: response.data.data.map(transformJobListItem),
      total: response.data.total,
      totalPages,
    };
  },

  getMyJobs: async (
    filters?: JobFilters,
  ): Promise<{ data: JobListItem[]; total: number }> => {
    const params = {
      title: filters?.title,
      location: filters?.location,
      minSalary: filters?.minSalary,
      maxSalary: filters?.maxSalary,
      employmentType: filters?.employmentType,
      experienceLevel: filters?.experienceLevel,
      skill: filters?.skill,
      sortBy: filters?.sortBy,
      sortOrder: filters?.sortOrder,
      page: filters?.page,
      pageSize: filters?.pageSize,
    };

    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENDPOINTS.MY_JOBS,
      { params },
    );
    return {
      data: response.data.data.map(transformJobListItem),
      total: response.data.total,
    };
  },
  getJob: async (id: string): Promise<Job> => {
    const response = await axiosInstance.get<JobDetailResponse>(
      JOB_ENDPOINTS.DETAIL(id),
    );

    return transformJob(response.data);
  },
  createJob: async (payload: CreateJobRequest): Promise<Job> => {
    const response = await axiosInstance.post<JobDetailResponse>(
      JOB_ENDPOINTS.CREATE,
      payload,
    );
    return transformJob(response.data);
  },
  updateJob: async (id: string, payload: UpdateJobRequest): Promise<Job> => {
    const response = await axiosInstance.put<JobDetailResponse>(
      JOB_ENDPOINTS.UPDATE(id),
      payload,
    );
    return transformJob(response.data);
  },
  deleteJob: async (id: string): Promise<void> => {
    await axiosInstance.delete(JOB_ENDPOINTS.DELETE(id));
  },
  getFeatureJobs: async (): Promise<JobListItem[]> => {
    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENDPOINTS.FEATURED,
      {
        params: {
          page: 1,
          pageSize: 6,
        },
      },
    );
    return response.data.data.map(transformJobListItem);
  }
};
