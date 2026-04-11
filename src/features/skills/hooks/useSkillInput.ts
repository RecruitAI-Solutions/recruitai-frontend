import { useState, useCallback, useMemo } from "react";
import { useSkillSuggest } from "./useSkillSuggest";
import type { SkillSuggestItem, SelectedSkill } from "../types/skill.types";

type UseSkillInputProps = {
  value?: number[];
  defaultSkills?: SelectedSkill[];
  onChange?: (ids: number[], skills: SelectedSkill[]) => void;
};

export const useSkillInput = ({
  defaultSkills = [],
  onChange,
}: UseSkillInputProps = {}) => {
  const [inputValue, setInputValue] = useState("");

  /**
   * Khởi tạo từ defaultSkills một lần khi mount.
   * KHÔNG dùng useEffect để sync defaultSkills → vòng lặp vô hạn:
   *   onChange (trong updater) → setSearchParams → URL đổi → defaultSkills ref mới
   *   → useEffect fire → setSelectedSkills → re-render → lặp lại.
   *
   * Để reset: parent đổi key prop → component remount → useState nhận defaultSkills mới.
   * Xem: JobFilterSidebar dùng key={skillInputKey} + setSkillInputKey khi reset.
   */
  const [selectedSkills, setSelectedSkills] =
    useState<SelectedSkill[]>(defaultSkills);

  const { data: rawSuggestions = [], isFetching } = useSkillSuggest(inputValue);

  const suggestions = useMemo(
    () =>
      rawSuggestions.filter(
        (s) => !selectedSkills.some((sel) => sel.id === s.id),
      ),
    [rawSuggestions, selectedSkills],
  );

  const showDropdown = suggestions.length > 0 && inputValue.trim().length > 0;

  /**
   * FIX Error 1: Tính next và gọi onChange NGOÀI state updater.
   * State updater phải pure — không gọi side effect (onChange → setSearchParams).
   * Dùng selectedSkills từ closure (khai báo trong deps) thay vì functional updater
   * để có thể gọi onChange với giá trị next chính xác.
   */
  const selectSkill = useCallback(
    (skill: SkillSuggestItem) => {
      if (selectedSkills.some((s) => s.id === skill.id)) return;
      const next = [...selectedSkills, { id: skill.id, name: skill.name }];
      setSelectedSkills(next);
      onChange?.(
        next.map((s) => s.id),
        next,
      );
      setInputValue("");
    },
    [selectedSkills, onChange],
  );

  const removeSkill = useCallback(
    (skillId: number) => {
      const next = selectedSkills.filter((s) => s.id !== skillId);
      setSelectedSkills(next);
      onChange?.(
        next.map((s) => s.id),
        next,
      );
    },
    [selectedSkills, onChange],
  );

  return {
    inputValue,
    setInputValue,
    suggestions,
    isFetching,
    showDropdown,
    selectedSkills,
    selectSkill,
    removeSkill,
  };
};
