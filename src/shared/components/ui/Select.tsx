type Option = { value: string; label: string };
type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  className?: string;
};

export const Select = ({
  value,
  onChange,
  options,
  className,
}: SelectProps) => (
  <select
    value={value}
    onChange={onChange}
    className={`border border-border text-gray-800
    shadow-sm rounded-lg px-3 py-2 bg-transparent focus:outline-none
    focus:ring-2
    focus:ring-primary
    focus:border-primary ${className}`}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
