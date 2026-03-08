import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useRegister } from "../hooks/useRegister";
import { type RegisterCredentials } from "../services/authApi";

const registerSchema = yup.object({
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),

  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),

  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

type RegisterFormData = RegisterCredentials & {
  confirmPassword: string;
};

export const RegisterForm = () => {
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    const payload = data as Omit<RegisterFormData, "confirmPassword">;

    registerUser(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Tên đăng nhập"
        {...register("username")}
        error={errors.username?.message}
        disabled={isPending}
      />

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
        disabled={isPending}
      />

      <Input
        label="Mật khẩu"
        type="password"
        {...register("password")}
        error={errors.password?.message}
        disabled={isPending}
      />

      <Input
        label="Nhập lại mật khẩu"
        type="password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
        disabled={isPending}
      />

      <Button type="submit" isLoading={isPending} fullWidth>
        Đăng ký
      </Button>
    </form>
  );
};
