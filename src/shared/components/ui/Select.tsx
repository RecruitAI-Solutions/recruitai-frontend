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
    className={`border rounded-lg px-3 py-2 bg-transparent ${className}`}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
