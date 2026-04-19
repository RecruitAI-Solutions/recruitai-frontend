import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface QuickCardProps {
  to: string;
  icon: ReactNode;
  title: string;
  desc?: string;
  className?: string;
}

export const QuickCard = ({
  to,
  icon,
  title,
  desc,
  className,
}: QuickCardProps) => {
  return (
    <Link
      to={to}
      className={`
        bg-surface p-4 rounded-xl border
        hover:shadow-md transition-all duration-200
        flex items-start gap-4
        ${className || ""}
      `}
    >
      <div className="shrink-0 text-primary">{icon}</div>

      <div>
        <h3 className="font-medium">{title}</h3>
        {desc && <p className="text-sm text-text-secondary">{desc}</p>}
      </div>
    </Link>
  );
};
