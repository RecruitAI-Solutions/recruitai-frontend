import { useState, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAdminJobFilters } from "../hooks/useAdminJobFilters";
import { useAdminJobs } from "../hooks/useAdminJobs";
import { useDeleteJob } from "@/features/jobs/hooks/useDeleteJob";
import { AdminJobTable } from "../components/AdminJobTable";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import type { JobFilters, JobListItem } from "@/features/jobs/types/job.types";
import { useDebounce } from "@/lib/useDebounce";

export const JobsManagementPage = () => {
  const { filter, updateFilter } = useAdminJobFilters();
  const [keyword, setKeyword] = useState(filter.title || "");
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    updateFilter({ title: debouncedKeyword || undefined });
  }, [debouncedKeyword, updateFilter]);

  const { data, isLoading } = useAdminJobs(filter);
  const { mutate: deleteJob } = useDeleteJob();

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<JobListItem> | SorterResult<JobListItem>[],
  ) => {
    const newFilter: Partial<JobFilters> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    };

    const s = Array.isArray(sorter) ? sorter[0] : sorter;
    if (s?.field) {
      newFilter.sortBy = s.field as string;
      newFilter.sortOrder = s.order === "ascend" ? "asc" : "desc";
    }

    if (filters.employmentType?.[0]) {
      newFilter.employmentType = filters.employmentType[0] as string;
    }
    updateFilter(newFilter);
  };

  return (
    <Section>
      <Container size="full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý công việc</h1>
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            allowClear
          />
        </div>

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
      </Container>
    </Section>
  );
};
