import { useState, useEffect, useCallback, useRef } from "react";
import { geocodingApi } from "../services/geocodingApi";

type Props = {
  value?: string | null;
  onChange?: (name: string | null) => void;
};

export const useProvinceSelect = ({ value, onChange }: Props = {}) => {
  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState<string | null>(value ?? null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchProvinces = useCallback(async (keyword: string) => {
    if (!keyword) {
      setProvinces([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await geocodingApi.getProvinces(keyword);
      setProvinces(data.map(p => ({ code: p.id, name: p.name })));
    } catch (error) {
      console.error(error);
      setProvinces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      searchProvinces(search);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [search, searchProvinces]);

  const handleChange = (name: string) => {
    setSelectedName(name);
    onChange?.(name);
    setSearch(""); // clear search khi chọn xong
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
    setSearch,
  };
};