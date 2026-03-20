import type { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { NavConfig } from "@/shared/types/NavConfig";

type SidebarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navConfig: NavConfig; // ← THÊM PROP
  userPermissions: string[]; // ← THÊM PROP
};

export const Sidebar = ({
  open,
  setOpen,
  navConfig, // ← THÊM
  userPermissions, // ← THÊM
}: SidebarProps) => {
  const location = useLocation();

  // Helper: Check permission
  const hasPermission = (requiredPerms?: string[]) => {
    if (!requiredPerms || requiredPerms.length === 0) return true;
    return requiredPerms.some((p) => userPermissions.includes(p));
  };

  // Dynamic colors based on role
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
            if (!hasPermission(item.permissions)) return null;

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
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 bg-gray-200 rounded text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Full Access Badge (Admin only) */}
        {navConfig.role === "admin" && (
          <div className="px-4 py-3 bg-purple-50 border-t border-purple-100">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="text-xs font-medium text-purple-700">
                Full Administrator
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
