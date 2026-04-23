import { Table, Tag, Button, Space, Popconfirm } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import {
  employmentTypeMap,
  type JobListItem,
} from "@/features/jobs/types/job.types";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";

type Props = {
  jobs: JobListItem[];
  loading?: boolean;
  onDelete: (id: string) => void;
  pagination: TablePaginationConfig;
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<JobListItem> | SorterResult<JobListItem>[],
  ) => void;
};

export const AdminJobTable = ({
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
        <Link to={ROUTES.JOB_DETAILS(record.id)} target="_blank">
          {text}
        </Link>
      ),
      sorter: true,
    },
    {
      title: "Nhà tuyển dụng",
      dataIndex: "recruiterName",
      key: "recruiterName",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      sorter: true,
    },
    {
      title: "Hình thức",
      dataIndex: "employmentTypeValue",
      key: "employmentType",
      filters: Object.entries(employmentTypeMap).map(([value, label]) => ({
        text: label,
        value: Number(value), // 👈 sửa thành số
      })),
      render: (_, record) => <Tag color="blue">{record.employmentType}</Tag>,
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
          <Link to={ROUTES.JOB_DETAILS(record.id)} target="_blank">
            <Button icon={<EyeOutlined />} size="small" />
          </Link>
          <Popconfirm
            title="Xóa công việc"
            onConfirm={() => onDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
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
      scroll={{ x: 1200 }}
    />
  );
};
