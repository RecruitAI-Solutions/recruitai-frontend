import { useGetMyJobs } from "../hooks/useGetMyJobs";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { JobTable } from "@/features/jobs/components/JobTable";

export const MyJobsPage = () => {
  const { data } = useGetMyJobs();
  const { mutate: deleteJob } = useDeleteJob();

  return <JobTable jobs={data?.data || []} onDelete={deleteJob} />;
};
