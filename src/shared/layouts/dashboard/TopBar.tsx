import { useLocation } from "react-router-dom";
import { Container } from "../Container";
import { UserMenu } from "./UserMenu";

export const TopBar = () => {
  const location = useLocation();

  // Generate breadcrumb from path
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map(
    (segment) =>
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
  );

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
      {/* ═══ WRAP IN CONTAINER ═══ */}
      <Container className="h-full">
        <div className="flex items-center justify-between h-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">/</span>}
                <span
                  className={
                    index === breadcrumbs.length - 1
                      ? "text-gray-900 font-medium"
                      : "text-gray-600"
                  }
                >
                  {crumb}
                </span>
              </div>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Search icon */}
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>
      </Container>
    </header>
  );
};
