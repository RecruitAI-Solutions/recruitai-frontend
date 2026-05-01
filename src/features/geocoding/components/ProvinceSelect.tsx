import { cn } from "@/lib/utils";
import { useProvinceSelect } from "../hooks/useProvinceSelect";
import { useState, useRef, useEffect } from "react";

type Props = {
  label?: string;
  value?: string | null;
  onChange?: (name: string | null) => void;
  error?: string;
};

export const ProvinceSelect = ({
  label = "Địa điểm",
  value,
  onChange,
  error,
}: Props) => {
  const { provinces, loading, selectedName, handleChange, clear, search, setSearch } = useProvinceSelect({ value, onChange });
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayValue = search || selectedName || "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shouldShowDropdown = isOpen && (search?.length > 0 || loading);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      {/* Sửa: thêm min-h và py chính xác */}
      <div className={cn(
        "flex items-center border rounded-lg px-3",
        "min-h-[42px]", // đảm bảo chiều cao tối thiểu
        error && "border-red-500"
      )}>
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            if (selectedName) clear();
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Nhập tên tỉnh/thành phố..."
          className="flex-1 outline-none bg-transparent text-sm"
          style={{
            lineHeight: "24px",
            paddingTop: "8px",
            paddingBottom: "8px",
            height: "auto",
            minHeight: "38px"
          }}
        />
        {displayValue && (
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              clear();
              inputRef.current?.focus();
            }}
            className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer transition-colors rounded-full p-1"
          >
            ×
          </button>
        )}
      </div>

      {shouldShowDropdown && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="p-2 text-center text-gray-500">Đang tải...</div>
          ) : provinces.length === 0 ? (
            <div className="p-2 text-center text-gray-500">Không tìm thấy</div>
          ) : (
            provinces.map((p) => (
              <div
                key={p.code}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleChange(p.name);
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
              >
                {p.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};