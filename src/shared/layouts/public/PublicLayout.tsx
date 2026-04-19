import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader variant="public" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
