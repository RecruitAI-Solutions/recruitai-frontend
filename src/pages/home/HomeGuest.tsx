import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Button } from "@/shared/components/ui/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { FeaturedJobs } from "@/features/jobs/components/FeaturedJobs";

export const HomeGuest = () => {
  return (
    <>
      <Section background="default" padding="xl">
        <Container className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            #1 Job Portal for Modern Professionals
          </h1>
          <p className="text-xl text-text-secondary mb-2">Your Dream Career</p>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Connect with 5,000+ verified employers. Discover roles that match
            your skills, values, and ambitions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link to={ROUTES.JOB}>
              <Button>Browse All Jobs →</Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline">Post a Job Free</Button>
            </Link>
          </div>
          <div className="bg-white shadow rounded-xl p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto">
            <input
              placeholder="Job title, keywords, company..."
              className="flex-1 px-4 py-2 outline-none"
            />
            <input
              placeholder="City, state, or remote"
              className="flex-1 px-4 py-2 outline-none"
            />
            <Button>Search Jobs</Button>
          </div>
          <p className="text-sm text-text-secondary mt-4">
            Popular: React Developer, Product Manager, UX Designer, Data
            Scientist
          </p>
        </Container>
      </Section>
      <FeaturedJobs />
    </>
  );
};
