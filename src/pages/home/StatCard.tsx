import type { ReactNode } from "react";

export interface StatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export const StatCard = ({ value, label, icon, className }: StatCardProps) => {
  return (
    <div
      className={`
        bg-surface rounded-lg p-4 text-center border
        ${className || ""}
      `}
    >
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary">
        {icon}
      </div>

      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-sm text-text-secondary">{label}</p>
    </div>
  );
};
