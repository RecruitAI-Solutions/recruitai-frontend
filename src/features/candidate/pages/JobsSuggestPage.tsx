import { useParams } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Pagination } from "@/shared/components/ui/Pagination";
import { JobSkeleton } from "@/features/jobs/components/JobSkeleton";
import { Select } from "@/shared/components/ui/Select";
import { useGetCV } from "../hooks/useGetCV";
import { useMatchingJobsForCV } from "@/features/ai/hooks/useMatchingJobsForCV";
import { MatchedJobCard } from "@/features/jobs/components/MatchedJobCard";
import { useState } from "react";

// Định nghĩa type cho filter
type SuggestFilter = {
  page: number;
  pageSize: number;
  minMatch: number;
  minMatchSkills: number;  // THÊM MỚI
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export const JobSuggestPage = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const { data: cv } = useGetCV(cvId || "");

  // State riêng cho page này
  const [filter, setFilter] = useState<SuggestFilter>({
    page: 1,
    pageSize: 9,
    minMatch: 0,
    minMatchSkills: 0,
    sortBy: "matchPercentage",
    sortOrder: "desc",
  });

  const updateFilter = (updates: Partial<SuggestFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }));
  };

  const params = {
    page: filter.page,
    pageSize: filter.pageSize,
    minMatch: filter.minMatch,
    minMatchSkills: filter.minMatchSkills,
    sortBy: filter.sortBy,
    sortOrder: filter.sortOrder,
  };

  const { data, isLoading } = useMatchingJobsForCV(cvId!, params);

  const handlePageChange = (page: number) => {
    updateFilter({ page });
  };

  return (
    <Section>
      <Container>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Đề xuất việc làm phù hợp</h1>
          {cv && (
            <p className="text-text-secondary mt-1">
              Dựa trên phân tích AI từ "{cv.fileName}"
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {/* <Select
            value={String(filter.minMatch)}
            onChange={(e) => updateFilter({ minMatch: Number(e.target.value), page: 1 })}
            options={[
              { value: "0", label: "Tất cả %" },
              { value: "50", label: "≥ 50%" },
              { value: "70", label: "≥ 70%" },
              { value: "90", label: "≥ 90%" },
            ]}
          /> */}

          {/* THÊM SELECT MỚI - Lọc theo số kỹ năng phù hợp */}
          <Select
            value={String(filter.minMatchSkills)}
            onChange={(e) => updateFilter({ minMatchSkills: Number(e.target.value), page: 1 })}
            options={[
              { value: "0", label: "Tất cả kỹ năng" },
              { value: "1", label: "≥ 1 kỹ năng" },
              { value: "2", label: "≥ 2 kỹ năng" },
              { value: "3", label: "≥ 3 kỹ năng" },
              { value: "4", label: "≥ 4 kỹ năng" },
              { value: "5", label: "≥ 5 kỹ năng" },
            ]}
          />
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
                <MatchedJobCard
                  key={job.id}
                  job={{
                    id: job.id,
                    title: job.title,
                    companyName: job.companyName,
                    location: job.location,
                    salaryDisplay: job.salaryDisplay,
                    employmentType: job.employmentType,
                    experienceLevel: job.experienceLevel,
                    matchPercentage: job.matchPercentage,
                    matchedSkills: job.matchedSkills,
                    missingSkills: job.missingSkills,
                    views: job.views,
                    applications: job.applications,
                    createdAt: job.createdAt,
                  }}
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