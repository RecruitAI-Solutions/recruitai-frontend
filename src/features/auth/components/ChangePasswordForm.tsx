import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useChangePassword } from "../hooks/useChangePassword";
import { Shield, Clock, Globe, Mail, KeyRound, Eye, EyeOff } from "lucide-react";

const schema = yup.object({
  currentPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu mới"),
});

type ChangePasswordFormData = yup.InferType<typeof schema>;

export const ChangePasswordForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: changePassword, isPending } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto py-8">
      {/* Left: Form */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-primary/10 shrink-0">
            <KeyRound className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">Đổi mật khẩu</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Mật khẩu hiện tại */}
          <div className="relative">
            <Input
              label="Mật khẩu hiện tại"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("currentPassword")}
              error={errors.currentPassword?.message}
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Mật khẩu mới */}
          <div className="relative">
            <Input
              label="Mật khẩu mới"
              type={showNewPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("newPassword")}
              error={errors.newPassword?.message}
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="relative">
            <Input
              label="Xác nhận mật khẩu mới"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("confirmNewPassword")}
              error={errors.confirmNewPassword?.message}
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" isLoading={isPending} fullWidth className="!text-white">
            Cập nhật mật khẩu
          </Button>
        </form>
      </div>

      {/* Right: Security Tips */}
      <div className="space-y-6">
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary shrink-0" />
            <h3 className="font-semibold text-text-primary">Mẹo bảo mật</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-text-secondary">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="flex-1">Đổi mật khẩu định kỳ 3-6 tháng/lần</span>
            </li>
            <li className="flex gap-3 text-sm text-text-secondary">
              <Globe className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="flex-1">Không dùng chung mật khẩu với các tài khoản khác</span>
            </li>
            <li className="flex gap-3 text-sm text-text-secondary">
              <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span className="flex-1">Không chia sẻ mật khẩu qua email hoặc tin nhắn</span>
            </li>
          </ul>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
          <p className="text-sm text-text-secondary">
            <strong className="text-primary">Lưu ý:</strong> Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại trên tất cả các thiết bị.
          </p>
        </div>
      </div>
    </div>
  );
};