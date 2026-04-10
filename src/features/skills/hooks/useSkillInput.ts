import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  const [selectedSkills, setSelectedSkills] =
    useState<SelectedSkill[]>(defaultSkills);
  const isFirstRender = useRef(true);

  const { data: rawSuggestions = [], isFetching } = useSkillSuggest(inputValue);

  const suggestions = useMemo(() => {
    return rawSuggestions.filter(
      (s) => !selectedSkills.some((sel) => sel.id === s.id),
    );
  }, [rawSuggestions, selectedSkills]);

  const showDropdown = suggestions.length > 0 && inputValue.trim().length > 0;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Bỏ qua lần gọi onChange đầu tiên
    }
    const ids = selectedSkills.map((s) => s.id);
    onChange?.(ids, selectedSkills);
  }, [selectedSkills, onChange]);

  useEffect(() => {
    setSelectedSkills(defaultSkills);
  }, [defaultSkills]);
  const selectSkill = useCallback((skill: SkillSuggestItem) => {
    setSelectedSkills((prev) => {
      if (prev.some((s) => s.id === skill.id)) return prev;
      return [...prev, { id: skill.id, name: skill.name }];
    });
    setInputValue("");
  }, []);

  const removeSkill = useCallback((skillId: number) => {
    setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
  }, []);

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
