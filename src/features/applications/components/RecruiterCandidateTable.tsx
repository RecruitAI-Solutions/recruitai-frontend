import { Table, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
import type {
  RecruiterCandidateItem,
  ApplicationStatusValue,
} from "../types/application.type";
import { APPLICATION_STATUS_LABEL } from "../types/application.type";

type Props = {
  data: RecruiterCandidateItem[];
  loading?: boolean;
  pagination: TablePaginationConfig;
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<RecruiterCandidateItem>
      | SorterResult<RecruiterCandidateItem>[],
  ) => void;
};

export const RecruiterCandidateTable = ({
  data,
  loading,
  pagination,
  onTableChange,
}: Props) => {
  const columns: ColumnsType<RecruiterCandidateItem> = [
    {
      title: "Ứng viên",
      key: "candidate",
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.candidateName}</div>
          <div className="text-xs text-gray-500">{record.candidateEmail}</div>
          {record.candidatePhone && (
            <div className="text-xs text-gray-400">{record.candidatePhone}</div>
          )}
        </div>
      ),
      sorter: true,
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
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
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
