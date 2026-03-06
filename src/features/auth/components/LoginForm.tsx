import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useLogin } from "../hooks/useLogin";
import { type LoginCredentials } from "../services/authApi";

const loginSchema = yup.object({
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),
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
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Info helper cho testing */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
        <p className="font-medium mb-1">Test Account:</p>
        <p>
          Username: <code className="bg-blue-100 px-1 rounded">emilys</code>
        </p>
        <p>
          Password: <code className="bg-blue-100 px-1 rounded">emilyspass</code>
        </p>
      </div>

      {/* Username Input */}
      <Input
        label="Tên đăng nhập"
        type="text"
        placeholder="emilys"
        {...register("username")}
        error={errors.username?.message}
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
      <Button type="submit" isLoading={isPending} fullWidth>
        Đăng nhập
      </Button>
    </form>
  );
};
