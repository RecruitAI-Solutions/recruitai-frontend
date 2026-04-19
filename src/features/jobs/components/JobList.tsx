import { JobCard } from "./JobCard";
import type { JobListItem } from "../types/job.types";

type Props = {
  jobs: JobListItem[];
  matchMap?: Map<string, number>;
};

export const JobList = ({ jobs, matchMap }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          matchPercentage={matchMap?.get(job.id)}
        />
      ))}
    </div>
  );
};
