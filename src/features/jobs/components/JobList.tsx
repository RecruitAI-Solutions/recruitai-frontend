import { JobCard } from "./JobCard";
import type { JobListItem } from "../types/job.types";

type Props = {
  jobs: JobListItem[];
};

export const JobList = ({ jobs }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
