import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { type JobListItem } from "../types/job.types";

type Props = {
  jobs: JobListItem[];
  loading?: boolean;
};

export const DashboardJobTable = ({ jobs, loading }: Props) => {
  const columns: ColumnsType<JobListItem> = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link to={ROUTES.JOB_DETAILS(record.id)} className="font-medium">
          {text}
        </Link>
      ),
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Hình thức",
      dataIndex: "employmentType",
      key: "employmentType",
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
  ];

  return (
    <Table
      columns={columns}
      dataSource={jobs}
      rowKey="id"
      loading={loading}
      pagination={false}
      showHeader={true}
      size="middle"
    />
  );
};
