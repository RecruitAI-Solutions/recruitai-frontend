import { useState, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input, Modal, Form, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useUserFilters } from "../hooks/useUserFilters";
import {
  useAdminUsers,
  useDeleteUser,
  useUpdateUserStatus,
  useUpdateUserRole,
} from "../hooks/useAdminUsers";
import { UserTable } from "../components/UserTable";
import type {
  AdminUsersParams,
  AdminUserSummary,
  UserStatusValue,
} from "../types/admin.types";
import { USER_STATUS_LABEL, USER_ROLE_LABEL } from "../types/admin.types";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import { useDebounce } from "@/lib/useDebounce";

const { Option } = Select;

export const UserManagementPage = () => {
  const { filter, updateFilter } = useUserFilters();
  const [keyword, setKeyword] = useState(filter.keyword || "");
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    updateFilter({ keyword: debouncedKeyword || undefined });
  }, [debouncedKeyword, updateFilter]);

  const { data, isLoading } = useAdminUsers(filter);
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateStatus } = useUpdateUserStatus();
  const { mutate: updateRole } = useUpdateUserRole();

  const [selectedUser, setSelectedUser] = useState<AdminUserSummary | null>(
    null,
  );
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [statusForm] = Form.useForm();
  const [roleForm] = Form.useForm();

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AdminUserSummary> | SorterResult<AdminUserSummary>[],
  ) => {
    const newFilter: Partial<AdminUsersParams> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    };

    if (!Array.isArray(sorter) && sorter.field) {
      newFilter.sortBy = sorter.field as "createdAt" | "fullName" | "email";
      newFilter.sortOrder = sorter.order === "ascend" ? "asc" : "desc";
    } else {
      newFilter.sortBy = undefined;
      newFilter.sortOrder = undefined;
    }

    if (filters.role?.[0]) newFilter.role = filters.role[0] as string;
    if (filters.status?.[0])
      newFilter.status = filters.status[0] as UserStatusValue;

    updateFilter(newFilter);
  };

  const openStatusModal = (user: AdminUserSummary) => {
    setSelectedUser(user);
    statusForm.setFieldsValue({ status: user.status });
    setIsStatusModalOpen(true);
  };

  const openRoleModal = (user: AdminUserSummary) => {
    setSelectedUser(user);
    roleForm.setFieldsValue({ role: user.role });
    setIsRoleModalOpen(true);
  };

  const handleStatusOk = async () => {
    const values = await statusForm.validateFields();
    if (selectedUser) {
      updateStatus({ id: selectedUser.id, data: { status: values.status } });
      setIsStatusModalOpen(false);
    }
  };

  const handleRoleOk = async () => {
    const values = await roleForm.validateFields();
    if (selectedUser) {
      updateRole({ id: selectedUser.id, data: { role: values.role } });
      setIsRoleModalOpen(false);
    }
  };

  return (
    <Section>
      <Container size="full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
          <Input
            placeholder="Tìm kiếm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            allowClear
          />
        </div>

        <UserTable
          users={data?.data || []}
          loading={isLoading}
          onDelete={deleteUser}
          onUpdateStatus={openStatusModal}
          onUpdateRole={openRoleModal}
          pagination={{
            current: filter.page || 1,
            pageSize: filter.pageSize || 10,
            total: data?.total || 0,
            showSizeChanger: true,
          }}
          onTableChange={handleTableChange}
        />

        {/* Modals giữ nguyên */}
        <Modal
          title="Cập nhật trạng thái"
          open={isStatusModalOpen}
          onOk={handleStatusOk}
          onCancel={() => setIsStatusModalOpen(false)}
        >
          <Form form={statusForm} layout="vertical">
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true }]}
            >
              <Select>
                {Object.entries(USER_STATUS_LABEL).map(([value, label]) => (
                  <Option key={value} value={Number(value)}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Cập nhật vai trò"
          open={isRoleModalOpen}
          onOk={handleRoleOk}
          onCancel={() => setIsRoleModalOpen(false)}
        >
          <Form form={roleForm} layout="vertical">
            <Form.Item name="role" label="Vai trò" rules={[{ required: true }]}>
              <Select>
                {Object.entries(USER_ROLE_LABEL).map(([value, label]) => (
                  <Option key={value} value={Number(value)}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </Section>
  );
};
