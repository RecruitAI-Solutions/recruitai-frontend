// src/features/admin/pages/SkillsManagementPage.tsx
import { useState, useCallback, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input, Button, Modal, Form, Switch } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useAdminSkills,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
} from "../hooks/useAdminSkills";
import { SkillTable } from "../components/SkillTable";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import type { Skill, SkillsParams } from "../types/admin.types";
import { useDebounce } from "@/lib/useDebounce";

const DEFAULT_FILTERS: SkillsParams = {
  page: 1,
  pageSize: 10,
  sortBy: "name",
  sortOrder: "asc",
};

export const SkillsManagementPage = () => {
  const [filter, setFilter] = useState<SkillsParams>(DEFAULT_FILTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data, isLoading, refetch } = useAdminSkills(filter);
  const { mutate: createSkill } = useCreateSkill();
  const { mutate: updateSkill } = useUpdateSkill();
  const { mutate: deleteSkill } = useDeleteSkill();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const nextKeyword = debouncedSearch || undefined;
    if (nextKeyword !== filter.keyword) {
      setFilter((prev) => ({
        ...prev,
        keyword: nextKeyword,
        page: 1,
      }));
    }
  }, [debouncedSearch, filter.keyword]);

  const updateFilter = useCallback((newValues: Partial<SkillsParams>) => {
    setFilter((prev) => ({ ...prev, ...newValues }));
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Skill> | SorterResult<Skill>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;

    const newFilter: Partial<SkillsParams> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      sortBy: s.field ? (s.field as "name" | "createdAt") : undefined,
      sortOrder: s.order === "ascend" ? "asc" : "desc",
    };

    if (Object.prototype.hasOwnProperty.call(filters, "category")) {
      newFilter.category = (filters.category?.[0] as string) || undefined;
    }

    if (Object.prototype.hasOwnProperty.call(filters, "isActive")) {
      newFilter.isActive =
        filters.isActive?.length === 1
          ? (filters.isActive[0] as boolean)
          : undefined;
    }

    updateFilter(newFilter);
  };

  const openCreateModal = () => {
    setEditingSkill(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    form.setFieldsValue(skill);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingSkill) {
      updateSkill(
        { id: editingSkill.id, data: values },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            refetch();
          },
        },
      );
    } else {
      createSkill(values, {
        onSuccess: () => {
          setIsModalOpen(false);
          refetch();
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteSkill(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <Section>
      <Container size="full">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-text-primary">
            Quản lý kỹ năng
          </h1>
          <div className="flex gap-2">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openCreateModal}
            >
              Thêm mới
            </Button>
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg border border-border">
          <SkillTable
            skills={data?.items || []}
            loading={isLoading}
            onEdit={openEditModal}
            onDelete={handleDelete}
            pagination={{
              current: filter.page || 1,
              pageSize: filter.pageSize || 10,
              total: data?.totalCount || 0,
              showSizeChanger: true,
            }}
            onTableChange={handleTableChange}
          />
        </div>
        <Modal
          title={editingSkill ? "Chỉnh sửa kỹ năng" : "Thêm kỹ năng mới"}
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Tên kỹ năng"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label="Danh mục"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="aliases" label="Từ đồng nghĩa">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="contextKeywords" label="Từ khóa ngữ cảnh">
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item
              name="isActive"
              label="Kích hoạt"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </Section>
  );
};
