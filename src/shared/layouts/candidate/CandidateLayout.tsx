import { Outlet } from "react-router-dom";
import { CandidateHeader } from "./CandidateHeader";

export const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <CandidateHeader />

      <main className=" py-6">
        <Outlet />
      </main>
    </div>
  );
};
