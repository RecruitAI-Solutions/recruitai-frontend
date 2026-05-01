import { useLocationInput } from "../hooks/useLocationInput";
import type { LocationValue } from "../hooks/useLocationInput";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import { useState, useCallback, useRef, useEffect } from "react";

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

  // Debounce state
  const [debouncedValue, setDebouncedValue] = useState("");
  const [localInput, setLocalInput] = useState(displayValue);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Update local input when displayValue changes (from selection)
  useEffect(() => {
    setLocalInput(displayValue);
  }, [displayValue]);

  // Debounce logic: only update after 3+ characters and 500ms delay
  const handleInputChange = useCallback(
    (val: string) => {
      setLocalInput(val);

      // Clear previous timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Clear selection when user types
      if (value) {
        onChange?.(null);
      }

      // CHỈ GỌI API KHI ĐỦ 3 KÝ TỰ
      if (val.length >= 3) {
        debounceTimerRef.current = setTimeout(() => {
          setInputValue(val);  // Chỉ gọi API ở đây
        }, 500);
      } else {
        // KHÔNG GỌI API, chỉ clear suggestions
        setInputValue("");  // Hoặc gọi với chuỗi rỗng để clear
      }
    },
    [setInputValue, value, onChange],
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <Popover.Root open={showDropdown && (rawSuggestions.length > 0 || isFetching)}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              "flex items-center px-4 py-2 border rounded-lg",
              error && "border-red-500",
            )}
          >
            {/* Input */}
            <input
              value={localInput}
              onChange={(e) => {
                const val = e.target.value;
                handleInputChange(val);
              }}
              disabled={disabled}
              placeholder="Nhập địa chỉ chi tiết..."
              className="flex-1 outline-none bg-transparent text-sm"
              style={{
                lineHeight: "24px",
                paddingTop: "8px",
                paddingBottom: "8px",
                height: "auto",
                minHeight: "38px",
              }}
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
                className="ml-2 text-gray-400 hover:text-red-500 cursor-pointer transition-colors rounded-full p-1"
              >
                ×
              </button>
            )}
          </div>
        </Popover.Trigger>

        {/* Dropdown */}
        <Popover.Content
          className="w-[320px] bg-white border rounded shadow-md p-1 z-50"
          align="start"
          sideOffset={4}
        >
          {isFetching ? (
            <div className="px-3 py-2 text-sm text-gray-400">Đang tìm kiếm...</div>
          ) : rawSuggestions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-400">
              {localInput.length >= 3 ? "Không tìm thấy địa chỉ" : "Nhập ít nhất 3 ký tự"}
            </div>
          ) : (
            rawSuggestions.map((item) => (
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
            ))
          )}
        </Popover.Content>
      </Popover.Root>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};