import { useLocationInput } from "../hooks/useLocationInput";
import type { LocationValue } from "../hooks/useLocationInput";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";

type LocationInputProps = {
  label?: string;
  // value + onChange: field.value / field.onChange từ RHF Controller
  value?: LocationValue | null;
  onChange?: (data: LocationValue | null) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
};

export const LocationInput = ({
  label = "Địa điểm",
  value,
  onChange,
  disabled = false,
  error,
}: LocationInputProps) => {
  const {
    displayValue,
    setInputValue,
    rawSuggestions,
    isFetching,
    showDropdown,
    hasSelection,
    selectSuggestion,
    clearSelection,
  } = useLocationInput({ value, onChange });

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <Popover.Root open={showDropdown}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              "flex items-center px-4 py-2 border rounded-lg",
              error && "border-red-500",
            )}
          >
            {/* Input */}
            <input
              value={displayValue}
              onChange={(e) => {
                const val = e.target.value;
                setInputValue(val);
                if (value) {
                  onChange?.(null);
                }
              }}
              disabled={disabled}
              placeholder="Nhập địa chỉ chi tiết ..."
              className="flex-1 outline-none bg-transparent text-sm"
            />

            {/* Loading */}
            {isFetching && (
              <span className="text-xs text-gray-400 ml-2">...</span>
            )}

            {/* Clear */}
            {hasSelection && (
              <button
                type="button"
                onClick={clearSelection}
                className="ml-2 text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            )}
          </div>
        </Popover.Trigger>

        {/* Dropdown */}
        <Popover.Content
          className="w-[320px] bg-white border rounded shadow-md p-1"
          align="start"
        >
          {rawSuggestions.map((item) => (
            <div
              key={item.refId}
              onClick={() => selectSuggestion(item)}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
            >
              <div className="font-medium truncate">{item.display}</div>

              {item.fullAddress !== item.display && (
                <div className="text-xs text-gray-400 truncate">
                  {item.fullAddress}
                </div>
              )}
            </div>
          ))}
        </Popover.Content>
      </Popover.Root>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
