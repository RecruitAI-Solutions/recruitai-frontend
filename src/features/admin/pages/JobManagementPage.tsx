import { useState, useCallback, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAdminJobs } from "../hooks/useAdminJobs";
import { useDeleteJob } from "@/features/jobs/hooks/useDeleteJob";
import { AdminJobTable } from "../components/AdminJobTable";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import type { JobFilters, JobListItem } from "@/features/jobs/types/job.types";
import { useDebounce } from "@/lib/useDebounce";

const DEFAULT_FILTERS: JobFilters = {
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
  employmentType: [],
  experienceLevel: [],
  skills: [],
  matchAllSkills: true,
};

export const JobsManagementPage = () => {
  const [filter, setFilter] = useState<JobFilters>(DEFAULT_FILTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data, isLoading } = useAdminJobs(filter);
  const { mutate: deleteJob } = useDeleteJob();

  useEffect(() => {
    const nextTitle = debouncedSearch || undefined;
    if (nextTitle !== filter.title) {
      setFilter((prev) => ({
        ...prev,
        title: nextTitle,
        page: 1,
      }));
    }
  }, [debouncedSearch, filter.title]);

  const updateFilter = useCallback((newValues: Partial<JobFilters>) => {
    setFilter((prev) => ({ ...prev, ...newValues }));
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<JobListItem> | SorterResult<JobListItem>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;

    const newFilter: Partial<JobFilters> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      sortBy: s.field ? (s.field as string) : undefined,
      sortOrder: s.order === "ascend" ? "asc" : "desc",
    };

    if (Object.prototype.hasOwnProperty.call(filters, "employmentType")) {
      newFilter.employmentType = filters.employmentType?.length
        ? filters.employmentType.map(Number)
        : [];
    }

    updateFilter(newFilter);
  };

  return (
    <Section>
      <Container size="full">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-text-primary">
            Quản lý công việc
          </h1>
          <div className="w-full sm:w-64">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <AdminJobTable
            jobs={data?.data || []}
            loading={isLoading}
            onDelete={deleteJob}
            pagination={{
              current: filter.page || 1,
              pageSize: filter.pageSize || 10,
              total: data?.total || 0,
              showSizeChanger: true,
            }}
            onTableChange={handleTableChange}
          />
        </div>
      </Container>
    </Section>
  );
};
