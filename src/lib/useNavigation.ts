import { useAppSelector } from "@/app/hooks";
import {
  NAV_CONFIG,
  type NavGroup,
  type Role,
} from "@/config/navigation.config";
import { selectUserRole } from "@/features/auth/slices/authSlice";
import { useMemo } from "react";

export const useNavigation = (layout: NavGroup["layout"]) => {
  const role = useAppSelector(selectUserRole) || "guest";

  return useMemo(() => {
    return NAV_CONFIG.filter(
      (group) => group.layout === layout && group.roles.includes(role as Role),
    );
  }, [role, layout]);
};
