import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/useDebounce";
import { skillApi } from "../services/skillApi";

export const useSkillSuggest = (query: string) => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  return useQuery({
    queryKey: ["skill-suggest", debouncedQuery],
    queryFn: () => skillApi.suggest(debouncedQuery, 10),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
};
