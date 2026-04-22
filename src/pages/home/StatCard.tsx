import { Card } from "antd";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number;
  color?: "primary" | "success" | "warning" | "error";
  icon?: ReactNode;
  className?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
};

const COLOR_MAP = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

const BG_COLOR_MAP = {
  primary: "bg-primary/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
  error: "bg-error/10",
};

export const StatCard = ({
  label,
  value,
  color = "primary",
  icon,
  className,
  trend,
}: Props) => {
  return (
    <Card
      className={cn(
        "rounded-xl border border-border bg-surface hover:shadow-md transition-all duration-200 text-center",
        className
      )}
      styles={{ body: { padding: "16px" } }}
    >
      {icon && (
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3",
            BG_COLOR_MAP[color]
          )}
        >
          {icon}
        </div>
      )}

      <p className={cn("text-2xl font-bold", COLOR_MAP[color])}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>

      <p className="text-sm text-text-secondary mt-1">{label}</p>

      {trend && (
        <div className="flex items-center justify-center gap-1 mt-2">
          <span
            className={cn(
              "text-xs font-medium",
              trend.isUp ? "text-success" : "text-error"
            )}
          >
            {trend.isUp ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-text-secondary">so với tuần trước</span>
        </div>
      )}
    </Card>
  );
};