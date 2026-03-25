import { Container } from "@/shared/layouts/Container";
import { useCreateJob } from "../hooks/useCreateJob";
import { JobForm } from "../components/JobForm";

export const CreateJobPage = () => {
  const { mutate: createJob, isPending } = useCreateJob();

  return (
    <Container className="py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Đăng việc làm mới
        </h1>
        <div className="bg-white rounded-xl border p-6">
          <JobForm
            isPending={isPending}
            submitLabel="Đăng việc làm"
            onSubmit={createJob}
          />
        </div>
      </div>
    </Container>
  );
};
