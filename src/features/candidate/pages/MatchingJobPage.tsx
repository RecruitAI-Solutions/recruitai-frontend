import { useParams } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { useMatchingJobsCVHistory } from "@/features/ai/hooks/useMatchingJobsCVHistory";
import { Pagination } from "@/shared/components/ui/Pagination";
import { JobCard } from "@/features/jobs/components/JobCard";
import { JobSkeleton } from "@/features/jobs/components/JobSkeleton";
import { Select } from "@/shared/components/ui/Select";
import { useGetCV } from "../hooks/useGetCV";
import type { MatchedJobItem } from "@/features/ai/types/ai.types";
import type { JobListItem, EmploymentTypeLabel, ExperienceLevelLabel } from "@/features/jobs/types/job.types";
import { EMPLOYMENT_TYPE, EXPERIENCE_LEVEL } from "@/features/jobs/types/job.types";
import { useState } from "react";

// Định nghĩa type cho filter riêng
type HistoryFilter = {
  page: number;
  pageSize: number;
  minMatch: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export const MatchingJobsPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const navigate = useNavigate();
  const { data: cv } = useGetCV(cvId || "");

  // STATE RIÊNG - không dùng useMatchingFilter
  const [filter, setFilter] = useState<HistoryFilter>({
    page: 1,
    pageSize: 10,
    minMatch: 0,
    sortBy: "matchPercentage",
    sortOrder: "desc",
  });

  const updateFilter = (updates: Partial<HistoryFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }));
  };

  const params = {
    page: filter.page,
    pageSize: filter.pageSize,
    minMatch: filter.minMatch,
    sortBy: filter.sortBy,
    sortOrder: filter.sortOrder,
  };

  // DÙNG ĐÚNG HOOK - useMatchingJobsCVHistory
  const { data, isLoading } = useMatchingJobsCVHistory(cvId!, params);

  const handlePageChange = (page: number) => {
    setFilter(prev => ({ ...prev, page }));
  };

  // Chuyển đổi MatchedJobItem sang JobListItem
  const adaptJob = (matched: MatchedJobItem): JobListItem =>
    ({
      id: matched.jobId,
      title: matched.jobTitle,
      recruiterName: matched.company,
      location: "",
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
    }) as JobListItem;

  // Lấy data.data ra biến riêng
  const jobsData = data?.data;

  const uniqueJobs = useMemo(() => {
    if (!jobsData) return [];

    // Lọc bỏ duplicate dựa trên jobId
    const seen = new Set();
    return jobsData.filter((job) => {
      if (seen.has(job.jobId)) {
        return false;
      }
      seen.add(job.jobId);
      return true;
    });
  }, [jobsData]);

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
            value={String(filter.minMatch)}
            onChange={(e) => updateFilter({ minMatch: Number(e.target.value), page: 1 })}
            options={[
              { value: "0", label: "Tất cả" },
              { value: "50", label: "≥ 50%" },
              { value: "70", label: "≥ 70%" },
              { value: "90", label: "≥ 90%" },
            ]}
          />
          {/* <Select
            value={filter.sortBy}
            onChange={(e) => updateFilter({ sortBy: e.target.value, page: 1 })}
            options={[
              { value: "matchPercentage", label: "Độ phù hợp" },
              { value: "createdAt", label: "Ngày đăng" },
            ]}
          /> */}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobSkeleton key={i} />
            ))}
          </div>
        ) : !data?.data?.length ? (
          <p className="text-center py-16 text-text-secondary">
            Không tìm thấy việc làm phù hợp.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {data.data.map((job) => (
                <JobCard
                  key={job.jobId}
                  job={adaptJob(job)}
                  matchPercentage={job.matchPercentage}
                />
              ))}
            </div>
            {data.totalPages > 1 && (
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