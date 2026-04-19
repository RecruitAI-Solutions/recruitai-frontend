import { useParams } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { useGetApplicationsByJob } from "../hooks/useGetApplicationsByJob";
import { useApplicationFilters } from "../hooks/useApplicationFilters";
import { ApplicationTable } from "../components/ApplicationTable";
import type { JobApplicationsParams } from "../types/application.type";

export const JobApplicationsPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { filter, updateFilter } = useApplicationFilters();
  const { data, isLoading } = useGetApplicationsByJob(jobId!, filter);

  const handleTableChange = (newFilter: JobApplicationsParams) => {
    updateFilter(newFilter);
  };

  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold mb-6">Danh sách ứng viên</h1>

        <ApplicationTable
          applications={data?.data || []}
          loading={isLoading}
          pagination={{
            current: filter.page || 1,
            pageSize: filter.pageSize || 10,
            total: data?.total || 0,
            onChange: (page, pageSize) => updateFilter({ page, pageSize }),
          }}
          onFilterChange={handleTableChange}
        />
      </Container>
    </Section>
  );
};
