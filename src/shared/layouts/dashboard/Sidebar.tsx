import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import type { NavConfig } from "@/shared/types/NavConfig";
import { SidebarNav } from "@/shared/components/navigation/SidebarNav";
import { UserMenu } from "@/shared/components/ui/UserMenu";

type SidebarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  navConfig: NavConfig;
};

const accentColors = {
  green: { dot: "bg-green-500", label: "text-green-600" },
  purple: { dot: "bg-purple-500", label: "text-purple-600" },
};

export const Sidebar = ({ open, setOpen, navConfig }: SidebarProps) => {
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
          "fixed flex flex-col h-screen z-50 top-0 left-0 w-64 bg-white border-r border-border transition-transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo + Role Badge */}
        <div className="px-6 py-4 border-b border-border shrink-0">
          <h2 className="font-bold text-primary">JobPortal</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <div className={cn("w-2 h-2 rounded-full", colors.dot)} />
            <p className="text-sm text-gray-500">{navConfig.roleDisplay}</p>
          </div>
        </div>

        {/* Navigation — đọc từ NAV_CONFIG qua SidebarNav */}
        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>

        {/* Access Level (admin) */}
        {navConfig.role === "admin" && (
          <div className="px-4 py-3 border-t border-border">
            <p className="text-xs font-semibold text-gray-400 mb-1">
              Access Level
            </p>
            <p className={cn("text-sm font-semibold", colors.label)}>
              Full Administrator
            </p>
            <div className="mt-1.5 h-1.5 rounded-full bg-purple-200">
              <div className="h-full w-full rounded-full bg-purple-500" />
            </div>
          </div>
        )}

        {/* User Menu */}
        <div className="px-4 py-4 border-t border-border shrink-0">
          <UserMenu />
        </div>
      </aside>
    </>
  );
};
