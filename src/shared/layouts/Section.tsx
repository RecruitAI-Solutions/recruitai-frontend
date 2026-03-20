import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "default" | "surface" | "muted" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
}

const backgrounds = {
  default: "bg-[var(--color-background)]",
  surface: "bg-[var(--color-surface)]",
  muted: "bg-gray-100",
  transparent: "bg-transparent",
};

const paddings = {
  none: "",
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16 lg:py-20",
  lg: "py-16 sm:py-20 lg:py-24",
  xl: "py-20 sm:py-24 lg:py-32",
};

export const Section = ({
  children,
  className = "",
  background = "default",
  padding = "md",
  id,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(backgrounds[background], paddings[padding], className)}
    >
      {children}
    </section>
  );
};
