import { useState, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { RecruiterApplicationTable } from "../components/RecruiterApplicationTable";
import type {
  RecruiterApplicationsParams,
  RecruiterApplicationItem,
  ApplicationStatusValue,
} from "@/features/applications/types/application.type";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import { useDebounce } from "@/lib/useDebounce";
import { useRecruiterApplications } from "../hooks/useRecruiterApplications";

export const RecruiterApplicationsPage = () => {
  const [params, setParams] = useState<RecruiterApplicationsParams>({
    page: 1,
    pageSize: 10,
    sortBy: "appliedAt",
    sortOrder: "desc",
  });
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 300);

  const { data, isLoading } = useRecruiterApplications(params);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      query: debouncedSearch || undefined,
      page: 1,
    }));
  }, [debouncedSearch]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<RecruiterApplicationItem>
      | SorterResult<RecruiterApplicationItem>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;
    setParams((prev) => ({
      ...prev,
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 10,
      status: filters.status?.[0]
        ? (Number(filters.status[0]) as ApplicationStatusValue)
        : undefined,
      sortBy: (s.field as string) || "appliedAt",
      sortOrder: s.order === "ascend" ? "asc" : "desc",
    }));
  };

  return (
    <Section>
      <Container size="full">
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary">
            Tất cả đơn ứng tuyển
          </h1>
          <Input
            placeholder="Tìm kiếm ứng viên..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <RecruiterApplicationTable
            data={data?.data || []}
            loading={isLoading}
            pagination={{
              current: params.page || 1,
              pageSize: params.pageSize || 10,
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
