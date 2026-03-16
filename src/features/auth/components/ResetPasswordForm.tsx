import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useResetPassword } from "../hooks/useResetPassword";
import { useSearchParams } from "react-router-dom";

const schema = yup.object({
  newPassword: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

type ResetPasswordFormData = yup.InferType<typeof schema>;

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    // Get email and token from URL
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      alert("Invalid reset link");
      return;
    }

    resetPassword({
      email,
      token,
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Mật khẩu mới"
        type="password"
        placeholder="••••••••"
        {...register("newPassword")}
        error={errors.newPassword?.message}
        disabled={isPending}
      />

      <Input
        label="Xác nhận mật khẩu mới"
        type="password"
        placeholder="••••••••"
        {...register("confirmNewPassword")}
        error={errors.confirmNewPassword?.message}
        disabled={isPending}
      />

      <Button type="submit" isLoading={isPending} fullWidth>
        Đặt lại mật khẩu
      </Button>
    </form>
  );
};
