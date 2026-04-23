import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Container } from "../Container";
import { useAuth } from "@/lib/useAuth";
import { UserMenu } from "@/shared/components/ui/UserMenu";
import { HeaderNav } from "@/shared/components/navigation/HeaderNav";

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
          <div className="md:hidden py-4 space-y-3 border-t">
            {/* <Link to="/jobs" className="block">
              Find Jobs
            </Link> */}
            <Link
              to={ROUTES.LOGIN}
              className="block px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
};
