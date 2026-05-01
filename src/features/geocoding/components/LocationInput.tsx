import { useLocationInput } from "../hooks/useLocationInput";
import type { LocationValue } from "../hooks/useLocationInput";
import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import { useState, useCallback, useRef, useEffect } from "react";

type LocationInputProps = {
  label?: string;
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

  const [localInput, setLocalInput] = useState(displayValue);
  const debounceTimerRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalInput(displayValue);
  }, [displayValue]);

  const handleInputChange = useCallback(
    (val: string) => {
      setLocalInput(val);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (value) {
        onChange?.(null);
      }

      if (val.length >= 3) {
        debounceTimerRef.current = setTimeout(() => {
          setInputValue(val);
        }, 500);
      } else {
        setInputValue("");
      }
    },
    [setInputValue, value, onChange],
  );

  const handleSelectSuggestion = useCallback((item: any) => {
    selectSuggestion(item);
    // Focus lại input sau khi chọn
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [selectSuggestion]);

  const shouldShowDropdown = showDropdown &&
    localInput.length >= 3 &&
    (rawSuggestions.length > 0 || isFetching);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <Popover.Root open={shouldShowDropdown}>
        <Popover.Trigger asChild>
          <div
            className={cn(
              "flex items-center px-4 py-2 border rounded-lg",
              error && "border-red-500",
            )}
          >
            <input
              ref={inputRef}
              value={localInput}
              onChange={(e) => handleInputChange(e.target.value)}
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

            {isFetching && localInput.length >= 3 && (
              <span className="text-xs text-gray-400 ml-2">...</span>
            )}

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

        <Popover.Content
          className="w-[320px] bg-white border rounded shadow-md p-1 z-50"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {isFetching ? (
            <div className="px-3 py-2 text-sm text-gray-400">Đang tìm kiếm...</div>
          ) : rawSuggestions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-400">Không tìm thấy địa chỉ</div>
          ) : (
            rawSuggestions.map((item) => (
              <div
                key={item.refId}
                onClick={() => handleSelectSuggestion(item)}
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