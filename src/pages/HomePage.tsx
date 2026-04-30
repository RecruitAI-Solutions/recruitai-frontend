import { HeroByRole } from "./home/HeroByRole";
import { FeaturedJobs } from "@/features/jobs/components/FeaturedJobs";

export default function HomePage() {
  return (
    <>
      <h1>HELLO</h1>
      <HeroByRole />

      <FeaturedJobs />
    </>
  );
}
