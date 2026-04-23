import * as Popover from "@radix-ui/react-popover";
import { useSkillInput } from "../hooks/useSkillInput";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { SelectedSkill } from "../types/skill.types";

type Props = {
  label?: string;
  value?: number[];
  defaultSkills?: SelectedSkill[];
  onChange?: (ids: number[], skills: SelectedSkill[]) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
};

export const SkillInput = ({
  label,
  value,
  defaultSkills,
  onChange,
  disabled,
  error,
  placeholder = "Nhập kỹ năng...",
}: Props) => {
  const {
    inputValue,
    setInputValue,
    suggestions,
    isFetching,
    showDropdown,
    selectedSkills,
    selectSkill,
    removeSkill,
  } = useSkillInput({ value, defaultSkills, onChange });

  return (
    <div className="w-full">
      {label && <label className="text-sm font-medium">{label}</label>}

      <Popover.Root open={showDropdown}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              "flex flex-wrap items-center gap-2 px-3 py-2 border border-border rounded-lg",
              "bg-white transition-colors duration-200",
              "focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20",
              error && "border-error",
            )}
          >
            {selectedSkills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium"
              >
                <span>{skill.name}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSkill(skill.id);
                  }}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={disabled}
              placeholder={selectedSkills.length === 0 ? placeholder : ""}
              className="flex-1 outline-none bg-transparent text-sm min-w-[100px]"
            />
          </div>
        </Popover.Trigger>

        <Popover.Content
          className="w-[300px] bg-white border border-border rounded-lg shadow-lg p-2 z-50"
          align="start"
        >
          {isFetching && (
            <div className="p-3 text-sm text-text-muted text-center">
              Đang tải...
            </div>
          )}
          {suggestions.length === 0 && !isFetching && (
            <div className="p-3 text-sm text-text-muted text-center">
              Không tìm thấy kỹ năng
            </div>
          )}
          {suggestions.map((skill) => (
            <div
              key={skill.id}
              onClick={() => selectSkill(skill)}
              className="px-3 py-2 text-sm hover:bg-primary/5 cursor-pointer rounded-md transition-colors"
            >
              {skill.name}
            </div>
          ))}
        </Popover.Content>
      </Popover.Root>

      {error && <p className="text-sm text-error mt-1">{error}</p>}
    </div>
  );
};
