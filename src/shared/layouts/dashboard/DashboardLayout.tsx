import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import type { NavConfig } from "@/shared/types/NavConfig";

interface DashboardLayoutProps {
  navConfig: NavConfig; // ← THÊM PROP
}

export const DashboardLayout = ({ navConfig }: DashboardLayoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} navConfig={navConfig} />

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile menu button */}
        <div className="md:hidden h-14 flex items-center px-4 border-b bg-white">
          <button onClick={() => setOpen(true)}>☰</button>
          <span className="ml-4 font-semibold">{navConfig.roleDisplay}</span>
        </div>

        {/* TopBar (desktop) */}
        <div className="hidden md:block">
          <TopBar />
        </div>

        {/* Content - NO Container here, pages will use it */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
