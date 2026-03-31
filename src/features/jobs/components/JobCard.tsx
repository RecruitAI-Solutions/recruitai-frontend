import { Link } from "react-router-dom";
import type { JobListItem } from "../types/job.types";
import { ROUTES } from "@/config/routes.config";

type Props = {
  job: JobListItem;
  onClick?: () => void;
};

export const JobCard = ({ job, onClick }: Props) => {
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Thỏa thuận";
    const fmt = (n: number) => `${(n / 1_000_000).toFixed(0)}M`;
    return `${fmt(min!)} – ${fmt(max!)} VND`;
  };
  return (
    <Link
      to={ROUTES.CANDIDATE.JOB_DETAIL(job.id)}
      onClick={onClick}
      className="
bg-surface border border-border rounded-xl p-5
        transition-all duration-200 cursor-pointer

        hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5
        active:scale-[0.98]
      "
    >
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-text-primary line-clamp-2">
          {job.title}
        </h3>
        <span className="text-sm px-2 py-1 rounded-md bg-primary/10 text-primary whitespace-nowrap">
          {job.employmentType}
        </span>
      </div>

      <p className="text-sm text-text-secondary mt-1">{job.recruiterName}</p>

      <p className="text-sm text-text-secondary mt-2">{job.location}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {job.skillNames.map((s) => (
          <span
            key={s}
            className="text-sm px-2 py-1 rounded-md bg-primary/10 text-primary"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="mt-4 font-medium text-text-primary">
        {formatSalary(job.salaryMin, job.salaryMax)}
      </p>

      <span className="text-xs text-success">85% match</span>
    </Link>
  );
};
