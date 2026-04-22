import { useFilter } from "../hooks/useFilter";
import { ProvinceSelect } from "@/features/geocoding/components/ProvinceSelect";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { employmentTypeMap, ExperienceLevelMap } from "../types/job.types";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { SkillInput } from "@/features/skills/components/SkillInput";
import type { SelectedSkill } from "@/features/skills/types/skill.types";
import styles from "./JobFilterSidebar.module.css";

type JobFilterSidebarProps = {
  className?: string;
  onReset?: () => void;
};

const JobFilterSidebar = ({ className, onReset }: JobFilterSidebarProps) => {
  const { filter, updateFilter, resetFilter } = useFilter();
  const [skillInputKey, setSkillInputKey] = useState(0);

  const skillNames = useMemo(
    () => filter.skill?.split(",").filter(Boolean) || [],
    [filter.skill],
  );

  const defaultSkills: SelectedSkill[] = useMemo(() => {
    return skillNames.map((name, index) => ({
      id: -index - 1,
      name,
    }));
  }, [skillNames]);

  // Re-mount SkillInput khi defaultSkills thay đổi (bao gồm cả khi reset)
  useEffect(() => {
    setSkillInputKey((pre) => pre + 1);
  }, [defaultSkills]);

  const selectedEmploymentTypes = useMemo(
    () => filter.employmentType?.split(",").filter(Boolean) || [],
    [filter.employmentType],
  );

  const selectedExperienceLevels = useMemo(
    () => filter.experienceLevel?.split(",").filter(Boolean) || [],
    [filter.experienceLevel],
  );

  const handleSkillChange = useCallback(
    (ids: number[], skills: SelectedSkill[]) => {
      const names = skills.map((s) => s.name);
      updateFilter({
        skill: names.length ? names.join(",") : undefined,
      });
    },
    [updateFilter],
  );

  const handleEmploymentTypeChange = useCallback(
    (value: string, checked: boolean) => {
      const next = checked
        ? [...selectedEmploymentTypes, value]
        : selectedEmploymentTypes.filter((v) => v !== value);
      updateFilter({
        employmentType: next.length ? next.join(",") : undefined,
      });
    },
    [selectedEmploymentTypes, updateFilter],
  );

  const handleExperienceLevelChange = useCallback(
    (value: string, checked: boolean) => {
      const next = checked
        ? [...selectedExperienceLevels, value]
        : selectedExperienceLevels.filter((v) => v !== value);
      updateFilter({
        experienceLevel: next.length ? next.join(",") : undefined,
      });
    },
    [selectedExperienceLevels, updateFilter],
  );

  const handleSalaryChange = useCallback(
    (key: "minSalary" | "maxSalary", value: string) => {
      const num = value ? Number(value) : undefined;
      updateFilter({ [key]: num });
    },
    [updateFilter],
  );

  const handleReset = useCallback(() => {
    resetFilter();
    onReset?.();
  }, [resetFilter, onReset]);

  return (
    <aside
      className={cn(
        "w-full md:w-72 bg-surface p-5 rounded-xl border border-border",
        "sticky top-[16px] overflow-y-auto will-change-transform transition-transform duration-200 ease-out",
        styles.sidebar,
        className,
      )}
      style={{
        maxHeight: "calc(100vh - 100px)",
      }}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Bộ lọc</h3>
          <Button variant="outline" onClick={handleReset}>
            Xóa tất cả
          </Button>
        </div>

        {/* Tỉnh/Thành phố */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tỉnh / Thành phố
          </label>
          <ProvinceSelect
            value={filter.location || null}
            onChange={(name) => updateFilter({ location: name || undefined })}
          />
        </div>

        {/* Hình thức làm việc */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Hình thức làm việc
          </label>
          <div className="space-y-2">
            {Object.entries(employmentTypeMap).map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox.Root
                  className="w-5 h-5 rounded border border-border flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  checked={selectedEmploymentTypes.includes(value)}
                  onCheckedChange={(checked) =>
                    handleEmploymentTypeChange(value, checked === true)
                  }
                >
                  <Checkbox.Indicator>
                    <Check className="w-3 h-3 text-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mức lương */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Mức lương (triệu VNĐ)
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Tối thiểu"
                value={filter.minSalary?.toString() || ""}
                onChange={(e) =>
                  handleSalaryChange("minSalary", e.target.value)
                }
                className="h-9 text-sm"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Tối đa"
                value={filter.maxSalary?.toString() || ""}
                onChange={(e) =>
                  handleSalaryChange("maxSalary", e.target.value)
                }
                className="h-9 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "< 15M", min: 0, max: 15000000 },
                { label: "15-30M", min: 15000000, max: 30000000 },
                { label: "30-50M", min: 30000000, max: 50000000 },
                { label: "> 50M", min: 50000000, max: undefined },
              ].map((range) => (
                <button
                  key={range.label}
                  className="px-3 py-1 text-xs border rounded-full hover:bg-gray-100"
                  onClick={() =>
                    updateFilter({ minSalary: range.min, maxSalary: range.max })
                  }
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kinh nghiệm */}
        <div>
          <label className="block text-sm font-medium mb-2">Kinh nghiệm</label>
          <div className="space-y-2">
            {Object.entries(ExperienceLevelMap).map(([value, label]) => (
              <label
                key={value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Checkbox.Root
                  className="w-5 h-5 rounded border border-border flex items-center justify-center data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  checked={selectedExperienceLevels.includes(value)}
                  onCheckedChange={(checked) =>
                    handleExperienceLevelChange(value, checked === true)
                  }
                >
                  <Checkbox.Indicator>
                    <Check className="w-3 h-3 text-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Kỹ năng */}
        <div>
          <label className="block text-sm font-medium mb-2">Kỹ năng</label>
          <SkillInput
            key={skillInputKey}
            defaultSkills={defaultSkills}
            onChange={handleSkillChange}
            placeholder="Chọn kỹ năng..."
          />
        </div>
      </div>
    </aside>
  );
};

export default memo(JobFilterSidebar);
