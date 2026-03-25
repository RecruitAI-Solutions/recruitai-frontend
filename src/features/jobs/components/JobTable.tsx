import { ROUTES } from "@/config/routes.config";
import type { JobListItem } from "../types/job.types";
import { Link } from "react-router-dom";

type Props = {
  jobs: JobListItem[];
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
};

export const JobTable = ({ jobs, onDelete, isDeleting }: Props) => {
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return "Thỏa thuận";
    const fmt = (n: number) => `${(n / 1_000_000).toFixed(0)}M`;
    if (min && max) return `${fmt(min)} – ${fmt(max)} VND`;
    return "";
  };
  return (
    <table className="w-full bg-white rounded-lg shadow">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          <th className="p-4">Title</th>
          <th>Location</th>
          <th>Type</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {jobs.map((job) => (
          <tr key={job.id} className="border-t">
            <td className="p-4">{job.title}</td>
            <td>{job.location}</td>
            <td>{job.employmentType}</td>
            <td>{formatSalary(job.salaryMin, job.salaryMax)}</td>
            <td className="flex gap-2">
              <Link to={ROUTES.RECRUITER.JOB_EDIT(job.id)}>Sửa</Link>
              <button disabled={isDeleting} onClick={() => onDelete?.(job.id)}>
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
