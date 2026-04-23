import { axiosInstance } from "@/services/api/axiosInstance";
import type {
  ApplyJobResponse,
  MyApplicationsResponse,
  MyApplicationsParams,
  JobApplicationsResponse,
  JobApplicationsParams,
  UpdateStatusRequest,
  UpdateStatusResponse,
  ApplicationDetailResponse,
} from "../types/application.type";
import { APPLICATION_ENDPOINTS } from "@/config/endpoints/app.endpoints";

export const applicationApi = {
  apply: async (jobId: string, cvId: string): Promise<ApplyJobResponse> => {
    const response = await axiosInstance.post<ApplyJobResponse>(
      APPLICATION_ENDPOINTS.APPLY(jobId),
      { cvId },
    );
    return response.data;
  },

  getMyApplications: async (
    params?: MyApplicationsParams,
  ): Promise<MyApplicationsResponse> => {
    const response = await axiosInstance.get<MyApplicationsResponse>(
      APPLICATION_ENDPOINTS.MY_APPLICATIONS,
      { params },
    );
    return response.data;
  },

  getApplicationsByJob: async (
    jobId: string,
    params?: JobApplicationsParams,
  ): Promise<JobApplicationsResponse> => {
    const response = await axiosInstance.get<JobApplicationsResponse>(
      APPLICATION_ENDPOINTS.APPLICATIONS_BY_JOB(jobId),
      { params },
    );
    return response.data;
  },

  updateStatus: async (
    applicationId: string,
    data: UpdateStatusRequest,
  ): Promise<UpdateStatusResponse> => {
    const response = await axiosInstance.patch<UpdateStatusResponse>(
      APPLICATION_ENDPOINTS.UPDATE_STATUS(applicationId),
      data,
    );
    return response.data;
  },

  getDetail: async (
    applicationId: string,
  ): Promise<ApplicationDetailResponse> => {
    const response = await axiosInstance.get<ApplicationDetailResponse>(
      APPLICATION_ENDPOINTS.DETAIL(applicationId),
    );
    return response.data;
  },
};
