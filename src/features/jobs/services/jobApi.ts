import { axiosInstance } from "@/services/api/axiosInstance";
import qs from "qs";
import {
  transformJobListItem,
  type JobListPaginatedResponse,
  type JobDetailResponse,
  transformJob,
  type Job,
  type CreateJobRequest,
  type UpdateJobRequest,
  type JobFilters,
  type JobListItem,
} from "../types/job.types";
import { JOB_ENDPOINTS } from "@/config/endpoints/job.endpoints";

export const jobApi = {
  getJobs: async (filters?: JobFilters) => {
    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENDPOINTS.LIST,
      {
        params: {
          title: filters?.title,
          location: filters?.location,
          minSalary: filters?.minSalary,
          maxSalary: filters?.maxSalary,
          employmentType: filters?.employmentType,
          experienceLevel: filters?.experienceLevel,
          skills: filters?.skills,
          matchAllSkills: filters?.matchAllSkills ?? true,
          sortBy: filters?.sortBy,
          sortOrder: filters?.sortOrder,
          page: filters?.page,
          pageSize: filters?.pageSize,
        },
        paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
      },
    );
    return {
      data: response.data.data.map(transformJobListItem),
      total: response.data.total,
      totalPages: response.data.totalPages,
    };
  },

  getMyJobs: async (filters?: JobFilters) => {
    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENDPOINTS.MY_JOBS,
      {
        params: {
          title: filters?.title,
          location: filters?.location,
          minSalary: filters?.minSalary,
          maxSalary: filters?.maxSalary,
          employmentType: filters?.employmentType,
          experienceLevel: filters?.experienceLevel,
          skills: filters?.skills,
          matchAllSkills: filters?.matchAllSkills,
          sortBy: filters?.sortBy,
          sortOrder: filters?.sortOrder,
          page: filters?.page,
          pageSize: filters?.pageSize,
        },
        paramsSerializer: (p) => qs.stringify(p, { arrayFormat: "repeat" }),
      },
    );
    return {
      data: response.data.data.map(transformJobListItem),
      total: response.data.total,
      totalPages: response.data.totalPages,
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

  getFeaturedJobs: async (): Promise<{ data: JobListItem[] }> => {
    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENDPOINTS.FEATURED,
    );
    return { data: response.data.data.map(transformJobListItem) };
  },

  getSimilarJobs: async (id: string): Promise<{ data: JobListItem[] }> => {
    const response = await axiosInstance.get<JobListPaginatedResponse>(
      JOB_ENDPOINTS.SIMILAR(id),
    );
    return { data: response.data.data.map(transformJobListItem) };
  },
};
