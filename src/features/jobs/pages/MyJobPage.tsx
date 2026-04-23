import { useState, useCallback, useEffect } from "react";
import { useGetMyJobs } from "../hooks/useGetMyJobs";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { JobTable } from "../components/JobTable";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@/lib/useDebounce";
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";
import type {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import type { JobListItem, JobFilters } from "../types/job.types";

const DEFAULT_FILTERS: JobFilters = {
  page: 1,
  pageSize: 2,
  sortBy: "createdAt",
  sortOrder: "desc",
  employmentType: [],
  experienceLevel: [],
  skills: [],
  matchAllSkills: true,
};

export const MyJobsPage = () => {
  const [filter, setFilter] = useState<JobFilters>(DEFAULT_FILTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data, isLoading } = useGetMyJobs(filter);
  const { mutate: deleteJob } = useDeleteJob();

  const updateFilter = useCallback((newValues: Partial<JobFilters>) => {
    setFilter((prev) => ({
      ...prev,
      ...newValues,
    }));
  }, []);

  useEffect(() => {
    const nextTitle = debouncedSearch || undefined;

    if (nextTitle !== filter.title) {
      updateFilter({
        title: nextTitle,
        page: 1,
      });
    }
  }, [debouncedSearch]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<JobListItem> | SorterResult<JobListItem>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;

    let sortBy: JobFilters["sortBy"] = "createdAt";

    if (s.field) {
      switch (s.field) {
        case "title":
          sortBy = "title";
          break;
        case "salary":
          sortBy = "salary";
          break;
        case "employmentType":
          sortBy = "employmentType";
          break;
        default:
          sortBy = "createdAt";
      }
    }

    updateFilter({
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 2,
      employmentType: filters.employmentType
        ? (filters.employmentType as (string | number)[]).map(Number)
        : undefined,
      sortBy,
      sortOrder: s.order === "ascend" ? "asc" : "desc",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Section>
      <Container size="full">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-text-primary">
            Công việc của tôi
          </h1>
          <div className="w-full sm:w-64">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearchChange}
              allowClear
            />
          </div>
        </div>
        <div className="w-full overflow-scroll">
          <JobTable
            jobs={data?.data || []}
            loading={isLoading}
            onDelete={deleteJob}
            pagination={{
              current: filter.page || 1,
              pageSize: filter.pageSize || 2,
              total: data?.total || 0,
            }}
            onTableChange={handleTableChange}
          />
        </div>
      </Container>
    </Section>
  );
};
