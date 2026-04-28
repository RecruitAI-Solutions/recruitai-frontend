import { useState, useCallback, useRef } from "react";
import { geocodingApi } from "../services/geocodingApi";

type Props = {
  value?: string | null;
  onChange?: (name: string | null) => void;
};

export const useProvinceSelect = ({ value, onChange }: Props = {}) => {
  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState<string | null>(
    value ?? null,
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Không set loading = true ngay lập tức, để tránh re-render đột ngột
  const handleSearchChange = useCallback((newSearch: string) => {
    setSearch(newSearch);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!newSearch) {
      setProvinces([]);
      return;
    }

    // Delay 300ms mới gọi API
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await geocodingApi.getProvinces(newSearch);
        setProvinces(data.map((p) => ({ code: p.id, name: p.name })));
      } catch (error) {
        console.error(error);
        setProvinces([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const handleChange = (name: string) => {
    setSelectedName(name);
    onChange?.(name);
    setSearch("");
    setProvinces([]);
  };

  const clear = () => {
    setSelectedName(null);
    onChange?.(null);
    setSearch("");
    setProvinces([]);
  };

  return {
    provinces,
    loading,
    selectedName,
    handleChange,
    clear,
    search,
    setSearch: handleSearchChange,
  };
};

