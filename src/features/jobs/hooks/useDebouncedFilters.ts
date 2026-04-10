import { useFilter } from "./useFilter";
import { useDebounce } from "@/lib/useDebounce";

export const useDebouncedFilters = () => {
  const { filter } = useFilter();

  // Debounce only text fields
  const debouncedTitle = useDebounce(filter.title, 300);
  const debouncedLocation = useDebounce(filter.location, 300);

  // Return merged: debounced text + immediate checkboxes/selects
  return {
    title: debouncedTitle,
    location: debouncedLocation,
    minSalary: filter.minSalary,
    maxSalary: filter.maxSalary,
    employmentType: filter.employmentType,
    experienceLevel: filter.experienceLevel,
    skill: filter.skill,
    sortBy: filter.sortBy,
    sortOrder: filter.sortOrder,
    page: filter.page,
    limit: filter.limit,
  };
};
