import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useRegister } from "../hooks/useRegister";
import {
  Gender,
  UserRoleNumber,
  type GenderType,
  type UserRoleType,
} from "../types/auth.types";

const registerSchema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),

  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),

  fullName: yup.string().required("Vui lòng nhập họ tên"),
  role: yup
    .mixed<UserRoleType>()
    .oneOf(Object.values(UserRoleNumber))
    .required("Vui lòng chọn vai trò"),
  gender: yup.number().oneOf([0, 1, 2, 3]).required("Vui lòng chọn giới tính"),
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
  dateOfBirth: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh không hợp lệ")
    .required("Vui lòng chọn ngày tháng năm sinh"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export const RegisterForm = () => {
  const { mutate: register, isPending } = useRegister();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      role: 1,
      gender: Gender.UNSPECIFIED,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    register({
      ...data,
      gender: data.gender as GenderType,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        {...formRegister("email")}
        error={errors.email?.message}
        disabled={isPending}
      />

      <Input
        label="Mật khẩu"
        type="password"
        {...formRegister("password")}
        error={errors.password?.message}
        disabled={isPending}
      />

      <Input
        label="Họ và tên"
        {...formRegister("fullName")}
        error={errors.fullName?.message}
        disabled={isPending}
      />

      {/* Role Select */}
      <select {...formRegister("role", { valueAsNumber: true })}>
        <option value={UserRoleNumber.CANDIDATE}>Ứng viên</option>
        <option value={UserRoleNumber.RECRUITER}>Nhà tuyển dụng</option>
        <option value={UserRoleNumber.ADMIN}>Quản trị viên</option>
      </select>

      {/* Gender Select */}
      <select {...formRegister("gender", { valueAsNumber: true })}>
        <option value={0}>Không xác định</option>
        <option value={1}>Nam</option>
        <option value={2}>Nữ</option>
        <option value={3}>Khác</option>
      </select>

      <Input
        label="Số điện thoại"
        {...formRegister("phoneNumber")}
        error={errors.phoneNumber?.message}
        disabled={isPending}
      />

      <Input
        label="Ngày sinh"
        type="date"
        {...formRegister("dateOfBirth")}
        error={errors.dateOfBirth?.message}
        disabled={isPending}
      />

      <Button type="submit" isLoading={isPending} fullWidth>
        Đăng ký
      </Button>
    </form>
  );
};
