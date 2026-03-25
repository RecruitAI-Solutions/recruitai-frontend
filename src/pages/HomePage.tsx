import { FeaturedJobs } from "@/features/jobs/components/FeaturedJobs";
import { JobCard } from "@/shared/components/ui/JobCard";
import { StatItem } from "@/shared/components/ui/StatItem";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <Section background="default" padding="xl">
        <Container className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Find Your Dream Job Today
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
            Connect with top employers and discover opportunities that match
            your skills and aspirations
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white">
              Browse Jobs →
            </button>
            <Link
              to={"/recruiter/job/create"}
              className="px-6 py-3 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)]"
            >
              Post a Job
            </Link>
          </div>

          {/* Search Bar */}
          <div className="bg-white shadow rounded-xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <input
              placeholder="Job title, keywords..."
              className="flex-1 px-4 py-2 outline-none"
            />
            <input
              placeholder="Location"
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg">
              Search
            </button>
          </div>
        </Container>
      </Section>

      {/* ================= STATS ================= */}
      <Section background="surface" padding="md">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <StatItem value="10,000+" label="Active Jobs" />
            <StatItem value="50,000+" label="Candidates" />
            <StatItem value="5,000+" label="Companies" />
            <StatItem value="95%" label="Success Rate" />
          </div>
        </Container>
      </Section>

      {/* ================= FEATURED JOBS ================= */}
      <FeaturedJobs />
    </>
  );
}
