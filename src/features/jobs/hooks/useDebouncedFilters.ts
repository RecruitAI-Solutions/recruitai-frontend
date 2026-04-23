import { useDebounce } from "@/lib/useDebounce";
import type { JobFilters } from "../types/job.types";

export const useDebouncedFilters = (filters: JobFilters): JobFilters => {
  const debouncedTitle = useDebounce(filters.title, 300);
  const debouncedLocation = useDebounce(filters.location, 300);

  return {
    title: debouncedTitle,
    location: debouncedLocation,
    minSalary: filters.minSalary,
    maxSalary: filters.maxSalary,
    employmentType: filters.employmentType,
    experienceLevel: filters.experienceLevel,
    skill: filters.skill,
    skills: filters.skills,
    matchAllSkills: filters.matchAllSkills ?? true,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    page: filters.page,
    pageSize: filters.pageSize,
  };
};
