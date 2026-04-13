import { useParams } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { useGetApplicationsByJob } from "../hooks/useGetApplicationsByJob";
import { useApplicationsFilter } from "../hooks/useApplicationsFilter";
import { ApplicationTable } from "../components/ApplicationTable";
import { ApplicationFilters } from "../components/ApplicationFilters";
import { Pagination } from "@/shared/components/ui/Pagination";

export const JobApplicationsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { filter, updateFilter } = useApplicationsFilter();
  const { data, isLoading } = useGetApplicationsByJob(jobId!, filter);

  const handlePageChange = (page: number) => {
    updateFilter({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold mb-6">Danh sách ứng viên</h1>
        <ApplicationFilters />
        {isLoading ? (
          <div>Loading...</div>
        ) : data?.data.length === 0 ? (
          <p>Chưa có ứng viên nào.</p>
        ) : (
          <>
            <ApplicationTable applications={data?.data || []} jobId={jobId!} />
            {data && data.totalPages > 1 && (
              <Pagination
                currentPage={data.page}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </Section>
  );
};
