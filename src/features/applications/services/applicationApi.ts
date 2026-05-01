import { axiosInstance } from "@/services/api/axiosInstance";
import type {
  ApplyJobResponse,
  MyApplicationsResponse,
  JobApplicationsResponse,
  JobApplicationsParams,
  UpdateStatusRequest,
  UpdateStatusResponse,
  ApplicationDetailResponse,
  GetMyApplicationsParams,
  AdminApplicationsParams,
  AdminApplicationsResponse,
  RecruiterApplicationsParams,
  RecruiterApplicationsResponse,
  RecruiterCandidatesParams,
  RecruiterCandidatesResponse,
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
    params?: GetMyApplicationsParams,
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

  getAdminApplications: async (
    params?: AdminApplicationsParams,
  ): Promise<AdminApplicationsResponse> => {
    const response = await axiosInstance.get<AdminApplicationsResponse>(
      APPLICATION_ENDPOINTS.ADMIN_ALL,
      { params },
    );
    return response.data;
  },
  getRecruiterApplications: async (
    params?: RecruiterApplicationsParams,
  ): Promise<RecruiterApplicationsResponse> => {
    const response = await axiosInstance.get<RecruiterApplicationsResponse>(
      APPLICATION_ENDPOINTS.RECRUITER_ALL,
      { params },
    );
    return response.data;
  },
  getRecruiterCandidates: async (
    params?: RecruiterCandidatesParams,
  ): Promise<RecruiterCandidatesResponse> => {
    const response = await axiosInstance.get<RecruiterCandidatesResponse>(
      APPLICATION_ENDPOINTS.RECRUITER_CANDIDATES,
      { params },
    );
    return response.data;
  },
};
