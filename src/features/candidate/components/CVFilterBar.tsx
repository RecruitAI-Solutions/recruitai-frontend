import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { Button } from "@/shared/components/ui/Button";
import { useCVFilter } from "../hooks/useCVFilter";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/useDebounce";

export const CVFilterBar = () => {
  const { filter, updateFilter, resetFilter } = useCVFilter();
  const [fileNameInput, setFileNameInput] = useState(filter.fileName || "");

  // Debounce giá trị nhập
  const debouncedFileName = useDebounce(fileNameInput, 300);

  useEffect(() => {
    if (debouncedFileName !== filter.fileName) {
      updateFilter({ fileName: debouncedFileName || undefined });
    }
  }, [debouncedFileName, filter.fileName, updateFilter]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    updateFilter({ status: val ? [Number(val)] : undefined });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter({ sortBy: e.target.value });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter({ sortOrder: e.target.value as "asc" | "desc" });
  };

  return (
    <div className="flex flex-wrap gap-4 items-end bg-surface p-4 rounded-xl border border-border">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Tên file</label>
        <Input
          key={filter.fileName}
          placeholder="Tìm theo tên file..."
          defaultValue={filter.fileName || ""}
          onChange={(e) => setFileNameInput(e.target.value)}
        />
      </div>
      <div className="w-40">
        <label className="block text-sm font-medium mb-1">Trạng thái</label>
        <Select
          value={filter.status?.[0]?.toString() || ""}
          onChange={handleStatusChange}
          options={[
            { value: "", label: "Tất cả" },
            { value: "1", label: "Chờ xử lý" },
            { value: "2", label: "Đang xử lý" },
            { value: "3", label: "Hoàn thành" },
            { value: "4", label: "Thất bại" },
          ]}
        />
      </div>
      <div className="w-40">
        <label className="block text-sm font-medium mb-1">Sắp xếp theo</label>
        <Select
          value={filter.sortBy || "uploadedAt"}
          onChange={handleSortChange}
          options={[
            { value: "uploadedAt", label: "Ngày upload" },
            { value: "fileName", label: "Tên file" },
            { value: "status", label: "Trạng thái" },
          ]}
        />
      </div>
      <div className="w-32">
        <label className="block text-sm font-medium mb-1">Thứ tự</label>
        <Select
          value={filter.sortOrder || "desc"}
          onChange={handleSortOrderChange}
          options={[
            { value: "desc", label: "Giảm dần" },
            { value: "asc", label: "Tăng dần" },
          ]}
        />
      </div>
      <Button variant="outline" onClick={resetFilter}>
        Xóa lọc
      </Button>
    </div>
  );
};
