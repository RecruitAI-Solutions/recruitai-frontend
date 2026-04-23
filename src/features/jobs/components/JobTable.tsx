import { Table, Button, Space, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { employmentTypeMap, type JobListItem } from "../types/job.types";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

type Props = {
  jobs: JobListItem[];
  loading?: boolean;
  onDelete?: (id: string) => void;
  pagination?: TablePaginationConfig;
  onTableChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<JobListItem> | SorterResult<JobListItem>[],
  ) => void;
};

export const JobTable = ({
  jobs,
  loading,
  onDelete,
  pagination,
  onTableChange,
}: Props) => {
  const columns: ColumnsType<JobListItem> = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          to={ROUTES.JOB_DETAILS(record.id)}
          className="font-medium hover:underline"
        >
          {text}
        </Link>
      ),
      sorter: true,
      width: "20%",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      width: "20%",
    },
    {
      title: "Hình thức",
      dataIndex: "employmentTypeValue",
      key: "employmentType",
      filters: Object.entries(employmentTypeMap).map(([value, label]) => ({
        text: label,
        value: Number(value),
      })),
      render: (_, record) => <Tag color="blue">{record.employmentType}</Tag>,
      sorter: true,
      width: "8.3%",
    },
    {
      title: "Lương",
      key: "salary",
      render: (_, record) => {
        const fmt = (n: number) => `${(n / 1_000_000).toFixed(0)}M`;
        if (record.salaryMin && record.salaryMax)
          return `${fmt(record.salaryMin)} – ${fmt(record.salaryMax)} VND`;
        return "Thỏa thuận";
      },
      sorter: true,
      width: "20%",
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => new Date(value).toLocaleDateString("vi-VN"),
      sorter: true,
      width: "20%",
    },
    {
      title: "Ứng viên",
      key: "applicants",
      render: (_, record) => (
        <Link to={ROUTES.RECRUITER.APPLICANTS(record.id)}>
          <Button icon={<UsergroupAddOutlined />} size="small">
            Xem
          </Button>
        </Link>
      ),
      width: "8.3%",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={ROUTES.RECRUITER.JOB_EDIT(record.id)}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => onDelete?.(record.id)}
          />
        </Space>
      ),
      width: "8.3%",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={jobs}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      onChange={onTableChange}
      style={{ maxWidth: "100%" }}
      scroll={{ x: true }}
    />
  );
};
