// src/features/admin/pages/UserManagementPage.tsx
import { useState, useCallback, useEffect } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Input, Modal, Form, Select, Button } from "antd";
import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useAdminUsers,
  useDeleteUser,
  useUpdateUserStatus,
  useUpdateUserRole,
  useUpdateUser,
  useAdminUserDetail,
} from "../hooks/useAdminUsers";
import { UserTable } from "../components/UserTable";
import type {
  AdminUsersParams,
  AdminUserSummary,
  AdminUserUpdateRequest,
  UserStatusValue,
} from "../types/admin.types";
import { USER_STATUS_LABEL, USER_ROLE_LABEL } from "../types/admin.types";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TablePaginationConfig } from "antd/es/table";
import { useDebounce } from "@/lib/useDebounce";
import { useNavigate } from "react-router-dom";
import { useExportUsers } from "../hooks/useExportUsers";
import { ROUTES } from "@/config/routes.config";
import { EditUserModal } from "../components/EditUserModal";

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
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateStatus } = useUpdateUserStatus();
  const { mutate: updateRole } = useUpdateUserRole();
  const { mutate: exportUsers, isPending: isExporting } = useExportUsers();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<AdminUserSummary | null>(
    null,
  );
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editUserId, setEditUserId] = useState<string | null>(null);
  const { data: userDetail, isLoading: isLoadingDetail } = useAdminUserDetail(
    editUserId || "",
    !!editUserId,
  );

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

  // HANDLE EDIT USER
  const handleEditUser = (user: AdminUserSummary) => {
    setEditUserId(user.id);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (values: AdminUserUpdateRequest) => {
    if (editUserId) {
      updateUser({ id: editUserId, data: values });
      setIsEditModalOpen(false);
      setEditUserId(null);
    }
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditUserId(null);
  };

  return (
    <Section>
      <Container size="full">
        <div className="w-full overflow-x-auto p-4 rounded-lg">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-text-primary">
              Quản lý người dùng
            </h1>
            <div className="flex gap-2 items-center">
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
                onClick={() => navigate(ROUTES.RECRUITER.JOB_CREATE)}
              >
                Đăng tin
              </Button>
              <Button
                icon={<DownloadOutlined />}
                loading={isExporting}
                onClick={() =>
                  exportUsers({
                    format: "excel",
                    keyword: searchTerm || undefined,
                    role: filter.role,
                    status: filter.status,
                  })
                }
              >
                Xuất file
              </Button>
            </div>
          </div>
          <UserTable
            users={data?.data || []}
            loading={isLoading}
            onEdit={handleEditUser}
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

        <EditUserModal
          visible={isEditModalOpen}
          user={userDetail || null}
          loading={isUpdating}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
        />

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
