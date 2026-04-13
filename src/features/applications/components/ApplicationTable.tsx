import { Link } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/shared/components/ui/Button";
import { Download } from "lucide-react";
import type { JobApplicationItem } from "../types/application.type";

type Props = { applications: JobApplicationItem[]; jobId: string };

export const ApplicationTable = ({ applications }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-sm text-text-secondary">
            <th className="pb-3">Ứng viên</th>
            <th className="pb-3">Match</th>
            <th className="pb-3">Kỹ năng</th>
            <th className="pb-3">Trạng thái</th>
            <th className="pb-3">Ngày ứng tuyển</th>
            <th className="pb-3"></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.applicationId} className="border-b">
              <td className="py-3">
                <Link
                  to={`/recruiter/applications/${app.applicationId}`}
                  className="hover:underline"
                >
                  <p className="font-medium">{app.candidateName}</p>
                  <p className="text-sm text-text-secondary">
                    {app.candidateEmail}
                  </p>
                </Link>
              </td>
              <td className="py-3">
                <span className="font-semibold text-primary">
                  {app.matchPercentage}%
                </span>
                <span className="text-xs text-text-secondary ml-1">
                  ({app.matchedSkillCount}/{app.requiredSkillCount})
                </span>
              </td>
              <td className="py-3">
                <div className="max-w-xs">
                  <p className="text-xs text-green-600 truncate">
                    {app.matchedSkills.join(", ")}
                  </p>
                  {app.missingSkills.length > 0 && (
                    <p className="text-xs text-red-600 truncate">
                      {app.missingSkills.join(", ")}
                    </p>
                  )}
                </div>
              </td>
              <td className="py-3">
                <StatusBadge status={app.status} />
              </td>
              <td className="py-3 text-sm">
                {new Date(app.appliedAt).toLocaleDateString("vi-VN")}
              </td>
              <td className="py-3">
                <a href={app.cvDownloadUrl} download>
                  <Button variant="outline">
                    <Download className="w-3 h-3" />
                  </Button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
