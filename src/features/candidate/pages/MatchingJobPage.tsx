import { useParams } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { useMatchingJobsForCV } from "@/features/ai/hooks/useMatchingJobsForCV";
import { Pagination } from "@/shared/components/ui/Pagination";
import { JobCard } from "@/features/jobs/components/JobCard";
import { JobSkeleton } from "@/features/jobs/components/JobSkeleton";
import { Select } from "@/shared/components/ui/Select";
import { useMatchingFilter } from "@/features/ai/hooks/useMatchingFilter";
import type { JobListItem } from "@/features/jobs/types/job.types";
import { useGetCV } from "../hooks/useGetCV";
import type { MatchedJobItem } from "@/features/ai/types/ai.types";
import type {
  EmploymentTypeLabel,
  ExperienceLevelLabel,
} from "@/features/jobs/types/job.types";
import {
  EMPLOYMENT_TYPE,
  EXPERIENCE_LEVEL,
} from "@/features/jobs/types/job.types";

export const MatchingJobsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data: cv } = useGetCV(cvId || "");
  const { filter, updateFilter } = useMatchingFilter();

  const params = {
    page: filter.page || 1,
    pageSize: filter.pageSize || 10,
    minMatch: filter.minMatch || 0,
    sortBy: filter.sortBy || "matchPercentage",
    sortOrder: filter.sortOrder || "desc",
  };

  const { data, isLoading } = useMatchingJobsForCV(cvId!, params);

  const handlePageChange = (page: number) => {
    updateFilter({ page });
  };

  // Chuyển đổi MatchedJobItem sang dạng JobCard có thể dùng
  const adaptJob = (matched: MatchedJobItem): JobListItem =>
    ({
      id: matched.jobId,
      title: matched.jobTitle,
      recruiterName: matched.company,
      location: "", // API matching không trả về location
      salaryMin: null,
      salaryMax: null,

      employmentType: "Full-time" as EmploymentTypeLabel,
      employmentTypeValue: EMPLOYMENT_TYPE.FULL_TIME,
      experienceLevel: "Entry" as ExperienceLevelLabel,
      experienceLevelValue: EXPERIENCE_LEVEL.ENTRY,
      createdAt: "",
      expirationDate: "",
      isActive: true,
      skillNames: [],
      // các trường khác có thể bỏ trống
    }) as JobListItem;

  return (
    <Section>
      <Container>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Việc làm phù hợp với CV</h1>
          {cv && (
            <p className="text-text-secondary mt-1">
              Dựa trên phân tích AI từ "{cv.fileName}"
            </p>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <Select
            value={String(filter.minMatch || 0)}
            onChange={(e) => updateFilter({ minMatch: Number(e.target.value) })}
            options={[
              { value: "0", label: "Tất cả" },
              { value: "50", label: "≥ 50%" },
              { value: "70", label: "≥ 70%" },
              { value: "90", label: "≥ 90%" },
            ]}
          />
          <Select
            value={filter.sortBy || "matchPercentage"}
            onChange={(e) => updateFilter({ sortBy: e.target.value })}
            options={[
              { value: "matchPercentage", label: "Độ phù hợp" },
              { value: "createdAt", label: "Ngày đăng" },
            ]}
          />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobSkeleton key={i} />
            ))}
          </div>
        ) : data?.data.length === 0 ? (
          <p className="text-center py-16 text-text-secondary">
            Không tìm thấy việc làm phù hợp.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {data?.data.map((job) => (
                <JobCard
                  key={job.jobId}
                  job={adaptJob(job)}
                  matchPercentage={job.matchPercentage}
                />
              ))}
            </div>
            {data && data.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};
