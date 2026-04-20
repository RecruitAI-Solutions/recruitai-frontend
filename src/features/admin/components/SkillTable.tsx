import { Table, Tag, Button, Space, Popconfirm } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Skill } from "../types/admin.types";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";

type Props = {
  skills: Skill[];
  loading?: boolean;
  onEdit: (skill: Skill) => void;
  onDelete: (id: number) => void;
  pagination: TablePaginationConfig;
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Skill> | SorterResult<Skill>[],
  ) => void;
};

export const SkillTable = ({
  skills,
  loading,
  onEdit,
  onDelete,
  pagination,
  onTableChange,
}: Props) => {
  const columns: ColumnsType<Skill> = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    {
      title: "Tên kỹ năng",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      filters: [...new Set(skills.map((s) => s.category))].map((cat) => ({
        text: cat,
        value: cat,
      })),
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      filters: [
        { text: "Hoạt động", value: true },
        { text: "Không hoạt động", value: false },
      ],
      render: (active: boolean) => (
        <Tag color={active ? "green" : "default"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
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
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => onEdit(record)}
          />
          <Popconfirm title="Xóa kỹ năng" onConfirm={() => onDelete(record.id)}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={skills}
      rowKey="id"
      loading={loading}
      pagination={pagination}
      onChange={onTableChange}
    />
  );
};
