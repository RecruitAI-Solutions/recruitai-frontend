import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { JobCard } from "./JobCard";
import { JobSkeleton } from "./JobSkeleton";
import { useFeatureJobs } from "../hooks/useGetFeatureJobs";

export const FeaturedJobs = () => {
  const { data, isLoading } = useFeatureJobs({});

  if (isLoading)
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobSkeleton key={i} />
        ))}
      </div>
    );

  const jobs = data?.slice(0, 6) || [];

  return (
    <Section>
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Việc làm nổi bật</h2>
          <p className="text-gray-500">Khám phá cơ hội việc làm mới nhất</p>
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
