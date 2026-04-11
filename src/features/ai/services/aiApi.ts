import { axiosInstance } from "@/services/api/axiosInstance";
import { AI_ENDPOINTS } from "@/config/endpoints/ai.endpoints";
import type {
  AnalyzeCVResponse,
  AnalysisResultResponse,
  MatchCVJobRequest,
  MatchCVJobResponse,
  GetMatchParams,
  GetMatchResponse,
  MatchCVJobsParams,
  MatchCVJobsResponse,
} from "../types/ai.types";

export const aiApi = {
  // Phân tích CV
  analyzeCV: async (cvId: string): Promise<AnalyzeCVResponse> => {
    const response = await axiosInstance.post<AnalyzeCVResponse>(
      AI_ENDPOINTS.ANALYZE_CV,
      { cvId },
    );
    return response.data;
  },

  // Lấy kết quả phân tích CV
  getAnalysisResult: async (cvId: string): Promise<AnalysisResultResponse> => {
    const response = await axiosInstance.get<AnalysisResultResponse>(
      AI_ENDPOINTS.ANALYSIS_RESULT(cvId),
    );
    return response.data;
  },

  // Match CV với Job (POST)
  matchCVWithJob: async (
    payload: MatchCVJobRequest,
  ): Promise<MatchCVJobResponse> => {
    const response = await axiosInstance.post<MatchCVJobResponse>(
      AI_ENDPOINTS.MATCH_CV_JOB,
      payload,
    );
    return response.data;
  },

  // Lấy kết quả match (GET)
  getMatch: async (params: GetMatchParams): Promise<GetMatchResponse> => {
    const response = await axiosInstance.get<GetMatchResponse>(
      AI_ENDPOINTS.MATCH,
      { params },
    );
    return response.data;
  },

  // Danh sách jobs phù hợp với CV
  getMatchingJobsForCV: async (
    cvId: string,
    params?: MatchCVJobsParams,
  ): Promise<MatchCVJobsResponse> => {
    const response = await axiosInstance.get<MatchCVJobsResponse>(
      AI_ENDPOINTS.MATCH_CV_JOBS(cvId),
      { params },
    );
    return response.data;
  },
};
