import { useLocation } from "react-router-dom";
import { Container } from "../Container";

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
      <Container size="full" className="h-full">
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
        </div>
      </Container>
    </header>
  );
};
