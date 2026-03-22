import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with proper precedence
 * Used by all Radix UI components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// HELPER FORMAR FILE SIZE
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 KB";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
