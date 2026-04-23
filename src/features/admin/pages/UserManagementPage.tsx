// src/features/admin/pages/UserManagementPage.tsx
import { useState, useCallback, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input, Modal, Form, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
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

const DEFAULT_FILTERS: AdminUsersParams = {
  page: 1,
  pageSize: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const UserManagementPage = () => {
  const [filter, setFilter] = useState<AdminUsersParams>(DEFAULT_FILTERS);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

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

  const updateFilter = useCallback((newValues: Partial<AdminUsersParams>) => {
    setFilter((prev) => ({ ...prev, ...newValues }));
  }, []);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AdminUserSummary> | SorterResult<AdminUserSummary>[],
  ) => {
    const s = Array.isArray(sorter) ? sorter[0] : sorter;

    const newFilter: Partial<AdminUsersParams> = {
      page: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      sortBy: s.field
        ? (s.field as "createdAt" | "fullName" | "email")
        : undefined,
      sortOrder: s.order === "ascend" ? "asc" : "desc",
    };

    if (Object.prototype.hasOwnProperty.call(filters, "role")) {
      newFilter.role = (filters.role?.[0] as string) || undefined;
    }

    if (Object.prototype.hasOwnProperty.call(filters, "status")) {
      newFilter.status = filters.status?.length
        ? (Number(filters.status[0]) as UserStatusValue)
        : undefined;
    }

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
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-text-primary">
            Quản lý người dùng
          </h1>
          <div className="w-full sm:w-64">
            <Input
              placeholder="Tìm kiếm..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>
        <div className="w-full overflow-x-auto rounded-lg border border-border">
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
        </div>

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
