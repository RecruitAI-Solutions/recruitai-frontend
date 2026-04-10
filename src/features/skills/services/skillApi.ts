import { axiosInstance } from "@/services/api/axiosInstance";
import { SKILL_ENDPOINTS } from "@/config/endpoints/skill.endpoints";
import type {
  SkillSuggestItem,
  SkillListPaginatedResponse,
  SkillResponse,
  CreateSkillRequest,
  UpdateSkillRequest,
} from "../types/skill.types";

export const skillApi = {
  suggest: async (q: string, limit = 10): Promise<SkillSuggestItem[]> => {
    const response = await axiosInstance.get<SkillSuggestItem[]>(
      SKILL_ENDPOINTS.SUGGEST,
      { params: { q, limit } },
    );
    return response.data;
  },

  getSkills: async (
    params?: Record<string, unknown>,
  ): Promise<SkillListPaginatedResponse> => {
    const response = await axiosInstance.get<SkillListPaginatedResponse>(
      SKILL_ENDPOINTS.LIST,
      { params },
    );
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await axiosInstance.get<string[]>(
      SKILL_ENDPOINTS.CATEGORIES,
    );
    return response.data;
  },

  getSkill: async (id: number): Promise<SkillResponse> => {
    const response = await axiosInstance.get<SkillResponse>(
      SKILL_ENDPOINTS.DETAIL(id),
    );
    return response.data;
  },

  createSkill: async (payload: CreateSkillRequest): Promise<SkillResponse> => {
    const response = await axiosInstance.post<SkillResponse>(
      SKILL_ENDPOINTS.CREATE,
      payload,
    );
    return response.data;
  },

  updateSkill: async (
    id: number,
    payload: UpdateSkillRequest,
  ): Promise<SkillResponse> => {
    const response = await axiosInstance.put<SkillResponse>(
      SKILL_ENDPOINTS.UPDATE(id),
      payload,
    );
    return response.data;
  },

  deleteSkill: async (id: number): Promise<void> => {
    await axiosInstance.delete(SKILL_ENDPOINTS.DELETE(id));
  },
};
