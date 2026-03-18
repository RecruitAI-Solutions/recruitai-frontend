import * as yup from "yup";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useForm } from "react-hook-form";
import type { ForgotPasswordRequest } from "../types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
const schema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
});

export const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ForgotPasswordRequest) => {
    forgotPassword(data);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Email đã được gửi!
        </h3>
        <p className="text-gray-600 text-sm">
          Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật
          khẩu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">
          Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
        </p>
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        {...register("email")}
        error={errors.email?.message}
        disabled={isPending}
      />

      <Button type="submit" isLoading={isPending} fullWidth>
        Gửi link đặt lại mật khẩu
      </Button>
    </form>
  );
};
