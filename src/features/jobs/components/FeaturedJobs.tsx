import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { JobCard } from "./JobCard";
import { JobSkeleton } from "./JobSkeleton";
import { useGetFeaturedJobs } from "../hooks/useGetFeaturedJobs";

export const FeaturedJobs = () => {
  const { data, isLoading } = useGetFeaturedJobs();
  const jobs = data?.data ?? [];
  if (isLoading)
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <Section>
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Featured Jobs</h2>
          <p className="text-gray-500">Discover the latest job opportunities</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
