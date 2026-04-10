// EMPLOYMENT TYPE
export const EMPLOYMENT_TYPE = {
  FULL_TIME: 1,
  PART_TIME: 2,
  REMOTE: 3,
  HYBRID: 4,
  CONTRACT: 5,
  INTERNSHIP: 6,
} as const;

export type EmploymentTypeValue =
  (typeof EMPLOYMENT_TYPE)[keyof typeof EMPLOYMENT_TYPE];

export type EmploymentTypeLabel =
  | "Full-time"
  | "Part-time"
  | "Remote"
  | "Hybrid"
  | "Contract"
  | "Internship";

export const employmentTypeMap: Record<
  EmploymentTypeValue,
  EmploymentTypeLabel
> = {
  1: "Full-time",
  2: "Part-time",
  3: "Remote",
  4: "Hybrid",
  5: "Contract",
  6: "Internship",
};

export const normalizeEmploymentType = (
  value: EmploymentTypeValue,
): EmploymentTypeLabel => {
  return employmentTypeMap[value as EmploymentTypeValue] ?? "Full-time";
};

//EXPERIENCE LEVEL
export const EXPERIENCE_LEVEL = {
  ENTRY: 1,
  JUNIOR: 2,
  INTERMEDIATE: 3,
  SENIOR: 4,
  LEAD: 5,
  MANAGER: 6,
} as const;

export type ExperienceLevelValue =
  (typeof EXPERIENCE_LEVEL)[keyof typeof EXPERIENCE_LEVEL];

export type ExperienceLevelLabel =
  | "Entry"
  | "Junior"
  | "Intermediate"
  | "Senior"
  | "Lead"
  | "Manager";

export const ExperienceLevelMap: Record<
  ExperienceLevelValue,
  ExperienceLevelLabel
> = {
  1: "Entry",
  2: "Junior",
  3: "Intermediate",
  4: "Senior",
  5: "Lead",
  6: "Manager",
};

export const normalizeExperienceLevel = (
  value: ExperienceLevelValue,
): ExperienceLevelLabel => {
  return ExperienceLevelMap[value as ExperienceLevelValue] ?? "Entry";
};

// Thêm vào job.types.ts:
export const EMPLOYMENT_TYPE_TO_VALUE: Record<
  EmploymentTypeLabel,
  EmploymentTypeValue
> = {
  "Full-time": 1,
  "Part-time": 2,
  Remote: 3,
  Hybrid: 4,
  Contract: 5,
  Internship: 6,
};

export const EXPERIENCE_LEVEL_TO_VALUE: Record<
  ExperienceLevelLabel,
  ExperienceLevelValue
> = {
  Entry: 1,
  Junior: 2,
  Intermediate: 3,
  Senior: 4,
  Lead: 5,
  Manager: 6,
};

// CURRENCY
export const CURRENCY = { VND: 1, USD: 2, EUR: 3, JPY: 4, GBP: 5 } as const;

export type CurrencyValue = (typeof CURRENCY)[keyof typeof CURRENCY];

export type CurrencyLabel = "VND" | "USD" | "EUR" | "JPY" | "GBP";

export const CurrencyMap: Record<CurrencyValue, CurrencyLabel> = {
  1: "VND",
  2: "USD",
  3: "EUR",
  4: "JPY",
  5: "GBP",
};

export const normalizeCurrency = (value: CurrencyValue): CurrencyLabel => {
  return CurrencyMap[value as CurrencyValue] ?? "VND";
};

//GET JOBS and MY JOBS
export type JobListItemResponse = {
  id: string;
  title: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: number;
  skillIds?: number[];
  employmentType: EmploymentTypeValue;
  experienceLevel: ExperienceLevelValue;
  recruiterName: string;
  createdAt: string;
  expirationDate: string;
  isActive: boolean;
  skillNames: string[];
};

//JOB LIST PAGINATION
export type JobListPaginatedResponse = {
  data: JobListItemResponse[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

//SKILL DETAIL
export type JobSkillDetail = {
  id: number;
  name: string;
  category: string;
  isRequired: boolean;
};

//JOB DETAIL RESPONSE
export type JobDetailResponse = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: CurrencyValue;
  employmentType: EmploymentTypeValue;
  experienceLevel: ExperienceLevelValue;
  department: string;
  skillIds: number[];
  skillDetails: JobSkillDetail[];
  benefits: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
  recruiterId: string;
  recruiterName: string;
  recruiterEmail: string;
  views: number;
  applications: number;
};

//REQUEST CREATE JOB
export type CreateJobRequest = {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  currency: number;
  employmentType: number;
  experienceLevel: number;
  department: string;
  skillIds: number[];
  benefits: string;
  expirationDate: string;
};

//UPDATE JOB
export type UpdateJobRequest = Partial<CreateJobRequest>;

//TRANSFORM JOB IN COMPONENT
export type JobListItem = {
  id: string;
  title: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  skillIds?: number[];
  employmentTypeValue: EmploymentTypeValue; // Giữ giá trị số để lọc
  experienceLevelValue: ExperienceLevelValue;
  employmentType: EmploymentTypeLabel;
  experienceLevel: ExperienceLevelLabel;
  recruiterName: string;
  createdAt: string;
  expirationDate: string;
  isActive: boolean;
  skillNames: string[];
};

export type Job = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: CurrencyLabel;
  employmentType: EmploymentTypeLabel;
  experienceLevel: ExperienceLevelLabel;
  department: string;
  skillIds: number[];
  skillDetails: JobSkillDetail[];
  benefits: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
  recruiterId: string;
  recruiterName: string;
  recruiterEmail: string;
  views: number;
  applications: number;
};

// TRANSFORM FUNCTIONS
export const transformJobListItem = (
  data: JobListItemResponse,
): JobListItem => ({
  id: data.id,
  title: data.title,
  location: data.location,
  salaryMin: data.salaryMin,
  salaryMax: data.salaryMax,
  employmentType: normalizeEmploymentType(data.employmentType),
  experienceLevel: normalizeExperienceLevel(data.experienceLevel),
  recruiterName: data.recruiterName,
  createdAt: data.createdAt,
  expirationDate: data.expirationDate,
  isActive: data.isActive,
  skillNames: data.skillNames,
  skillIds: data.skillIds || [],
  employmentTypeValue: data.employmentType,
  experienceLevelValue: data.experienceLevel,
});

export const transformJob = (data: JobDetailResponse): Job => ({
  id: data.id,
  title: data.title,
  description: data.description,
  requirements: data.requirements,
  location: data.location,
  salaryMin: data.salaryMin,
  salaryMax: data.salaryMax,
  currency: normalizeCurrency(data.currency),
  employmentType: normalizeEmploymentType(data.employmentType),
  experienceLevel: normalizeExperienceLevel(data.experienceLevel),
  department: data.department,
  skillIds: data.skillIds,
  skillDetails: data.skillDetails,
  benefits: data.benefits,
  expirationDate: data.expirationDate,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  isActive: data.isActive,
  recruiterId: data.recruiterId,
  recruiterName: data.recruiterName,
  recruiterEmail: data.recruiterEmail,
  views: data.views,
  applications: data.applications,
});

export type JobFilters = {
  title?: string;
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  employmentType?: string;
  experienceLevel?: string;
  skill?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

//PARAMS FOR JOB FILTERS
export interface LocationFilterInputProps {
  value?: string;
  onChange: (value: string) => void;
}

export interface EmploymentTypeFilterProps {
  value?: string; // single value or comma-separated
  onChange: (value: string | undefined) => void;
}

export interface SalaryRangeFilterProps {
  minSalary?: number;
  maxSalary?: number;
  onChangeMin: (value: number | undefined) => void;
  onChangeMax: (value: number | undefined) => void;
}
