import { useGetMyJobs } from "../hooks/useGetMyJobs";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { JobTable } from "../components/JobTable";
import { useFilter } from "../hooks/useFilter";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "@/lib/useDebounce";
import { useState, useEffect } from "react";
import type {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";
import type { JobListItem } from "../types/job.types";

export const MyJobsPage = () => {
  const { filter, updateFilter } = useFilter();
  const { data, isLoading } = useGetMyJobs(filter);
  const { mutate: deleteJob } = useDeleteJob();

  const [searchTerm, setSearchTerm] = useState(filter.title || "");
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    updateFilter({ title: debouncedSearch || undefined });
  }, [debouncedSearch, updateFilter]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<JobListItem> | SorterResult<JobListItem>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;
    updateFilter({
      page: pagination.current!,
      pageSize: pagination.pageSize!,
      employmentType: filters.employmentType?.[0] as string | undefined,
      sortBy: s.field as string | undefined,
      sortOrder: s.order === "ascend" ? "asc" : "desc",
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Công việc của tôi</h1>
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <JobTable
        jobs={data?.data || []}
        loading={isLoading}
        onDelete={deleteJob}
        pagination={{
          current: filter.page || 1,
          pageSize: filter.pageSize || 6,
          total: data?.total || 0,
          onChange: (page, pageSize) => updateFilter({ page, pageSize }),
        }}
        onTableChange={handleTableChange}
      />
    </div>
  );
};
