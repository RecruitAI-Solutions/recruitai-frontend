import { Modal, Form, Input, Select, DatePicker } from "antd";
import type {
  AdminUserDetail,
  AdminUserUpdateRequest,
} from "../types/admin.types";
import { GENDER, GENDER_LABEL } from "../types/admin.types";
import { useEffect } from "react";
import dayjs from "dayjs";

type Props = {
  visible: boolean;
  user: AdminUserDetail | null;
  loading: boolean;
  onSubmit: (data: AdminUserUpdateRequest) => void;
  onCancel: () => void;
};

export const EditUserModal = ({
  visible,
  user,
  loading,
  onSubmit,
  onCancel,
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber || "",
        gender: user.gender ?? GENDER.UNKNOWN,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data: AdminUserUpdateRequest = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber || undefined,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth
          ? values.dateOfBirth.toISOString()
          : undefined,
      };
      onSubmit(data);
    } catch (error) {
      // validation failed, do nothing
    }
  };

  return (
    <Modal
      title="Chỉnh sửa người dùng"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="fullName"
          label="Họ tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="phoneNumber" label="Số điện thoại">
          <Input placeholder="0901234567" />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính">
          <Select
            options={Object.entries(GENDER_LABEL).map(([value, label]) => ({
              value: Number(value),
              label,
            }))}
          />
        </Form.Item>

        <Form.Item name="dateOfBirth" label="Ngày sinh">
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
