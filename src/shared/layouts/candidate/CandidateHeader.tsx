import { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../Container";

export const CandidateHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[var(--color-surface)] border-b">
      <Container>
        <div className="flex items-center justify-between h-16">
          <span className="font-bold text-[var(--color-primary)]">
            RecruitAI
          </span>

          {/* Desktop */}
          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/candidate/dashboard">Dashboard</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/candidate/cv">My CV</Link>
            <Link to="/candidate/applications">Applications</Link>
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
            <Link to="/candidate/cv">My CV</Link>
          </div>
        )}
      </Container>
    </header>
  );
};
