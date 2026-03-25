import { useGetJobs } from "../hooks/useGetJobs";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { JobList } from "../components/JobList";
import { JobSkeleton } from "../components/JobSkeleton";
import { JobSearch } from "../components/JobSearch";
import { useState } from "react";

export const JobListPage = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetJobs({
    keyword: search,
  });

  const jobs = data?.data || [];

  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold mb-6">Jobs</h1>

        {/* SEARCH */}
        <div className="mb-6">
          <JobSearch value={search} onChange={setSearch} />
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobSkeleton key={i} />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && jobs.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>Không tìm thấy việc làm nào.</p>
          </div>
        )}

        {/* LIST */}
        {!isLoading && jobs.length > 0 && <JobList jobs={jobs} />}
      </Container>
    </Section>
  );
};
