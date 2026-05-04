import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import type { NavConfig } from "@/shared/types/NavConfig";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  navConfig: NavConfig;
}

export const DashboardLayout = ({ navConfig }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar cố định bên trái */}
      <Sidebar open={open} setOpen={setOpen} navConfig={navConfig} />

      {/* Main content — đẩy sang phải bằng ml-64 trên desktop */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden h-14 flex items-center px-4 border-b bg-surface">
          <button
            onClick={() => setOpen(true)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="ml-3 font-semibold text-sm">
            {navConfig.roleDisplay}
          </span>
        </div>

        <main className="flex-1 p-4 md:p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
