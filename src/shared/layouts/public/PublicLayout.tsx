import { Outlet } from "react-router-dom";
import { PublicHeader } from "./PublicHeader";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <PublicHeader />

      <main className="py-8">
        <Outlet />
      </main>
    </div>
  );
};
