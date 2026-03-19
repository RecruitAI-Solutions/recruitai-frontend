import { Outlet } from "react-router-dom";
import { CandidateNavbar } from "./CandidateNavbar";

/**
 * CandidateLayout
 * Full-width horizontal navbar layout
 * Pages inside will use Container themselves
 */

export const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CandidateNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
