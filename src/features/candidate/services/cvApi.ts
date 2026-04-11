import { axiosInstance } from "@/services/api/axiosInstance";
import {
  type CV,
  type CVUploadResponse,
  transformCVUpload,
  type CVListPaginatedResponse,
  transformCVItem,
  type CVDetailResponse,
} from "../types/cv.types";
import { CV_ENDPOINTS } from "@/config/endpoints/cv.endpoints";

export const cvApi = {
  upload: async (file: File): Promise<CV> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<CVUploadResponse>(
      CV_ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    console.log(response.data);
    return transformCVUpload(response.data);
  },
  getMyCVs: async (params?: {
    page?: number;
    pageSize?: number;
    status?: number[];
    fileName?: string;
    fromDate?: string;
    toDate?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<{
    data: CV[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  }> => {
    const response = await axiosInstance.get<CVListPaginatedResponse>(
      CV_ENDPOINTS.MY_CVS,
      { params },
    );
    return {
      data: response.data.data.map(transformCVItem),
      total: response.data.total,
      page: response.data.page,
      pageSize: response.data.pageSize,
      totalPages: response.data.totalPages,
      hasPrevious: response.data.hasPrevious,
      hasNext: response.data.hasNext,
    };
  },

  getCV: async (id: string): Promise<CV> => {
    const response = await axiosInstance.get<CVDetailResponse>(
      CV_ENDPOINTS.DETAIL(id),
    );
    return transformCVItem(response.data);
  },

  download: async (id: string, fileName: string): Promise<void> => {
    const response = await axiosInstance.get(CV_ENDPOINTS.DOWNLOAD(id), {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  deleteCV: async (id: string): Promise<void> => {
    await axiosInstance.delete(CV_ENDPOINTS.DETAIL(id));
  },
};
