import { cn } from "@/lib/utils";
import { useProvinceSelect } from "../hooks/useProvinceSelect";

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
  const { provinces, selectedName, handleChange, clear } = useProvinceSelect({
    value,
    onChange,
  });

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <div
        className={cn(
          "flex items-center border rounded-lg px-3 py-2",
          error && "border-red-500",
        )}
      >
        <select
          value={selectedName ?? ""}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm"
        >
          <option value="">Chọn tỉnh/thành phố</option>

          {provinces.map((p) => (
            <option key={p.code} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        {selectedName && (
          <button
            type="button"
            onClick={clear}
            className="ml-2 text-gray-400 hover:text-red-500"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
