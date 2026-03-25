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
      className="bg-white p-5 rounded-lg shadow hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">{job.title}</h3>
        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
          {job.employmentType}
        </span>
      </div>

      <p className="text-sm text-gray-500">{job.recruiterName}</p>

      <p className="text-sm mt-2">{job.location}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {job.skillNames.map((s) => (
          <span key={s} className="text-xs bg-gray-100 px-2 py-1 rounded">
            {s}
          </span>
        ))}
      </div>

      <p className="mt-4 font-medium">
        {formatSalary(job.salaryMin, job.salaryMax)}
      </p>
    </Link>
  );
};
