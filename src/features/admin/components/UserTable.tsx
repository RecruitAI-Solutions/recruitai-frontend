import { Table, Button, Space, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import type {
  AdminUserSummary,
  UserStatusValue,
  UserRoleValue,
} from "../types/admin.types";
import {
  USER_STATUS_LABEL,
  USER_ROLE_LABEL,
  USER_STATUS,
} from "../types/admin.types";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";

type Props = {
  users: AdminUserSummary[];
  loading?: boolean;
  onDelete: (id: string) => void;
  onUpdateStatus: (user: AdminUserSummary) => void;
  onUpdateRole: (user: AdminUserSummary) => void;
  pagination: TablePaginationConfig;
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AdminUserSummary> | SorterResult<AdminUserSummary>[],
  ) => void;
};

export const UserTable = ({
  users,
  loading,
  onDelete,
  onUpdateStatus,
  onUpdateRole,
  pagination,
  onTableChange,
}: Props) => {
  const columns: ColumnsType<AdminUserSummary> = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <Link to={`/admin/users/${record.id}`}>{text}</Link>
      ),
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      filters: Object.entries(USER_ROLE_LABEL).map(([value, label]) => ({
        text: label,
        value,
      })),
      filterMultiple: false,
      render: (role: UserRoleValue) => USER_ROLE_LABEL[role],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: Object.entries(USER_STATUS_LABEL).map(([value, label]) => ({
        text: label,
        value: Number(value),
      })),
      filterMultiple: false,
      render: (status: UserStatusValue) => {
        const colorMap: Record<UserStatusValue, string> = {
          [USER_STATUS.ACTIVE]: "green",
          [USER_STATUS.INACTIVE]: "default",
          [USER_STATUS.LOCKED]: "orange",
          [USER_STATUS.PENDING_VERIFICATION]: "processing",
          [USER_STATUS.DELETED]: "red",
          [USER_STATUS.BANNED]: "red",
        };
        return <Tag color={colorMap[status]}>{USER_STATUS_LABEL[status]}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      sorter: true,
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`/admin/users/${record.id}`}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Button
            icon={<LockOutlined />}
            size="small"
            onClick={() => onUpdateStatus(record)}
          />
          <Button
            icon={<KeyOutlined />}
            size="small"
            onClick={() => onUpdateRole(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      onChange={onTableChange}
      scroll={{ x: 1200 }}
    />
  );
};
