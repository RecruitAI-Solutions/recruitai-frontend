import { useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export const JobSearch = ({ value, onChange }: Props) => {
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => onChange(localValue), 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);
  return (
    <input
      value={value}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder="Search job..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
