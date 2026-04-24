export type CompanyResponse = {
  id: string;
  name: string;
  slug: string | null;
  logo: string | null;
  address: string | null;
  website: string | null;
  totalJobs: number;
  createdAt: string;
};

export type CompanyListResponse = {
  data: CompanyResponse[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type CompanySuggestItem = {
  id: string;
  name: string;
  logo: string | null;
};

export type CompanyFilters = {
  page?: number;
  pageSize?: number;
  keyword?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type UpdateCompanyRequest = {
  name?: string;
  address?: string;
  website?: string;
  logo?: string;
};
