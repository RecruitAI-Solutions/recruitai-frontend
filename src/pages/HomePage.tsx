import { HeroByRole } from "./home/HeroByRole";
import { FeaturedJobs } from "@/features/jobs/components/FeaturedJobs";

export default function HomePage() {
  return (
    <>
      <HeroByRole />

      <FeaturedJobs />
    </>
  );
}
