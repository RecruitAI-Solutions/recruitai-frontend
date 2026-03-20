import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const itemVariants = cva(
  "flex items-center px-3 py-2 rounded-lg cursor-pointer transition",
  {
    variants: {
      active: {
        true: "bg-[var(--color-primary)] text-white",
        false: "hover:bg-gray-100 text-gray-700",
      },
    },
  },
);

export const SidebarItem = ({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) => {
  return <div className={cn(itemVariants({ active }))}>{label}</div>;
};
