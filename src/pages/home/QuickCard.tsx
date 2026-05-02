import { CircleArrowRightIcon } from "lucide-react";
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
        bg-surface p-5 rounded-xl border border-border
        hover:shadow-md transition-all duration-200
        flex items-center gap-6 justify-between
        ${className || ""}
      `}
    >
      <div className="flex items-center gap-6">
        <div className="shrink-0 text-primary bg-primary/10 p-3 rounded-xl">
          {icon}
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>
          {desc && <p className="text-md text-text-secondary">{desc}</p>}
        </div>
      </div>
      <CircleArrowRightIcon className="place-content-end" />
    </Link>
  );
};
