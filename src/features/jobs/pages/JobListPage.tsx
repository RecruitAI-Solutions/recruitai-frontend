import { useGetJobs } from "../hooks/useGetJobs";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { JobList } from "../components/JobList";
import { JobSkeleton } from "../components/JobSkeleton";
import { MobileFilterDrawer } from "../components/MobileFilterDrawer";
import { Pagination } from "@/shared/components/ui/Pagination";
import { useFilter } from "../hooks/useFilter";
import { Select } from "@/shared/components/ui/Select";
import { JobSearch } from "../components/JobSearch";
import JobFilterSidebar from "../components/JobFilterSidebar";
import { useAppSelector } from "@/app/hooks";
import { selectUserRole } from "@/features/auth/slices/authSlice";
import { useGetMyCVs } from "@/features/candidate/hooks/useGetMyCVs";
import { useMatchingJobsForCV } from "@/features/ai/hooks/useMatchingJobsForCV";
import { useMemo } from "react";
import { useCallback } from "react";

export const JobListPage = () => {
  const userRole = useAppSelector(selectUserRole);
  const isCandidate = userRole === "candidate";

  const { filter, updateFilter } = useFilter();
  const { data, isLoading, isFetching } = useGetJobs(filter);

  const { data: cvData } = useGetMyCVs({
    pageSize: 1,
    status: [3],
    sortBy: "uploadedAt",
    sortOrder: "desc",
  });
  const primaryCvId = isCandidate ? (cvData?.data[0]?.id ?? "") : "";

  const { data: matchData } = useMatchingJobsForCV(
    primaryCvId,
    { pageSize: 100 }, // lấy nhiều để cover hết jobs đang hiển thị
    isCandidate && !!primaryCvId,
  );

  const matchMap = useMemo(() => {
    if (!matchData?.data) return undefined;
    return new Map(matchData.data.map((m) => [m.jobId, m.matchPercentage]));
  }, [matchData]);

  const jobs = data?.data ?? [];
  const total = data?.total ?? 0;
  const currentPage = filter.page ?? 1;
  const totalPages = data?.totalPages ?? 0;

  // useCallback để ổn định reference — tránh trigger effect trong child components
  const handleTitleChange = useCallback(
    (value: string) => updateFilter({ title: value || undefined }),
    [updateFilter],
  );

  const handleSortByChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      updateFilter({ sortBy: e.target.value }),
    [updateFilter],
  );

  const handleSortOrderChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      updateFilter({ sortOrder: e.target.value as "asc" | "desc" }),
    [updateFilter],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateFilter({ page });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateFilter],
  );

  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold mb-4">Việc làm IT tại Việt Nam</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <JobSearch value={filter.title || ""} onChange={handleTitleChange} />
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <MobileFilterDrawer />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <JobFilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-text-secondary">
                {isFetching ? (
                  <span className="animate-pulse">Đang tải...</span>
                ) : (
                  <>
                    Hiển thị{" "}
                    <span className="font-medium text-text-primary">
                      {jobs.length}
                    </span>{" "}
                    / {total} việc làm
                  </>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Sắp xếp:</span>
                <Select
                  value={filter.sortBy || "createdAt"}
                  onChange={handleSortByChange}
                  options={[
                    { value: "createdAt", label: "Ngày đăng" },
                    { value: "salary", label: "Mức lương" },
                    { value: "title", label: "Tên việc" },
                  ]}
                  className="text-sm"
                />
                <Select
                  value={filter.sortOrder || "desc"}
                  onChange={handleSortOrderChange}
                  options={[
                    { value: "desc", label: "Giảm dần" },
                    { value: "asc", label: "Tăng dần" },
                  ]}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Job List */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobSkeleton key={i} />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 text-text-secondary">
                <p>Không tìm thấy việc làm nào phù hợp.</p>
              </div>
            ) : (
              // isFetching (load trang mới): dùng opacity thay vì pointer-events-none
              // pointer-events-none làm cursor nhấp nháy vì toggle liên tục
              <div
                className="transition-all duration-200 ease-out will-change-transform"
                style={{
                  opacity: isFetching ? 0.7 : 1,
                  transform: isFetching ? "translateY(2px)" : "translateY(0)",
                }}
              >
                <JobList jobs={jobs} matchMap={matchMap} />
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};
