import { useState, useEffect, useRef, useCallback } from "react";
import { useSkillSuggest } from "./useSkillSuggest";
import type { SkillSuggestItem, SelectedSkill } from "../types/skill.types";

type UseSkillInputProps = {
  // value: skillIds[] từ RHF Controller (field.value) — controlled
  value?: number[];
  // defaultSkills: SelectedSkill[] (id + name) — dùng để render badges khi Edit
  defaultSkills?: SelectedSkill[];
  // onChange: field.onChange từ RHF Controller — trả lên skillIds[]
  onChange?: (skillIds: number[]) => void;
};

type UseSkillInputReturn = {
  // Search input
  inputValue:      string;
  setInputValue:   (v: string) => void;

  // Dropdown
  suggestions:     SkillSuggestItem[];
  isFetching:      boolean;
  showDropdown:    boolean;
  setShowDropdown: (v: boolean) => void;

  // Badges
  selectedSkills:  SelectedSkill[];

  // Actions
  selectSkill: (skill: SkillSuggestItem) => void;
  removeSkill: (skillId: number) => void;

  // Click-outside ref
  containerRef: React.RefObject<HTMLDivElement | null>;
};

export const useSkillInput = ({
  defaultSkills = [],
  onChange,
}: UseSkillInputProps = {}): UseSkillInputReturn => {
  // Search text người dùng đang gõ
  const [inputValue, setInputValue] = useState("");

  // Danh sách badge đang hiển thị — khởi tạo từ defaultSkills (Edit mode)
  const [selectedSkills, setSelectedSkills] =
    useState<SelectedSkill[]>(defaultSkills);

  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // ── React Query fetch suggestions (debounce nằm trong hook) ──────────────
  const { data: rawSuggestions = [], isFetching } = useSkillSuggest(inputValue);

  // Lọc bỏ skill đã chọn khỏi dropdown
  const suggestions = rawSuggestions.filter(
    (s) => !selectedSkills.some((sel) => sel.id === s.id),
  );

  // Hiện dropdown khi có kết quả và input không rỗng
  useEffect(() => {
    setShowDropdown(suggestions.length > 0 && inputValue.trim().length > 0);
  }, [suggestions, inputValue]);

  // ── Đóng dropdown khi click bên ngoài ───────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Notify RHF Controller mỗi khi selectedSkills thay đổi ───────────────
  useEffect(() => {
    onChange?.(selectedSkills.map((s) => s.id));
  }, [selectedSkills, onChange]);

  // ── Chọn skill từ dropdown → thêm badge + reset input ───────────────────
  const selectSkill = useCallback((skill: SkillSuggestItem) => {
    setSelectedSkills((prev) => {
      if (prev.some((s) => s.id === skill.id)) return prev;
      return [...prev, { id: skill.id, name: skill.name }];
    });
    setInputValue("");
    setShowDropdown(false);
  }, []);

  // ── Xóa badge ────────────────────────────────────────────────────────────
  const removeSkill = useCallback((skillId: number) => {
    setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
  }, []);

  return {
    inputValue,
    setInputValue,
    suggestions,
    isFetching,
    showDropdown,
    setShowDropdown,
    selectedSkills,
    selectSkill,
    removeSkill,
    containerRef,
  };
};
