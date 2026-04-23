export const StatItem = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  return (
    <div>
      <p className="text-xl sm:text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};
