import type { NavItemProps } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export const NavItem = ({ item }: { item: NavItemProps }) => {
  return (
    <NavLink
      to={item.to}
      end
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
          "transition-all duration-400 ease-in-out",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted hover:text-primary",
        )
      }
    >
      {item.icon}
      {item.label}
    </NavLink>
  );
};
