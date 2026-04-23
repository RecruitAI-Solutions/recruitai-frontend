import { useState, useMemo, useCallback } from "react";
import { PROVINCES } from "../constants/province.constants";

type Props = {
  value?: string | null; // 👉 giờ là name
  onChange?: (name: string | null) => void;
};

export const useProvinceSelect = ({ value, onChange }: Props = {}) => {
  const [selectedName, setSelectedName] = useState<string | null>(
    value ?? null,
  );

  // tìm object (optional)
  const selectedProvince = useMemo(() => {
    return PROVINCES.find((p) => p.name === selectedName) || null;
  }, [selectedName]);

  const handleChange = useCallback(
    (name: string) => {
      setSelectedName(name);
      onChange?.(name); // 🔥 trả về name
    },
    [onChange],
  );

  const clear = useCallback(() => {
    setSelectedName(null);
    onChange?.(null);
  }, [onChange]);

  return {
    provinces: PROVINCES,
    selectedName,
    selectedProvince,
    handleChange,
    clear,
  };
};
