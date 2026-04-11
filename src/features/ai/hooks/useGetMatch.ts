import { useQuery } from "@tanstack/react-query";
import { aiApi } from "../services/aiApi";
import type { GetMatchParams } from "../types/ai.types";
import { AI_QUERY_KEYS } from "./aiQueryKeys";

export const useGetMatch = (params: GetMatchParams, enabled = true) => {
  return useQuery({
    queryKey: AI_QUERY_KEYS.match(params),
    queryFn: () => aiApi.getMatch(params),
    enabled: !!params.cvId && !!params.jobId && enabled,
  });
};
