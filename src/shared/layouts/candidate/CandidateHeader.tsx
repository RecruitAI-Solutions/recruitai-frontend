import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Container } from "../Container";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";
import { HeaderNav } from "@/shared/components/navigation/HeaderNav";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/Avatar";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

const getInitials = (name?: string) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const CandidateHeader = () => {
  const user = useAppSelector(selectCurrentUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const avatarSrc = `${import.meta.env.VITE_API_BASE_AVATAR_URL}${user?.avatar}` || user?.avatar;

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-30">
      <Container
        size="xl"
        className="h-16 flex items-center justify-between gap-4"
      >
        {/* Logo + Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to={ROUTES.HOME} className="text-base font-bold text-primary">
            JobPortal
          </Link>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">
            Candidate
          </span>
        </div>

        {/* Center nav — dashboard-header items từ navigation.config */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {/* Dashboard-specific nav */}
          <HeaderNav variant="dashboard" />
        </nav>

        {/* Right: User info + Logout */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatarSrc} />
              <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                {getInitials(user?.fullName)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-text-primary">
              {user?.fullName}
            </span>
          </div>
          <LogoutButton variant="icon" />

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-text-secondary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </Container>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-surface py-2 px-4 space-y-1">
          <Link
            to={ROUTES.HOME}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            Trang chủ
          </Link>
          <Link
            to={ROUTES.JOB}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            Việc làm
          </Link>
          <Link
            to={ROUTES.CANDIDATE.DASHBOARD}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to={ROUTES.CANDIDATE.CV_MANAGEMENT}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            My CV
          </Link>
          <Link
            to={ROUTES.CANDIDATE.APPLICATIONS}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
          >
            Applications
          </Link>
        </div>
      )}
    </header>
  );
};
