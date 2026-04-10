import { useState, useCallback } from "react";
import { useLocationSearch } from "./useGeocoding";
import { type LocationData } from "../types/geocoding.types";

// LocationValue — kiểu dữ liệu trả lên RHF field.onChange
export type LocationValue = {
  refId: string;
  display: string;
  lat: number;
  lng: number;
};

type Props = {
  value?: LocationValue | null;
  onChange?: (data: LocationValue | null) => void;
};

export const useLocationInput = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const { data: rawSuggestions = [], isFetching } =
    useLocationSearch(inputValue);

  const showDropdown =
    rawSuggestions.length > 0 && inputValue.trim().length >= 2;

  const selectSuggestion = useCallback(
    (item: LocationData) => {
      setInputValue("");

      onChange?.({
        refId: item.refId,
        display: item.display,
        lat: item.location.lat,
        lng: item.location.lng,
      });
    },
    [onChange],
  );

  const clearSelection = useCallback(() => {
    setInputValue("");
    onChange?.(null);
  }, [onChange]);

  // ── Display logic:
  // - Nếu đã chọn địa điểm (value tồn tại) và input rỗng → hiển thị value.display
  // - Nếu đang gõ → hiển thị inputValue
  const displayValue = value && !inputValue ? value.display : inputValue;

  const hasSelection = !!value?.refId;

  return {
    displayValue,
    setInputValue,
    rawSuggestions,
    isFetching,
    showDropdown,
    hasSelection,
    selectSuggestion,
    clearSelection,
  };
};
