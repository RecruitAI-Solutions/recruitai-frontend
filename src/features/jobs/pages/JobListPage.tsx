import { useGetJobs } from "../hooks/useGetJobs";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { JobList } from "../components/JobList";
import { JobSkeleton } from "../components/JobSkeleton";
import { JobFilterSidebar } from "../components/JobFilterSidebar";
import { MobileFilterDrawer } from "../components/MobileFilterDrawer";
import { Pagination } from "@/shared/components/ui/Pagination";
import { useFilter } from "../hooks/useFilter";
import { Select } from "@/shared/components/ui/Select";
import { JobSearch } from "../components/JobSearch";

export const JobListPage = () => {
  const { filter, updateFilter } = useFilter();
  const { data, isLoading } = useGetJobs();

  const jobs = data?.data ?? [];
  const total = data?.total ?? 0;
  const currentPage = filter.page || 1;
  const pageSize = filter.limit || 10;
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (page: number) => {
    updateFilter({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold mb-4">Việc làm IT tại Việt Nam</h1>

        {/* Search Bar */}
        <div className="mb-4">
          <JobSearch
            value={filter.title || ""}
            onChange={(value) => updateFilter({ title: value })}
          />
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
                Hiển thị{" "}
                <span className="font-medium text-text-primary">
                  {jobs.length}
                </span>{" "}
                / {total} việc làm
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">Sắp xếp:</span>
                <Select
                  value={filter.sortBy || "createdAt"}
                  onChange={(e) => updateFilter({ sortBy: e.target.value })}
                  options={[
                    { value: "createdAt", label: "Ngày đăng" },
                    { value: "salary", label: "Mức lương" },
                    { value: "title", label: "Tên việc" },
                  ]}
                  className="text-sm"
                />
                <Select
                  value={filter.sortOrder || "desc"}
                  onChange={(e) =>
                    updateFilter({
                      sortOrder: e.target.value as "asc" | "desc",
                    })
                  }
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
              <>
                <JobList jobs={jobs} />
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};
