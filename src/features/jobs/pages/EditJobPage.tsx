import { useParams, Navigate } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { JobForm } from "../components/JobForm";
import { useGetJob } from "../hooks/useGetJob";
import { useUpdateJob } from "../hooks/useUpdateJob";
import { ROUTES } from "@/config/routes.config";
import {
  EMPLOYMENT_TYPE_TO_VALUE,
  EXPERIENCE_LEVEL_TO_VALUE,
} from "../types/job.types";

export const EditJobPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: job, isLoading } = useGetJob(id ?? "");
  const { mutate: updateJob, isPending } = useUpdateJob(id ?? "");

  if (!id) return <Navigate to={ROUTES.RECRUITER.JOBS} replace />;

  if (isLoading)
    return (
      <Container className="py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-background rounded-xl border p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg h-10 animate-pulse"
              />
            ))}
          </div>
        </div>
      </Container>
    );

  if (!job) return <Navigate to={ROUTES.RECRUITER.JOBS} replace />;

  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Chỉnh sửa: {job.title}
        </h1>
        <div className="bg-white rounded-xl border p-6">
          <JobForm
            isPending={isPending}
            submitLabel="Lưu thay đổi"
            defaultValues={{
              title: job.title,
              description: job.description,
              requirements: job.requirements,
              location: job.location,
              salaryMin: job.salaryMin ?? 0,
              salaryMax: job.salaryMax ?? 0,
              employmentType: EMPLOYMENT_TYPE_TO_VALUE[job.employmentType],
              experienceLevel: EXPERIENCE_LEVEL_TO_VALUE[job.experienceLevel],
              department: job.department,
              skillIds: job.skillIds,
              benefits: job.benefits,
              expirationDate: job.expirationDate.slice(0, 16),
            }}
            defaultSkills={job.skillDetails.map((s) => ({
              id: s.id,
              name: s.name,
            }))}
            onSubmit={updateJob}
          />
        </div>
      </div>
    </Container>
  );
};
