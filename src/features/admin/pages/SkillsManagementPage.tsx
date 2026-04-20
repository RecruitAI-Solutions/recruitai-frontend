import { useState, useEffect } from "react";
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
import { useAdminSkillFilters } from "../hooks/useAdminSkillFilters";

export const SkillsManagementPage = () => {
  const { filter, updateFilter } = useAdminSkillFilters();
  const [keyword, setKeyword] = useState(filter.keyword || "");
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    updateFilter({ keyword: debouncedKeyword || undefined });
  }, [debouncedKeyword, updateFilter]);

  const { data, isLoading } = useAdminSkills(filter);
  const { mutate: createSkill } = useCreateSkill();
  const { mutate: updateSkill } = useUpdateSkill();
  const { mutate: deleteSkill } = useDeleteSkill();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [form] = Form.useForm();

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Skill> | SorterResult<Skill>[],
  ) => {
    const newFilter: Partial<SkillsParams> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    };

    if (!Array.isArray(sorter) && sorter.field) {
      newFilter.sortBy = sorter.field as "name" | "createdAt";
      newFilter.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
    }

    if (filters.category?.[0])
      newFilter.category = filters.category[0] as string;
    if (filters.isActive?.[0] !== undefined)
      newFilter.isActive = filters.isActive[0] as boolean;

    updateFilter(newFilter);
  };

  const openCreateModal = () => {
    setEditingSkill(null);
    form.resetFields();
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
      updateSkill({ id: editingSkill.id, data: values });
    } else {
      createSkill(values);
    }
    setIsModalOpen(false);
  };

  return (
    <Section>
      <Container size="full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý kỹ năng</h1>
          <div className="flex gap-4">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              style={{ width: 300 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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

        <SkillTable
          skills={data?.items || []}
          loading={isLoading}
          onEdit={openEditModal}
          onDelete={deleteSkill}
          pagination={{
            current: filter.page || 1,
            pageSize: filter.pageSize || 10,
            total: data?.totalCount || 0,
            showSizeChanger: true,
          }}
          onTableChange={handleTableChange}
        />

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
