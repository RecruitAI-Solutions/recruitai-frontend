import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/useDebounce";
import { skillApi } from "../services/skillApi";

/**
 * Fetch skill suggestions từ GET /api/v1/skills/suggest?q=&limit=10
 * - Tự debounce query 300ms trước khi gọi API
 * - Chỉ gọi khi query không rỗng (enabled guard)
 * - Cache 5 phút (staleTime) — suggestion không thay đổi thường xuyên
 */
export const useSkillSuggest = (query: string) => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  return useQuery({
    queryKey: ["skill-suggest", debouncedQuery],
    queryFn:  () => skillApi.suggest(debouncedQuery, 10),
    enabled:  debouncedQuery.length > 0,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
};
