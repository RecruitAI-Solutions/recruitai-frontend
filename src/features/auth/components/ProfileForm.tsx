// src/features/auth/components/ProfileForm.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "../slices/authSlice";
import { Gender } from "../types/auth.types";
import type { GenderType, UpdateProfileRequest } from "../types/auth.types";

const profileSchema = yup.object({
  fullName: yup
    .string()
    .max(100, "Họ tên không được quá 100 ký tự")
    .required("Vui lòng nhập họ tên"),
  phoneNumber: yup
    .string()
    .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ")
    .nullable()
    .default(null),
  gender: yup
    .number()
    .oneOf([0, 1, 2, 3], "Giới tính không hợp lệ")
    .nullable()
    .default(null),
  dateOfBirth: yup.string().nullable().default(null),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;

export const ProfileForm = () => {
  const user = useAppSelector(selectCurrentUser);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      gender: (user?.gender ?? Gender.UNSPECIFIED) as GenderType | undefined,
      dateOfBirth: user?.dateOfBirth?.split("T")[0] || "",
    },
  });

  // Reset form khi user thay đổi
  useEffect(() => {
    reset({
      fullName: user?.fullName || "",
      phoneNumber: user?.phoneNumber || "",
      gender: (user?.gender ?? Gender.UNSPECIFIED) as GenderType | undefined,
      dateOfBirth: user?.dateOfBirth?.split("T")[0] || "",
    });
  }, [user, reset]);

  const onSubmit = (data: ProfileFormData) => {
    const payload: UpdateProfileRequest = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber || undefined,
      gender: data.gender as GenderType | undefined,
      dateOfBirth: data.dateOfBirth || undefined,
    };
    updateProfile(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Họ và tên"
        {...register("fullName")}
        error={errors.fullName?.message}
        disabled={isPending}
      />

      <Input
        label="Số điện thoại"
        placeholder="0901234567"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
        disabled={isPending}
      />

      <div>
        <label className="block text-sm font-medium mb-1">Giới tính</label>
        <select
          {...register("gender", { valueAsNumber: true })}
          className="w-full px-4 py-2 rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          disabled={isPending}
        >
          <option value={Gender.UNSPECIFIED}>Không xác định</option>
          <option value={Gender.MALE}>Nam</option>
          <option value={Gender.FEMALE}>Nữ</option>
          <option value={Gender.OTHER}>Khác</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <Input
        label="Ngày sinh"
        type="date"
        {...register("dateOfBirth")}
        error={errors.dateOfBirth?.message}
        disabled={isPending}
        max={new Date().toISOString().split("T")[0]} // Không cho chọn ngày tương lai
      />

      <Button type="submit" isLoading={isPending} fullWidth>
        Lưu thay đổi
      </Button>
    </form>
  );
};
