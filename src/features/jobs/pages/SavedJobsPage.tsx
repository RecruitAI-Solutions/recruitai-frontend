import { useState } from "react";
import { Link } from "react-router-dom";
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";
import { useGetSavedJobs } from "../hooks/useGetSavedJobs";
import { SaveJobButton } from "../components/SaveJobButton";
import { ROUTES } from "@/config/routes.config";
import { MapPin, Clock, Bookmark, ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export const SavedJobsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetSavedJobs({ page, pageSize: 10 });
  const jobs = data?.data || [];

  return (
    <Section>
      <Container>
        <Link
          to={ROUTES.JOB}
          className="text-sm text-gray-500 hover:text-primary flex items-center mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Khám phá việc làm
        </Link>
        <h1 className="text-2xl font-bold mb-6">
          <Bookmark className="w-6 h-6 inline text-primary mr-2" />
          Việc làm đã lưu
        </h1>
        {isLoading ? (
          <div className="space-y-3">...</div>
        ) : jobs.length === 0 ? (
          <p className="text-center py-16 text-gray-500">
            Bạn chưa lưu việc làm nào.
          </p>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.jobId}
                className="bg-white rounded-lg border p-4 relative hover:shadow-md"
              >
                <Link to={ROUTES.JOB_DETAILS(job.jobId)}>
                  <h3 className="font-semibold">{job.jobTitle}</h3>
                  <p className="text-sm text-gray-600">{job.companyName}</p>
                  <div className="flex gap-4 text-sm text-gray-500 mt-2">
                    <span>
                      <MapPin className="w-3 h-3 inline" /> {job.location}
                    </span>
                    <span>
                      {job.salaryMin
                        ? `${(job.salaryMin / 1e6).toFixed(0)}M – ${(job.salaryMax / 1e6).toFixed(0)}M`
                        : "Thỏa thuận"}
                    </span>
                    <span>
                      <Clock className="w-3 h-3 inline" />{" "}
                      {new Date(job.savedAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </Link>
                <div className="absolute top-2 right-2">
                  <SaveJobButton jobId={job.jobId} />
                </div>
              </div>
            ))}
          </div>
        )}
        {data && data.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Trước
            </Button>
            <Button
              variant="primary"
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sau
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
};
