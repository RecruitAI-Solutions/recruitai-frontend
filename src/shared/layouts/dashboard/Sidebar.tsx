import type { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavConfig } from "@/shared/types/NavConfig";
import { usePermission } from "@/lib/usePermission";

type SidebarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navConfig: NavConfig;
};

export const Sidebar = ({ open, setOpen, navConfig }: SidebarProps) => {
  const location = useLocation();
  const { canAny } = usePermission();

  const accentColors = {
    green: {
      dot: "bg-green-500",
      active: "bg-green-50 text-green-700",
    },
    purple: {
      dot: "bg-purple-500",
      active: "bg-purple-50 text-purple-700",
    },
  };

  const colors = accentColors[navConfig.accentColor];

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed flex flex-col h-screen z-50 top-0 left-0 w-64 bg-white border-r transition-transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b">
          <h2 className="font-bold text-[var(--color-primary)]">RecruitAI</h2>

          {/* Role Badge */}
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
            <p className="text-xs text-gray-500">{navConfig.roleDisplay}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 text-sm flex-1 overflow-y-auto">
          {navConfig.navItems.map((item) => {
            // Check permission before rendering

            if (item.permissions && !canAny(item.permissions)) return null;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition",
                    isActive
                      ? colors.active
                      : "hover:bg-gray-100 text-gray-700",
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
