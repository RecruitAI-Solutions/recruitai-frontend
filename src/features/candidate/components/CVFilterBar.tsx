import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { Button } from "@/shared/components/ui/Button";
import { useCVFilter } from "../hooks/useCVFilter";
import { useState, useRef, useEffect } from "react";

export const CVFilterBar = () => {
  const { filter, updateFilter, resetFilter } = useCVFilter();
  const [fileNameInput, setFileNameInput] = useState(filter.fileName || "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle debounce manually
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFileNameInput(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      updateFilter({ fileName: value || undefined });
    }, 300);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    updateFilter({ status: val ? Number(val) : undefined }); // Chỉ gửi 1 số
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter({ sortBy: e.target.value });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter({ sortOrder: e.target.value as "asc" | "desc" });
  };

  const handleReset = () => {
    setFileNameInput("");
    resetFilter();
  };

  return (
    <div className="flex flex-wrap items-end bg-surface p-4 rounded-xl border border-border gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-1">Tên file</label>
        <Input
          placeholder="Tìm theo tên file..."
          value={fileNameInput}
          onChange={handleFileNameChange}
        />
      </div>

      <div className="w-48">
        <label className="block text-sm font-medium mb-1">Trạng thái</label>
        <Select
          value={filter.status?.toString() || ""}
          onChange={handleStatusChange}
          options={[
            { value: "", label: "Tất cả" },
            { value: "1", label: "Chờ upload" },
            { value: "2", label: "Đã upload" },
            { value: "3", label: "Đang xử lý" },
            { value: "4", label: "Đã xử lý nội dung" },
            { value: "5", label: "Đã phân tích kỹ năng" },
            { value: "6", label: "Thất bại" },
          ]}
        />
      </div>

      {/* Nhóm Sắp xếp và Thứ tự lại với nhau */}
      <div className="flex gap-3">
        <div className="w-36">
          <label className="block text-sm font-medium mb-1">Sắp xếp theo</label>
          <Select
            value={filter.sortBy || "uploadedAt"}
            onChange={handleSortChange}
            options={[
              { value: "uploadedAt", label: "Ngày upload" },
              { value: "fileName", label: "Tên file" },
              { value: "fileSize", label: "Kích thước file" },
              { value: "status", label: "Trạng thái" },
            ]}
          />
        </div>

        <div className="w-28">
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
      </div>

      <Button variant="outline" onClick={handleReset}>
        Xóa lọc
      </Button>
    </div>
  );
};