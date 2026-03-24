import { useAppSelector } from "@/app/hooks";
import type { PERMISSIONS } from "@/config/permissions.constants";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";

type PermissionCode = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const usePermission = () => {
  const user = useAppSelector(selectCurrentUser);

  const can = (permission: PermissionCode): boolean => {
    if (!user) return false;
    return user.permissions?.includes(permission) ?? false;
  };

  const canAny = (permissions: PermissionCode[]): boolean => {
    if (!user) return false;
    return permissions.some((p) => user.permissions?.includes(p));
  };

  const canAll = (permissions: PermissionCode[]): boolean => {
    if (!user) return false;
    return permissions.every((p) => user.permissions?.includes(p));
  };
  return { can, canAny, canAll };
};
