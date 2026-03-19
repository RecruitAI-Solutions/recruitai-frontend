import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with proper precedence
 * Used by all Radix UI components
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  userPermissions: string[],
  requiredPermission: string,
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Check if user has any of the permissions
 */
export function hasAnyPermission(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.some((p) => userPermissions.includes(p));
}

/**
 * Check if user has all permissions
 */
export function hasAllPermissions(
  userPermissions: string[],
  requiredPermissions: string[],
): boolean {
  return requiredPermissions.every((p) => userPermissions.includes(p));
}
