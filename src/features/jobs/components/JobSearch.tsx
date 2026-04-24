import { Input } from "@/shared/components/ui/Input";
import { Search } from "lucide-react";
import { memo } from "react";

type JobSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const JobSearch = memo(
  ({
    value,
    onChange,
    placeholder = "Tên việc làm ...",
  }: JobSearchProps) => {
    return (
      <div className="relative z-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10"
        />
      </div>
    );
  },
);
