import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Pagination } from "@/shared/components/ui/Pagination";
import { StatusBadge } from "../components/StatusBadge";
import { Link } from "react-router-dom";
import { useGetMyApplications } from "../hooks/useGetMyApplication";

export const MyApplicationsPage = () => {
  const { data, isLoading } = useGetMyApplications();

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section>
      <Container>
        <h1 className="text-2xl font-bold mb-6">Đơn ứng tuyển của tôi</h1>

        <div className="mb-4 w-48"></div>

        {isLoading ? (
          <div className="space-y-3">Loading...</div>
        ) : data?.data.length === 0 ? (
          <p className="text-center py-16 text-text-secondary">
            Bạn chưa ứng tuyển công việc nào.
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {data?.data.map((app) => (
                <Link
                  key={app.applicationId}
                  to={`/candidate/applications/${app.applicationId}`}
                  className="block bg-surface rounded-lg border p-4 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{app.jobTitle}</h3>
                      <p className="text-sm text-text-secondary">
                        {app.company} · {app.location}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Ứng tuyển:{" "}
                        {new Date(app.appliedAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">
                          {app.matchPercentage}%
                        </span>
                        <span className="text-xs text-text-secondary block">
                          phù hợp
                        </span>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {data && data.totalPages > 1 && (
              <Pagination
                className="mt-3"
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
