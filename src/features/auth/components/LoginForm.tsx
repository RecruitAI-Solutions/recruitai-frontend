import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useLogin } from "../hooks/useLogin";
import { type LoginRequest } from "../services/authApi";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";

const loginSchema = yup.object({
  email: yup.string().required("Vui lòng nhập email đăng nhập"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username Input */}
      <Input
        label="Tên đăng nhập"
        type="text"
        placeholder="emilys"
        {...register("email")}
        error={errors.email?.message}
        disabled={isPending}
      />

      {/* Password Input */}
      <Input
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        {...register("password")}
        error={errors.password?.message}
        disabled={isPending}
      />

      {/* Submit Button */}
      <Button
        className="cursor-pointer"
        type="submit"
        isLoading={isPending}
        fullWidth
      >
        Đăng nhập
      </Button>
      <Link
        to={ROUTES.FORGOT_PASSWORD}
        className="text-text-primary underline text-right"
      >
        Quên mật khẩu?
      </Link>
    </form>
  );
};
