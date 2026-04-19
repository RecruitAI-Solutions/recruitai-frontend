import { Table, Tag, Button, Space, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type {
  ApplicationStatusLabel,
  ApplicationStatusValue,
  JobApplicationItem,
  JobApplicationsParams,
} from "../types/application.type";
import { StatusBadge } from "./StatusBadge";
import type { TablePaginationConfig } from "antd";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import Select from "antd/es/select";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";

const { Text } = Typography;
const { Option } = Select;

type Props = {
  applications: JobApplicationItem[];
  loading?: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  onFilterChange: (filters: Partial<JobApplicationsParams>) => void;
};

export const ApplicationTable = ({
  applications,
  loading,
  pagination,
  onFilterChange,
}: Props) => {
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();

  const handleStatusChange = (
    applicationId: string,
    statusValue: ApplicationStatusValue,
  ) => {
    updateStatus({ applicationId, data: { status: statusValue } });
  };

  const columns: ColumnsType<JobApplicationItem> = [
    {
      title: "Ứng viên",
      dataIndex: "candidateName",
      key: "candidateName",
      render: (_, record) => (
        <Link to={`/recruiter/applications/${record.applicationId}`}>
          <Text strong>{record.candidateName}</Text>
          <br />
          <Text type="secondary">{record.candidateEmail}</Text>
        </Link>
      ),
      sorter: true,
    },
    {
      title: "Match",
      key: "match",
      render: (_, record) => (
        <span>
          <Text strong>{record.matchPercentage}%</Text>
          <Text type="secondary" className="ml-1">
            ({record.matchedSkillCount}/{record.requiredSkillCount})
          </Text>
        </span>
      ),
      sorter: true,
    },
    {
      title: "Kỹ năng",
      key: "skills",
      render: (_, record) => (
        <div style={{ maxWidth: 250 }}>
          <div>
            {record.matchedSkills.slice(0, 3).map((s) => (
              <Tag color="green" key={s}>
                {s}
              </Tag>
            ))}
            {record.matchedSkills.length > 3 && (
              <Tag>+{record.matchedSkills.length - 3}</Tag>
            )}
          </div>
          {record.missingSkills.length > 0 && (
            <div className="mt-1">
              {record.missingSkills.slice(0, 3).map((s) => (
                <Tag color="red" key={s}>
                  {s}
                </Tag>
              ))}
              {record.missingSkills.length > 3 && (
                <Tag>+{record.missingSkills.length - 3}</Tag>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Chờ duyệt", value: 1 },
        { text: "Đã xem", value: 2 },
        { text: "Đạt", value: 3 },
        { text: "Từ chối", value: 4 },
      ],
      filterMultiple: false,
      render: (status: ApplicationStatusValue, record) => (
        <Space>
          <StatusBadge status={status} />
          <Select
            size="small"
            style={{ width: 120 }}
            placeholder="Cập nhật"
            value={undefined}
            onChange={(value: ApplicationStatusValue) =>
              handleStatusChange(record.applicationId, value)
            }
            disabled={isUpdating}
          >
            <Option value={1}>Chờ duyệt</Option>
            <Option value={2}>Đã xem</Option>
            <Option value={3}>Đạt</Option>
            <Option value={4}>Từ chối</Option>
          </Select>
        </Space>
      ),
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "appliedAt",
      key: "appliedAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
      sorter: true,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space>
          <a href={record.cvDownloadUrl} download>
            <Button icon={<DownloadOutlined />} size="small" />
          </a>
          <Link to={`/recruiter/applications/${record.applicationId}`}>
            <Button icon={<EyeOutlined />} size="small" />
          </Link>
        </Space>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<JobApplicationItem>
      | SorterResult<JobApplicationItem>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;
    const rawStatus = filters.status?.[0];

    onFilterChange({
      page: pagination.current,
      pageSize: pagination.pageSize,
      status:
        rawStatus !== undefined
          ? (Number(rawStatus) as ApplicationStatusValue)
          : undefined,
      sortBy: s?.field === "match" ? "matchPercentage" : "appliedAt",
      sortOrder: s?.order === "ascend" ? "asc" : "desc",
    });
  };

  return (
    <Table
      columns={columns}
      dataSource={applications}
      rowKey="applicationId"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"],
      }}
      onChange={handleTableChange}
      scroll={{ x: 1000 }}
    />
  );
};
