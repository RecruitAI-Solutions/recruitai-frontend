import { Table, Tag, Button, Space } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import type {
  RecruiterApplicationItem,
  ApplicationStatusValue,
} from "@/features/applications/types/application.type";
import { APPLICATION_STATUS_LABEL } from "@/features/applications/types/application.type";

type Props = {
  data: RecruiterApplicationItem[];
  loading?: boolean;
  pagination: TablePaginationConfig;
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<RecruiterApplicationItem>
      | SorterResult<RecruiterApplicationItem>[],
  ) => void;
};

export const RecruiterApplicationTable = ({
  data,
  loading,
  pagination,
  onTableChange,
}: Props) => {
  const columns: ColumnsType<RecruiterApplicationItem> = [
    {
      title: "Ứng viên",
      key: "candidate",
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.candidateName}</div>
          <div className="text-xs text-gray-500">{record.candidateEmail}</div>
        </div>
      ),
    },
    {
      title: "Công việc",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div className="text-xs text-gray-500">{record.jobLocation}</div>
        </div>
      ),
    },
    {
      title: "Match",
      dataIndex: "matchPercentage",
      key: "matchPercentage",
      sorter: true,
      render: (val: number) => (
        <Tag color={val >= 70 ? "green" : "orange"}>{val}%</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: Object.entries(APPLICATION_STATUS_LABEL).map(
        ([value, label]) => ({
          text: label,
          value: Number(value),
        }),
      ),
      filterMultiple: false,
      render: (status: ApplicationStatusValue) => {
        const colorMap: Record<number, string> = {
          1: "orange",
          2: "blue",
          3: "green",
          4: "red",
        };
        return (
          <Tag color={colorMap[status]}>{APPLICATION_STATUS_LABEL[status]}</Tag>
        );
      },
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "appliedAt",
      key: "appliedAt",
      sorter: true,
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`/recruiter/applications/${record.applicationId}`}>
            <Button icon={<EyeOutlined />} size="small" />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="applicationId"
      loading={loading}
      pagination={pagination}
      onChange={onTableChange}
      scroll={{ x: 900 }}
    />
  );
};
