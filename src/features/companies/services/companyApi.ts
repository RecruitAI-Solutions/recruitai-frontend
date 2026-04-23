import { axiosInstance } from "@/services/api/axiosInstance";
import { COMPANY_ENDPOINTS } from "@/config/endpoints/company.endpoints";
import type {
  CompanyResponse,
  CompanyListResponse,
  CompanySuggestItem,
  CompanyFilters,
  UpdateCompanyRequest,
} from "../types/company.types";
import type { JobListPaginatedResponse } from "@/features/jobs/types/job.types";
import { transformJobListItem } from "@/features/jobs/types/job.types";

export const companyApi = {
  getCompanies: (params?: CompanyFilters) =>
    axiosInstance
      .get<CompanyListResponse>(COMPANY_ENDPOINTS.LIST, { params })
      .then((r) => r.data),

  getCompany: (id: string) =>
    axiosInstance
      .get<CompanyResponse>(COMPANY_ENDPOINTS.DETAIL(id))
      .then((r) => r.data),

  suggestCompanies: (q: string, limit = 10) =>
    axiosInstance
      .get<CompanySuggestItem[]>(COMPANY_ENDPOINTS.SUGGEST, {
        params: { q, limit },
      })
      .then((r) => r.data),

  getCompanyJobs: (id: string, params?: { page?: number; pageSize?: number }) =>
    axiosInstance
      .get<JobListPaginatedResponse>(COMPANY_ENDPOINTS.JOBS(id), { params })
      .then((r) => ({
        ...r.data,
        data: r.data.data.map(transformJobListItem), // tái dùng transform đang có
      })),

  updateCompany: (id: string, data: UpdateCompanyRequest) =>
    axiosInstance
      .put<CompanyResponse>(COMPANY_ENDPOINTS.UPDATE(id), data)
      .then((r) => r.data),
};
