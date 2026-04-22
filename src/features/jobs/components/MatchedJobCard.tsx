// features/ai/components/MatchedJobCard.tsx
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import React from "react";

export interface MatchedJobCardProps {
    id: string;
    title: string;
    companyName: string;
    location: string;
    salaryDisplay: string;
    employmentType: string;
    experienceLevel: string;
    matchPercentage: number;
    matchedSkills: string[];
    missingSkills: string[];
    views: number;
    applications: number;
    createdAt: string;
}

export const MatchedJobCard = React.memo(({ job }: { job: MatchedJobCardProps }) => {
    const formatSalary = (salaryDisplay?: string) => {
        if (salaryDisplay) return salaryDisplay;
        return "Thỏa thuận";
    };

    return (
        <Link
            to={ROUTES.JOB_DETAILS(job.id)}
            className="
        bg-surface border border-border rounded-xl p-5
        transition-all duration-200 cursor-pointer
        hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5
        active:scale-[0.98]
        block
      "
        >
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-text-primary line-clamp-2">
                    {job.title}
                </h3>

                <span className="text-sm px-2 py-1 rounded-md bg-primary/10 text-primary whitespace-nowrap">
                    {job.employmentType || "Full-time"}
                </span>
            </div>

            <p className="text-sm text-text-secondary mt-1">{job.companyName}</p>

            <p className="text-sm text-text-secondary mt-2">
                {job.location || "Đang tải địa điểm..."}
            </p>

            {/* Kỹ năng - đồng nhất style với JobCard */}
            <div className="flex flex-wrap gap-2 mt-3">
                {(job.matchedSkills || []).slice(0, 3).map((skill) => (
                    <span
                        key={skill}
                        className="text-sm px-2 py-1 rounded-md bg-primary/10 text-primary"
                    >
                        {skill}
                    </span>
                ))}
                {(job.missingSkills || []).slice(0, 2).map((skill) => (
                    <span
                        key={skill}
                        className="text-sm px-2 py-1 rounded-md bg-gray-100 text-text-secondary line-through"
                    >
                        {skill}
                    </span>
                ))}
                {((job.matchedSkills?.length || 0) + (job.missingSkills?.length || 0)) > 5 && (
                    <span className="text-sm px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                        +{((job.matchedSkills?.length || 0) + (job.missingSkills?.length || 0)) - 5}
                    </span>
                )}
            </div>

            <div className="flex justify-between items-center mt-4">
                <p className="font-medium text-text-primary">
                    {formatSalary(job.salaryDisplay)}
                </p>
                <span className="text-xs text-success font-medium">
                    {job.matchPercentage}% phù hợp
                </span>
            </div>
        </Link>
    );
});

MatchedJobCard.displayName = "MatchedJobCard";