import { Outlet } from "react-router-dom";
import { CandidateHeader } from "./CandidateHeader";

export const CandidateLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CandidateHeader />

      <main className=" py-6">
        <Outlet />
      </main>
    </div>
  );
};
