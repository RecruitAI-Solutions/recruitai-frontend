import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillApi } from "@/features/skills/services/skillApi";
import type { SkillsParams } from "../types/admin.types";
import type {
  CreateSkillRequest,
  UpdateSkillRequest,
} from "@/features/skills/types/skill.types";
import { ADMIN_QUERY_KEYS } from "./adminQueryKeys";
import toast from "react-hot-toast";

export const useAdminSkills = (params?: SkillsParams) => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.skills(params),
    queryFn: () => skillApi.getSkills(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSkillRequest) => skillApi.createSkill(data),
    onSuccess: () => {
      toast.success("Tạo kỹ năng thành công");
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.skills() });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSkillRequest }) =>
      skillApi.updateSkill(id, data),
    onSuccess: () => {
      toast.success("Cập nhật kỹ năng thành công");
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.skills() });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => skillApi.deleteSkill(id),
    onSuccess: () => {
      toast.success("Xóa kỹ năng thành công");
      queryClient.invalidateQueries({ queryKey: ADMIN_QUERY_KEYS.skills() });
    },
  });
};
