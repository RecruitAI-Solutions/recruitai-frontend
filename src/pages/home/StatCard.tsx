import { Card } from "antd";
import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string | number;
  color?: "primary" | "success" | "warning" | "error";
  icon?: ReactNode;
  className?: string;
};

const COLOR_MAP = {
  primary: "text-primary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

export const StatCard = ({
  label,
  value,
  color = "primary",
  icon,
  className,
}: Props) => {
  return (
    <Card
      className={`rounded-xl border text-center bg-surface ${className || ""}`}
      style={{ padding: "16px" }}
    >
      {icon && (
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 text-primary">
          {icon}
        </div>
      )}

      <p className={`text-2xl font-bold ${COLOR_MAP[color]}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>

      <p className="text-sm text-text-secondary">{label}</p>
    </Card>
  );
};
