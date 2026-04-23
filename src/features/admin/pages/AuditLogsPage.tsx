// src/features/admin/pages/AuditLogsPage.tsx
import { useState, useCallback, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input, Select, DatePicker, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useAuditLogs } from "../hooks/useAuditLogs";
import { AuditLogTable } from "../components/AuditLogTable";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import type { AuditLog, AuditLogsParams } from "../types/admin.types";
import {
  AUDIT_ENTITY_TYPE_LABEL,
  AUDIT_ACTION_LABEL,
} from "../types/admin.types";
import { useDebounce } from "@/lib/useDebounce";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const DEFAULT_FILTERS: AuditLogsParams = {
  page: 1,
  pageSize: 20,
  sortBy: "changedAt",
  sortOrder: "desc",
};

export const AuditLogsPage = () => {
  const [filter, setFilter] = useState<AuditLogsParams>(DEFAULT_FILTERS);
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const { data, isLoading, refetch } = useAuditLogs(filter);

  useEffect(() => {
    const nextKeyword = debouncedKeyword || undefined;
    if (nextKeyword !== filter.keyword) {
      setFilter((prev) => ({
        ...prev,
        keyword: nextKeyword,
        page: 1,
      }));
    }
  }, [debouncedKeyword, filter.keyword]);

  const updateFilter = useCallback((newValues: Partial<AuditLogsParams>) => {
    setFilter((prev) => ({ ...prev, ...newValues }));
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AuditLog> | SorterResult<AuditLog>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;

    const newFilter: Partial<AuditLogsParams> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 20,
      sortBy: s.field ? (s.field as "changedAt") : undefined,
      sortOrder: s.order === "ascend" ? "asc" : "desc",
    };

    if (filters.entityType?.length) {
      newFilter.entityType = filters.entityType[0] as string;
    }
    if (filters.action?.length) {
      newFilter.action = filters.action[0] as string;
    }

    updateFilter(newFilter);
  };

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    updateFilter({
      fromDate: dates?.[0]?.toISOString(),
      toDate: dates?.[1]?.toISOString(),
    });
  };

  return (
    <Section>
      <Container size="full">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Lịch sử hoạt động
        </h1>
        <div className="flex flex-wrap gap-4 mb-4 items-end">
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            allowClear
          />
          <RangePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            onChange={handleDateRangeChange}
            placeholder={["Từ ngày", "Đến ngày"]}
          />
          <Select
            placeholder="Loại đối tượng"
            allowClear
            style={{ width: 180 }}
            onChange={(value) => updateFilter({ entityType: value })}
            options={Object.entries(AUDIT_ENTITY_TYPE_LABEL).map(
              ([value, label]) => ({ value, label }),
            )}
          />
          <Select
            placeholder="Hành động"
            allowClear
            style={{ width: 180 }}
            onChange={(value) => updateFilter({ action: value })}
            options={Object.entries(AUDIT_ACTION_LABEL).map(
              ([value, label]) => ({ value, label }),
            )}
          />
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Làm mới
          </Button>
        </div>
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <AuditLogTable
            logs={data?.data || []}
            loading={isLoading}
            pagination={{
              current: filter.page || 1,
              pageSize: filter.pageSize || 20,
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
