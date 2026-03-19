import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray" | "blue" | "transparent";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  id?: string;
}

const backgrounds = {
  white: "bg-white",
  gray: "bg-gray-50",
  blue: "bg-blue-50",
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
  background = "white",
  padding = "md",
  id,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={`${backgrounds[background]} ${paddings[padding]} ${className}`}
    >
      {children}
    </section>
  );
};
