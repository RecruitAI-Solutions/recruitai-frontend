import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useLogin } from "../hooks/useLogin";
import { type LoginRequest } from "../services/authApi";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Eye, EyeOff, LogIn } from "lucide-react";

const loginSchema = yup.object({
  email: yup.string().required("Vui lòng nhập email đăng nhập"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
          <LogIn className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-text-primary">Đăng nhập</h1>
        <p className="text-text-secondary text-sm mt-1">
          Nhập thông tin đăng nhập của bạn
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Input */}
        <Input
          label="Email đăng nhập"
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          error={errors.email?.message}
          disabled={isPending}
        />

        {/* Password Input with show/hide */}
        <div className="relative">
          <Input
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
            disabled={isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-sm text-primary hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isPending}
          fullWidth
          className="!bg-primary !text-white hover:!bg-primary/90"
        >
          Đăng nhập
        </Button>

        {/* Register Link */}
        <p className="text-center text-text-secondary text-sm mt-4">
          Chưa có tài khoản?{" "}
          <Link to={ROUTES.REGISTER} className="text-primary hover:underline font-medium">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
};