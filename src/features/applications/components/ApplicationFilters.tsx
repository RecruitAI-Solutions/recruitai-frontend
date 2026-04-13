import { Select } from "@/shared/components/ui/Select";
import { Input } from "@/shared/components/ui/Input";
import { useApplicationsFilter } from "../hooks/useApplicationsFilter";
import type { ApplicationStatusValue } from "../types/application.type";

export const ApplicationFilters = () => {
  const { filter, updateFilter } = useApplicationsFilter();

  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div className="w-32">
        <label className="block text-sm font-medium mb-1">Trạng thái</label>
        <Select
          value={filter.status?.toString() || ""}
          onChange={(e) =>
            updateFilter({
              status: e.target.value
                ? (Number(e.target.value) as ApplicationStatusValue)
                : undefined,
            })
          }
          options={[
            { value: "", label: "Tất cả" },
            { value: "1", label: "Chờ duyệt" },
            { value: "2", label: "Đã xem" },
            { value: "3", label: "Đạt" },
            { value: "4", label: "Từ chối" },
          ]}
        />
      </div>
      <div className="w-40">
        <label className="block text-sm font-medium mb-1">
          Match tối thiểu
        </label>
        <Input
          type="number"
          min={0}
          max={100}
          value={filter.minMatch?.toString() || ""}
          onChange={(e) =>
            updateFilter({
              minMatch: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          placeholder="0-100"
        />
      </div>
      <div className="w-40">
        <label className="block text-sm font-medium mb-1">Sắp xếp theo</label>
        <Select
          value={filter.sortBy || "appliedAt"}
          onChange={(e) =>
            updateFilter({
              sortBy: e.target.value as "appliedAt" | "matchPercentage",
            })
          }
          options={[
            { value: "appliedAt", label: "Ngày ứng tuyển" },
            { value: "matchPercentage", label: "Độ phù hợp" },
          ]}
        />
      </div>
      <div className="w-32">
        <label className="block text-sm font-medium mb-1">Thứ tự</label>
        <Select
          value={filter.sortOrder || "desc"}
          onChange={(e) =>
            updateFilter({ sortOrder: e.target.value as "asc" | "desc" })
          }
          options={[
            { value: "desc", label: "Giảm dần" },
            { value: "asc", label: "Tăng dần" },
          ]}
        />
      </div>
    </div>
  );
};
