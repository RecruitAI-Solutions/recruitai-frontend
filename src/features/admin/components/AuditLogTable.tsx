import { Table, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type {
  AuditActionValue,
  AuditEntityTypeValue,
  AuditLog,
} from "../types/admin.types";
import {
  AUDIT_ENTITY_TYPE_LABEL,
  AUDIT_ACTION_LABEL,
} from "../types/admin.types";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";

type Props = {
  logs: AuditLog[];
  loading?: boolean;
  pagination: TablePaginationConfig;
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AuditLog> | SorterResult<AuditLog>[],
  ) => void;
};

export const AuditLogTable = ({
  logs,
  loading,
  pagination,
  onTableChange,
}: Props) => {
  const columns: ColumnsType<AuditLog> = [
    {
      title: "Thời gian",
      dataIndex: "changedAt",
      key: "changedAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: true,
      width: 180,
    },
    {
      title: "Đối tượng",
      dataIndex: "entityType",
      key: "entityType",
      filters: Object.entries(AUDIT_ENTITY_TYPE_LABEL).map(
        ([value, label]) => ({
          text: label,
          value,
        }),
      ),
      render: (type: string) =>
        AUDIT_ENTITY_TYPE_LABEL[Number(type) as AuditEntityTypeValue] || type,
      width: 150,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      filters: Object.entries(AUDIT_ACTION_LABEL).map(([value, label]) => ({
        text: label,
        value,
      })),
      render: (action: string) => {
        const act = Number(action) as AuditActionValue;
        const colorMap: Record<number, string> = {
          1: "green",
          2: "blue",
          3: "red",
          4: "cyan",
        };
        return (
          <Tag color={colorMap[act] || "default"}>
            {AUDIT_ACTION_LABEL[act] || action}
          </Tag>
        );
      },
      width: 150,
    },
    {
      title: "Tên đối tượng",
      dataIndex: "entityName",
      key: "entityName",
      ellipsis: true,
    },
    {
      title: "Người thực hiện",
      dataIndex: "changedBy",
      key: "changedBy",
      width: 200,
    },
    {
      title: "IP",
      dataIndex: "changedByIp",
      key: "changedByIp",
      width: 130,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={logs}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      onChange={onTableChange}
      scroll={{ x: "max-content" }}
      expandable={{
        expandedRowRender: (record) => (
          <div className="p-2">
            {record.oldValue && (
              <p>
                <strong>Giá trị cũ:</strong> {record.oldValue}
              </p>
            )}
            {record.newValue && (
              <p>
                <strong>Giá trị mới:</strong> {record.newValue}
              </p>
            )}
            {record.reason && (
              <p>
                <strong>Lý do:</strong> {record.reason}
              </p>
            )}
          </div>
        ),
      }}
    />
  );
};
