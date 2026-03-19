import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Container } from "../Container";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";

/**
 * CandidateNavbar Component
 * Horizontal navbar for Candidate role
 * USES Container for responsive content width
 */

interface NavItem {
  label: string;
  path: string;
}

export const CandidateNavbar = () => {
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);

  const navItems: NavItem[] = [
    { label: "Dashboard", path: ROUTES.CANDIDATE.DASHBOARD },
    { label: "Find Jobs", path: ROUTES.CANDIDATE.JOBS },
    { label: "My CV", path: ROUTES.CANDIDATE.CV_MANAGEMENT },
    { label: "Applications", path: ROUTES.CANDIDATE.APPLICATION },
    { label: "Profile", path: ROUTES.CANDIDATE.PROFILE },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* ═══ WRAP CONTENT IN CONTAINER ═══ */}
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo + Role Badge */}
          <div className="flex items-center gap-3">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2a4389] to-[#5bc0eb] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-lg font-bold text-gray-900">JobPortal</span>
            </Link>
            <span className="px-2 py-1 bg-blue-100 text-[#2a4389] text-xs font-medium rounded-md">
              Candidate
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-[#2a4389]"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-[#2a4389] font-semibold text-sm">
                  {user?.fullName?.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-700">{user?.fullName}</span>
            </div>

            {/* Logout button placeholder */}
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};
