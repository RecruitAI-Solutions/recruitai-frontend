import { Table, Tag } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
import type {
  AdminApplicationItem,
  ApplicationStatusValue,
} from "@/features/applications/types/application.type";
import { APPLICATION_STATUS_LABEL } from "@/features/applications/types/application.type";

type Props = {
  data: AdminApplicationItem[];
  loading?: boolean;
  pagination: TablePaginationConfig;
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<AdminApplicationItem>
      | SorterResult<AdminApplicationItem>[],
  ) => void;
};

export const AdminApplicationTable = ({
  data,
  loading,
  pagination,
  onTableChange,
}: Props) => {
  const columns: ColumnsType<AdminApplicationItem> = [
    {
      title: "Ứng viên",
      key: "candidate",
      width: 250,
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.candidateName}</div>
          <div className="text-xs text-gray-500">{record.candidateEmail}</div>
          {record.candidatePhone && (
            <div className="text-xs text-gray-400">{record.candidatePhone}</div>
          )}
        </div>
      ),
    },
    {
      title: "Công việc",
      key: "job",
      width: 250,
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.jobTitle}</div>
          <div className="text-xs text-gray-500">{record.jobLocation}</div>
          <div className="text-xs text-gray-400">{record.recruiterName}</div>
        </div>
      ),
    },
    {
      title: "Match",
      dataIndex: "matchPercentage",
      key: "matchPercentage",
      width: 100,
      sorter: true,
      render: (val: number) => (
        <Tag color={val >= 70 ? "green" : val >= 50 ? "orange" : "red"}>
          {val}%
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
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
      width: 150,
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
      scroll={{ x: "max-content" }}
    />
  );
};
