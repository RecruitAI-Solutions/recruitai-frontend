import * as Popover from "@radix-ui/react-popover";
import { useSkillInput } from "../hooks/useSkillInput";
import { cn } from "@/lib/utils";
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
              error && "border-red-500",
            )}
          >
            {selectedSkills.map((skill) => (
              <span
                key={skill.id}
                className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                {skill.name}
                <button
                  type="button"
                  className="hover:scale-[120%]"
                  onClick={() => removeSkill(skill.id)}
                >
                  ×
                </button>
              </span>
            ))}

            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={disabled}
              placeholder={placeholder}
              className="flex-1 outline-none bg-transparent"
            />
          </div>
        </Popover.Trigger>

        <Popover.Content
          className="w-[300px] bg-white border border-border rounded shadow-md p-1"
          align="start"
        >
          {isFetching && (
            <div className="p-2 text-sm text-gray-400">Đang tải...</div>
          )}
          {suggestions.map((skill) => (
            <div
              key={skill.id}
              onClick={() => selectSkill(skill)}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
            >
              {skill.name}
            </div>
          ))}
        </Popover.Content>
      </Popover.Root>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
