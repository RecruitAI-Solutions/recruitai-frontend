import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import {
  employmentTypeMap,
  ExperienceLevelMap,
  type CreateJobRequest,
} from "../types/job.types";

const schema = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề"),
  description: yup.string().required("Vui lòng nhập mô tả"),
  requirements: yup.string().required("Vui lòng nhập yêu cầu"),
  location: yup.string().required("Vui lòng nhập địa điểm"),
  salaryMin: yup.number().required("Vui lòng nhập lương tối thiểu").min(0),
  salaryMax: yup.number().required("Vui lòng nhập lương tối đa").min(0),
  currency: yup.number().default(1),
  employmentType: yup.number().required(),
  experienceLevel: yup.number().required(),
  department: yup.string().default(""),
  skillIds: yup.array(yup.number().required()).default([]),
  benefits: yup.string().default(""),
  expirationDate: yup.string().required("Vui lòng chọn ngày hết hạn"),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  defaultValues?: Partial<FormData>;
  onSubmit: (data: CreateJobRequest) => void;
  isPending: boolean;
  submitLabel: string;
};

export const JobForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      currency: 1,
      employmentType: 1,
      experienceLevel: 1,
      skillIds: [],
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Tiêu đề công việc"
        {...register("title")}
        error={errors.title?.message}
        disabled={isPending}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả
        </label>
        <textarea
          rows={4}
          {...register("description")}
          disabled={isPending}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:bg-gray-100 border-gray-300 resize-none"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Yêu cầu ứng viên
        </label>
        <textarea
          rows={3}
          {...register("requirements")}
          disabled={isPending}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:bg-gray-100 border-gray-300 resize-none"
        />
      </div>

      <Input
        label="Địa điểm"
        {...register("location")}
        error={errors.location?.message}
        disabled={isPending}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Lương tối thiểu (VND)"
          type="number"
          {...register("salaryMin", { valueAsNumber: true })}
          error={errors.salaryMin?.message}
          disabled={isPending}
        />
        <Input
          label="Lương tối đa (VND)"
          type="number"
          {...register("salaryMax", { valueAsNumber: true })}
          error={errors.salaryMax?.message}
          disabled={isPending}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hình thức
          </label>
          <select
            {...register("employmentType", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(employmentTypeMap).map(([value, label]) => (
              <option key={value} value={Number(value)}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cấp độ
          </label>
          <select
            {...register("experienceLevel", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(ExperienceLevelMap).map(([value, label]) => (
              <option key={value} value={Number(value)}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Phòng ban"
        {...register("department")}
        disabled={isPending}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phúc lợi
        </label>
        <textarea
          rows={2}
          {...register("benefits")}
          disabled={isPending}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:bg-gray-100 border-gray-300 resize-none"
        />
      </div>

      <Input
        label="Ngày hết hạn"
        type="datetime-local"
        {...register("expirationDate")}
        error={errors.expirationDate?.message}
        disabled={isPending}
      />

      <Button type="submit" isLoading={isPending} fullWidth>
        {submitLabel}
      </Button>
    </form>
  );
};
