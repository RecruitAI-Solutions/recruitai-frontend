import { useState, useEffect, useRef } from "react";
import { Input } from "@/shared/components/ui/Input";
import { useSuggestCompanies } from "../hooks/useSuggestCompanies";
import { useDebounce } from "@/lib/useDebounce";

type Props = {
  value?: string;
  onChange: (name: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  onCompanySelect?: (company: { name: string; id: string | null }) => void;
};

export const CompanyInput = ({
  value = "",
  onChange,
  onCompanySelect,
  label = "Tên công ty",
  error,
  disabled,
  placeholder = "Nhập tên công ty...",
}: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(inputValue, 300);
  const { data: suggestions = [] } = useSuggestCompanies(
    debouncedQuery,
    !!debouncedQuery,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (company: { id: string; name: string }) => {
    setInputValue(company.name);
    onChange(company.name);
    onCompanySelect?.(company);
    setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val);
    if (val.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const showDropdown = isOpen && suggestions.length > 0;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Input
        label={label}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => {
          if (inputValue.trim()) setIsOpen(true);
        }}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        autoComplete="off"
      />
      {showDropdown && (
        <ul className="absolute z-10 mt-1 w-full bg-surface border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((c) => (
            <li
              key={c.id}
              onClick={() => handleSelect({ id: c.id, name: c.name })}
              className="px-4 py-2 text-sm hover:bg-primary/10 cursor-pointer flex items-center gap-2"
            >
              {c.logo ? (
                <img
                  src={c.logo}
                  alt=""
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary">
                  {c.name.charAt(0).toUpperCase()}
                </span>
              )}
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
