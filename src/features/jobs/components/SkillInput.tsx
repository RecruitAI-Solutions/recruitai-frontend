import { useSkillInput } from "../hooks/useSkillInput";
import { cn } from "@/lib/utils";
import type { SelectedSkill } from "../types/skill.types";

type SkillInputProps = {
  label?:        string;
  // value: skillIds[] từ RHF field.value — controlled
  value?:        number[];
  // defaultSkills: SelectedSkill[] để render badges khi Edit (pre-fill)
  defaultSkills?: SelectedSkill[];
  // onChange: field.onChange từ RHF Controller
  onChange?:     (skillIds: number[]) => void;
  disabled?:     boolean;
  error?:        string;
};

export const SkillInput = ({
  label = "Kỹ năng yêu cầu",
  defaultSkills = [],
  onChange,
  disabled = false,
  error,
}: SkillInputProps) => {
  const {
    inputValue,
    setInputValue,
    suggestions,
    isFetching,
    showDropdown,
    selectedSkills,
    selectSkill,
    removeSkill,
    containerRef,
  } = useSkillInput({ defaultSkills, onChange });

  return (
    <div className="w-full" ref={containerRef}>

      {/* ── Label ──────────────────────────────────────────────────────── */}
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}

      {/* ── Selected skill badges ───────────────────────────────────────── */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedSkills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center gap-1.5
                         px-2.5 py-1 rounded-full
                         bg-primary/10 text-primary
                         border border-primary/20
                         text-xs font-medium"
            >
              {skill.name}

              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  aria-label={`Xóa ${skill.name}`}
                  className="inline-flex items-center justify-center
                             w-3.5 h-3.5 rounded-full
                             hover:bg-primary/20
                             transition-colors duration-150
                             focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                    className="w-2.5 h-2.5"
                  >
                    <path d="M1.293 1.293a1 1 0 011.414 0L7 5.586l4.293-4.293a1 1 0 111.414 1.414L8.414 7l4.293 4.293a1 1 0 01-1.414 1.414L7 8.414l-4.293 4.293a1 1 0 01-1.414-1.414L5.586 7 1.293 2.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* ── Input + Dropdown ────────────────────────────────────────────── */}
      <div className="relative">

        {/* Input wrapper */}
        <div
          className={cn(
            "flex items-center w-full px-4 py-2 rounded-lg border",
            "bg-surface text-text-primary border-border",
            "transition-all duration-200",
            "focus-within:ring-2 focus-within:ring-primary focus-within:border-primary",
            error    && "border-error focus-within:ring-error",
            disabled && "bg-gray-100 cursor-not-allowed opacity-60",
          )}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={disabled}
            placeholder="Nhập để tìm kỹ năng..."
            autoComplete="off"
            className="flex-1 bg-transparent text-sm text-text-primary
                       placeholder:text-text-muted
                       focus:outline-none disabled:cursor-not-allowed"
          />

          {/* Spinner — isFetching từ React Query */}
          {isFetching && (
            <svg
              className="animate-spin h-4 w-4 text-text-muted shrink-0 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
        </div>

        {/* Dropdown suggestions */}
        {showDropdown && suggestions.length > 0 && (
          <ul
            role="listbox"
            className="absolute z-50 top-full left-0 right-0 mt-1
                       bg-surface border border-border rounded-lg shadow-lg
                       max-h-56 overflow-y-auto divide-y divide-border"
          >
            {suggestions.map((skill) => (
              <li
                key={skill.id}
                role="option"
                aria-selected={false}
                // onMouseDown thay vì onClick — tránh blur input trước khi select
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectSkill(skill);
                }}
                className="flex items-center justify-between
                           px-4 py-2.5 text-sm text-text-primary
                           hover:bg-primary/5 cursor-pointer
                           transition-colors duration-100"
              >
                <span className="font-medium">{skill.name}</span>
                {skill.category && (
                  <span className="text-xs text-text-muted ml-2 shrink-0">
                    {skill.category}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Error / Helper text ─────────────────────────────────────────── */}
      {error ? (
        <p className="mt-1 text-sm text-error">{error}</p>
      ) : (
        selectedSkills.length === 0 && (
          <p className="mt-1 text-xs text-text-muted">
            Gõ tên kỹ năng để tìm kiếm, click để thêm vào danh sách
          </p>
        )
      )}
    </div>
  );
};
