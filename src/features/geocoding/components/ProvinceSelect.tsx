import { cn } from "@/lib/utils";
import { useProvinceSelect } from "../hooks/useProvinceSelect";
import { useState } from "react";

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

  const displayValue = search || selectedName || "";

  return (
    <div className="w-full relative">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      <div className={cn("flex items-center border rounded-lg px-3 py-2", error && "border-red-500")}>
        <input
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
          disabled={loading}
        />
        {displayValue && (
          <button type="button" onClick={clear} className="ml-2 text-gray-400 hover:text-red-500">
            ×
          </button>
        )}
      </div>

      {isOpen && !loading && provinces.length > 0 && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
            {provinces.map((p) => (
              <div
                key={p.code}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  handleChange(p.name);
                  setIsOpen(false);
                }}
              >
                {p.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};