import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import {
  employmentTypeMap,
  ExperienceLevelMap,
  type CreateJobRequest,
} from "../types/job.types";
import type { SelectedSkill } from "@/features/skills/types/skill.types";
import { SkillInput } from "@/features/skills/components/SkillInput";
import { LocationInput } from "@/features/geocoding/components/LocationInput";
import { CompanyInput } from "@/features/companies/components/CompanyInput";
import { TextareaField } from "@/shared/components/ui/TextAreaField";
import { useEffect, useState } from "react";
import { useFillCompanyWebsite } from "@/features/companies/hooks/useCompanyWebsite";

const schema = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề"),
  description: yup.string().required("Vui lòng nhập mô tả"),
  requirements: yup.string().required("Vui lòng nhập yêu cầu"),
  location: yup
    .object({
      refId: yup.string().required(),
      display: yup.string().required("Vui lòng chọn địa điểm"),
      lat: yup.number().required(),
      lng: yup.number().required(),
    })
    .required("Vui lòng chọn địa điểm"),
  salaryMin: yup.number().required("Vui lòng nhập lương tối thiểu").min(0),
  salaryMax: yup.number().required("Vui lòng nhập lương tối đa").min(0),
  currency: yup.number().default(1),
  employmentType: yup.number().required(),
  experienceLevel: yup.number().required(),
  department: yup.string().required("Vui lòng nhập phòng ban"),
  skillIds: yup
    .array(yup.number().required())
    .min(1, "Vui lòng chọn ít nhất 1 kỹ năng")
    .required(),
  benefits: yup.string().required("Vui lòng nhập phúc lợi"),
  expirationDate: yup.string().required("Vui lòng chọn ngày hết hạn"),
  companyName: yup.string().required("Vui lòng nhập tên công ty"),
  companyWebsite: yup.string().default(""),
});

type FormData = yup.InferType<typeof schema>;

type Props = {
  defaultValues?: Partial<FormData>;
  defaultSkills?: SelectedSkill[];
  onSubmit: (data: CreateJobRequest) => void;
  isPending: boolean;
  submitLabel: string;
};

export const JobForm = ({
  defaultValues,
  onSubmit,
  defaultSkills,
  isPending,
  submitLabel,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
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

  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );
  const { data: companyWebsite } = useFillCompanyWebsite(selectedCompanyId);

  useEffect(() => {
    if (companyWebsite) {
      setValue("companyWebsite", companyWebsite);
    }
  }, [companyWebsite, setValue]);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit((data) => {
        if (!data.location) return;
        const payload: CreateJobRequest = {
          ...data,
          location: data.location?.display,
        };

        onSubmit(payload);
      })}
    >
      <Input
        label="Tiêu đề công việc"
        {...register("title")}
        error={errors.title?.message}
        disabled={isPending}
      />

      <TextareaField
        label="Mô tả"
        rows={4}
        {...register("description")}
        error={errors.description?.message}
        disabled={isPending}
      />

      <TextareaField
        label="Yêu cầu ứng viên"
        rows={3}
        {...register("requirements")}
        error={errors.requirements?.message}
        disabled={isPending}
      />

      <Controller
        name="location"
        control={control}
        render={({ field, fieldState }) => (
          <LocationInput
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
            label="Địa điểm"
          />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Lương tối thiểu (VND)"
          type="number"
          {...register("salaryMin", {
            setValueAs: (value: string) =>
              value === "" ? undefined : Number(value),
          })}
          error={errors.salaryMin?.message}
          disabled={isPending}
        />
        <Input
          label="Lương tối đa (VND)"
          type="number"
          {...register("salaryMax", {
            setValueAs: (value: string) =>
              value === "" ? undefined : Number(value),
          })}
          error={errors.salaryMax?.message}
          disabled={isPending}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Hình thức
          </label>
          <select
            {...register("employmentType", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(employmentTypeMap).map(([value, label]) => (
              <option key={value} value={Number(value)}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Cấp độ
          </label>
          <select
            {...register("experienceLevel", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(ExperienceLevelMap).map(([value, label]) => (
              <option key={value} value={Number(value)}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Controller
        name="skillIds"
        control={control}
        render={({ field }) => (
          <SkillInput
            label="Kỹ năng yêu cầu"
            value={field.value}
            defaultSkills={defaultSkills}
            onChange={(ids) => field.onChange(ids)}
            disabled={isPending}
            error={errors.skillIds?.message}
          />
        )}
      />
      <Input
        label="Phòng ban"
        {...register("department")}
        error={errors.department?.message}
        disabled={isPending}
      />

      <TextareaField
        label="Phúc lợi"
        rows={2}
        {...register("benefits")}
        error={errors.benefits?.message}
        disabled={isPending}
      />

      <Controller
        name="companyName"
        control={control}
        render={({ field, fieldState }) => (
          <CompanyInput
            value={field.value}
            onChange={(name) => {
              field.onChange(name);
              if (!name) {
                setSelectedCompanyId(null);
                setValue("companyWebsite", "");
              }
            }}
            onCompanySelect={(company) => {
              field.onChange(company.name);
              setSelectedCompanyId(company.id);
            }}
            error={fieldState.error?.message}
            disabled={isPending}
          />
        )}
      />
      <Input
        label="Website công ty (*Optional)"
        {...register("companyWebsite")}
        error={errors.companyWebsite?.message}
        disabled={isPending}
      />

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
