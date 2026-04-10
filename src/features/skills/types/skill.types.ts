export type SkillSuggestItem = {
  id: number;
  name: string;
  category: string;
};

export type SkillResponse = {
  id: number;
  name: string;
  category: string;
  aliases: string;
  contextKeywords: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

export type SkillListPaginatedResponse = {
  items: SkillResponse[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type CreateSkillRequest = {
  name: string;
  category: string;
  aliases: string;
  contextKeywords: string;
};

export type UpdateSkillRequest = {
  name: string;
  category: string;
  aliases: string;
  contextKeywords: string;
  isActive: boolean;
};

export type SelectedSkill = {
  id: number;
  name: string;
};
