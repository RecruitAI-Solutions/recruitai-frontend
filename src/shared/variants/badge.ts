import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-100 text-blue-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        danger: "bg-red-100 text-red-800",
        purple: "bg-purple-100 text-purple-800",
        gray: "bg-gray-100 text-gray-800",
        outline: "border border-gray-300 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type badgeVariantsProps = typeof badgeVariants;
