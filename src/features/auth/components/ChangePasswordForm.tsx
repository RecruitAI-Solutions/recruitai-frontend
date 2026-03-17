import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useChangePassword } from "../hooks/useChangePassword";

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
        reset(); // Clear form on success
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Mật khẩu hiện tại"
        type="password"
        placeholder="••••••••"
        {...register("currentPassword")}
        error={errors.currentPassword?.message}
        disabled={isPending}
      />

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
        Đổi mật khẩu
      </Button>
    </form>
  );
};
