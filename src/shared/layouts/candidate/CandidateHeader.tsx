import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../Container";
import { usePermission } from "@/lib/usePermission";
import { PERMISSIONS } from "@/config/permissions.constants";
import { UserMenu } from "@/shared/components/ui/UserMenu";

export const CandidateHeader = () => {
  const [open, setOpen] = useState(false);
  const { can } = usePermission();

  return (
    <header className="bg-surface border-b border-text-secondary">
      <Container>
        <div className="flex items-center justify-between h-16">
          <span className="font-bold text-primary">RecruitAI</span>

          {/* Desktop */}
          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/candidate/dashboard">Dashboard</Link>
            <Link to="/jobs">Jobs</Link>
            {can(PERMISSIONS.VIEW_OWN_CVS) && (
              <Link to="/candidate/cv">My CV</Link>
            )}
            {can(PERMISSIONS.VIEW_APPLICATIONS) && (
              <Link to="/candidate/applications">Applications</Link>
            )}
            <UserMenu />
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Link to="/candidate/dashboard">Dashboard</Link>
            <Link to="/jobs">Jobs</Link>

            {can(PERMISSIONS.VIEW_OWN_CVS) && (
              <Link to="/candidate/cv">My CV</Link>
            )}
            {can(PERMISSIONS.VIEW_APPLICATIONS) && (
              <Link to="/candidate/applications">Applications</Link>
            )}
            <UserMenu />
          </div>
        )}
      </Container>
    </header>
  );
};
