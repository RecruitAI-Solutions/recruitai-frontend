import { useState, useEffect } from "react";
import { Input } from "@/shared/components/ui/Input";
import { Search } from "lucide-react";

type JobSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const JobSearch = ({
  value,
  onChange,
  placeholder = "Tên việc làm, công ty, kỹ năng...",
}: JobSearchProps) => {
  const [localValue, setLocalValue] = useState(value);

  // Đồng bộ khi value từ bên ngoài thay đổi
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce onChange
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
};
