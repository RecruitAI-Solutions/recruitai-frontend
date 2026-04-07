import { JobCard } from "./JobCard";
import type { JobListItem } from "../types/job.types";

type Props = {
  jobs: JobListItem[];
};

export const JobList = ({ jobs }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
