import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-full",
};

export const Container = ({
  children,
  size = "lg",
  className = "",
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-5 lg-px-8",
        sizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
};
