import { useParams, Link } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { useGetCompany } from "../hooks/useGetCompany";
import { useGetCompanyJobs } from "../hooks/useGetCompanyJobs";
import { JobCard } from "@/features/jobs/components/JobCard";
import { Button } from "@/shared/components/ui/Button";
import { MapPin, Globe, Briefcase, ChevronLeft, Calendar } from "lucide-react";
import { useState } from "react";

export const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const {
    data: company,
    isLoading: companyLoading,
    isError: companyError,
  } = useGetCompany(id!);
  const { data: jobsData, isLoading: jobsLoading } = useGetCompanyJobs(id!, {
    page,
    pageSize,
  });

  if (companyLoading) {
    return (
      <Section>
        <Container size="lg">
          <div className="animate-pulse space-y-6">
            <div className="h-40 bg-gray-100 rounded-2xl" />
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (companyError || !company) {
    return (
      <Section>
        <Container className="text-center py-16">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Không tìm thấy công ty</h2>
          <Link to="/companies">
            <Button variant="outline" className="mt-4">
              <ChevronLeft className="w-4 h-4 mr-2" /> Danh sách công ty
            </Button>
          </Link>
        </Container>
      </Section>
    );
  }

  const jobs = jobsData?.data ?? [];
  const totalJobs = jobsData?.total ?? 0;
  const totalPages = Math.ceil(totalJobs / pageSize);

  return (
    <Section>
      <Container size="lg">
        {/* Back button */}
        <Link
          to="/companies"
          className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Danh sách công ty
        </Link>

        {/* Company Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-24 h-24 rounded-xl object-cover border"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                  {company.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {company.name}
              </h1>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                {company.address && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />{" "}
                    {company.address}
                  </span>
                )}
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <Globe className="w-4 h-4 mr-1" /> {company.website}
                  </a>
                )}
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-primary" />
                  Thành lập:{" "}
                  {new Date(company.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">
                  {company.totalJobs} việc làm đang tuyển
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-primary" />
          Việc làm tại {company.name}
        </h2>

        {jobsLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            Chưa có việc làm nào.
          </p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Trước
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "primary" : "outline"}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Sau
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};
