import { useState, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input, Select, DatePicker, Button } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import { useAuditLogFilters } from "../hooks/useAuditLogFilters";
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

export const AuditLogsPage = () => {
  const { filter, updateFilter } = useAuditLogFilters();
  const [keyword, setKeyword] = useState(filter.keyword || "");
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    updateFilter({ keyword: debouncedKeyword || undefined });
  }, [updateFilter, debouncedKeyword]);

  const { data, isLoading, refetch } = useAuditLogs(filter);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AuditLog> | SorterResult<AuditLog>[],
  ) => {
    const newFilter: Partial<AuditLogsParams> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 20,
    };

    if (!Array.isArray(sorter) && sorter.field) {
      newFilter.sortBy = sorter.field as "changedAt";
      newFilter.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
    }

    if (filters.entityType?.[0])
      newFilter.entityType = filters.entityType[0] as string;
    if (filters.action?.[0]) newFilter.action = filters.action[0] as string;

    updateFilter(newFilter);
  };

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    if (!dates || !dates[0] || !dates[1]) {
      updateFilter({
        fromDate: undefined,
        toDate: undefined,
      });
      return;
    }

    updateFilter({
      fromDate: dates[0].toISOString(),
      toDate: dates[1].toISOString(),
    });
  };

  return (
    <Section>
      <Container size="full">
        <h1 className="text-2xl font-bold mb-4">Lịch sử hoạt động</h1>

        <div className="flex flex-wrap gap-4 mb-4 items-center">
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
              ([value, label]) => ({
                value,
                label,
              }),
            )}
          />
          <Select
            placeholder="Hành động"
            allowClear
            style={{ width: 180 }}
            onChange={(value) => updateFilter({ action: value })}
            options={Object.entries(AUDIT_ACTION_LABEL).map(
              ([value, label]) => ({
                value,
                label,
              }),
            )}
          />
          <Input
            placeholder="User ID"
            style={{ width: 250 }}
            onPressEnter={(e) =>
              updateFilter({ userId: e.currentTarget.value || undefined })
            }
            onBlur={(e) =>
              updateFilter({ userId: e.target.value || undefined })
            }
            allowClear
          />
          <Button icon={<ReloadOutlined />} onClick={() => refetch()}>
            Làm mới
          </Button>
        </div>

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
      </Container>
    </Section>
  );
};
