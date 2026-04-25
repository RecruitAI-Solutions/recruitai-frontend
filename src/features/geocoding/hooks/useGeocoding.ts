import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/lib/useDebounce";
import { geocodingApi } from "../services/geocodingApi";
import type { SearchLocationParams } from "../types/geocoding.types";

export const GEO_QUERY_KEYS = {
  // queryKey bao gồm toàn bộ params để tránh cache conflict khi có filter
  search: (params: SearchLocationParams) =>
    ["geocoding", "search", params] as const,
  detail: (refId: string) => ["geocoding", "detail", refId] as const,
};

/**
 * Fetch location suggestions từ GET /api/v1/geocoding/search
 * - Tự debounce `text` 300ms trước khi gọi API
 * - Chỉ gọi khi text >= 2 ký tự
 * - Cache 5 phút
 */
export const useLocationSearch = (
  text: string,
  extraParams?: Omit<SearchLocationParams, "text">,
) => {
  const debouncedText = useDebounce(text.trim(), 300);

  const params: SearchLocationParams = {
    text: debouncedText,
    limit: 8,
    ...extraParams,
  };

  return useQuery({
    queryKey: GEO_QUERY_KEYS.search(params),
    queryFn: () => geocodingApi.search(params),
    enabled: debouncedText.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Fetch chi tiết 1 địa điểm theo refId
 * - Cache 1 giờ vì place data rất ít thay đổi
 */
export const useLocationDetail = (refId: string) => {
  return useQuery({
    queryKey: GEO_QUERY_KEYS.detail(refId),
    queryFn: () => geocodingApi.getPlace(refId),
    enabled: !!refId,
    staleTime: 1000 * 60 * 60,
  });
};
