import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Container } from "../Container";
import { useAuth } from "@/lib/useAuth";
import { UserMenu } from "@/shared/components/ui/UserMenu";
import { HeaderNav } from "@/shared/components/navigation/HeaderNav";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { NotificationPopover } from "@/features/notifications/components/NotificationPopover";

export const AppHeader = ({
  variant = "public",
}: {
  variant?: "public" | "dashboard";
}) => {
  const [open, setOpen] = useState(false);
  const { isReady } = useAuth();

  return (
    <header className="bg-surface border-b">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-lg font-bold text-primary">
            RecruitAI
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <HeaderNav variant={variant} />
          </nav>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {isReady && <NotificationPopover />}
            {/* <Link to="/jobs">Find Jobs</Link> */}
            {isReady ? (
              <UserMenu />
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
              >
                Đăng nhập
              </Link>
            )}
          </nav>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="md:hidden py-4 border-t flex justify-end items-center gap-4">
            {isReady && (
              <div className="flex items-center h-10">
                <NotificationPopover />
              </div>
            )}

            {isReady ? (
              <div className="flex items-center h-10">
                <UserMenu />
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="flex items-center h-10 px-4 bg-primary text-primary-foreground rounded"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        )}
      </Container>
    </header>
  );
};
