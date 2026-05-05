import { useState, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input, Button } from "antd";
import { SearchOutlined, ExportOutlined } from "@ant-design/icons";
import { useExportApplications } from "../hooks/useExportApplications";
import { AdminApplicationTable } from "../components/AdminApplicationTable";
import type {
  AdminApplicationsParams,
  AdminApplicationItem,
  ApplicationStatusValue,
} from "@/features/applications/types/application.type";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import { useDebounce } from "@/lib/useDebounce";
import { useAdminApplications } from "@/features/applications/hooks/useAdminApplications";

export const AdminApplicationsPage = () => {
  const [params, setParams] = useState<AdminApplicationsParams>({
    page: 1,
    pageSize: 10,
    sortBy: "appliedAt",
    sortOrder: "desc",
  });
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 300);

  const { data, isLoading } = useAdminApplications(params);
  const { mutate: exportApps, isPending: isExporting } =
    useExportApplications();

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
      | SorterResult<AdminApplicationItem>
      | SorterResult<AdminApplicationItem>[],
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
        <div className="mb-6 w-full flex flex-col md:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-text-primary">
            Quản lý đơn ứng tuyển
          </h1>
          <div className="flex gap-2">
            <Input
              placeholder="Tìm kiếm ứng viên, công việc..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
            <Button
              icon={<ExportOutlined />}
              loading={isExporting}
              onClick={() => exportApps({ format: "excel" })}
            >
              Xuất Excel
            </Button>
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <AdminApplicationTable
            data={data?.data || []}
            loading={isLoading}
            pagination={{
              current: params.page || 1,
              pageSize: params.pageSize || 10,
              total: data?.total || 0,
              showSizeChanger: true,
              showTotal: (total: number) => `Tổng ${total} đơn ứng tuyển`,
            }}
            onTableChange={handleTableChange}
          />
        </div>
      </Container>
    </Section>
  );
};
