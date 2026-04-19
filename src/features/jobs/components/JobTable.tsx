import { Table, Button, Space, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
  EditOutlined,
  DeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import type { JobListItem } from "../types/job.types";
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
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      sorter: true,
    },
    {
      title: "Hình thức",
      dataIndex: "employmentType",
      key: "employmentType",
      filters: [
        { text: "Full-time", value: "Full-time" },
        { text: "Part-time", value: "Part-time" },
        { text: "Remote", value: "Remote" },
        { text: "Hybrid", value: "Hybrid" },
        { text: "Contract", value: "Contract" },
        { text: "Internship", value: "Internship" },
      ],
      filterMultiple: false,
      render: (text) => <Tag color="blue">{text}</Tag>,
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
      scroll={{ x: 1000 }}
    />
  );
};
