// JobDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Mail,
  Building2,
  Award,
  Target,
  TrendingUp,
  Sparkles,
  BookOpen,
  Heart,
} from "lucide-react";
import { useGetJob } from "../hooks/useGetJob";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser, selectUserRole } from "@/features/auth/slices/authSlice";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";
import { ROUTES } from "@/config/routes.config";
import { MatchCVButton } from "@/features/ai/components/MatchCVButton";
import { ApplySection } from "@/features/applications/components/ApplySection";
import { useGetSimilarJobs } from "../hooks/useGetSimilarJobs";
import { JobCard } from "../components/JobCard";
import { ButtonBack } from "@/shared/components/ui/ButtonBack";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useGetJob(id || "");
  const user = useAppSelector(selectCurrentUser);
  const userRole = useAppSelector(selectUserRole);
  const { data: similarData } = useGetSimilarJobs(id ?? "", !!id);
  const similarJobs = similarData?.data ?? [];

  if (isLoading) {
    return (
      <Section padding="lg">
        <Container>
          <div className="animate-pulse space-y-8">
            <div className="h-40 bg-gray-200 rounded-2xl w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded-2xl" />
                <div className="h-96 bg-gray-200 rounded-2xl" />
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gray-200 rounded-2xl" />
                <div className="h-64 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  if (error || !job) {
    return (
      <Section padding="lg">
        <Container className="text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-text-primary">
              Không tìm thấy công việc
            </h2>
            <p className="text-text-secondary mb-8">
              Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <ButtonBack>Quay lại</ButtonBack>
          </div>
        </Container>
      </Section>
    );
  }

  const isOwner = userRole === "recruiter" && job.recruiterId === user?.id;
  const isCandidate = userRole === "candidate";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <div className="mb-4">
          <ButtonBack>Quay lại</ButtonBack>
        </div>

        {/* Grid Layout - Responsive 3 cột */}
        <div className={`
          grid gap-6 items-start
          ${isCandidate
            ? "xl:grid-cols-[320px_minmax(0,1fr)_320px] grid-cols-1"
            : "xl:grid-cols-[minmax(0,1fr)_320px] grid-cols-1"
          }
        `}>
          {/* LEFT SIDEBAR - Chỉ hiển thị cho candidate */}
          {isCandidate && (
            <div className="space-y-4 xl:sticky xl:top-24 order-2 xl:order-1">
              {/* Ứng tuyển ngay */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary/10 to-transparent px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                    Ứng tuyển ngay
                  </h3>
                </div>
                <div className="p-4">
                  <ApplySection jobId={job.id} />
                </div>
              </div>

              {/* Kiểm tra độ phù hợp */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-transparent px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-primary" />
                    Kiểm tra độ phù hợp
                  </h3>
                </div>
                <div className="p-4">
                  <MatchCVButton jobId={job.id} />
                </div>
              </div>
            </div>
          )}

          {/* MAIN CONTENT */}
          <div className={`space-y-6 order-1 ${isCandidate ? "xl:order-2" : "xl:order-1"}`}>
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="purple" className="text-xs">
                        {job.employmentType}
                      </Badge>
                      <Badge variant="default" className="text-xs">
                        {job.experienceLevel}
                      </Badge>
                      {job.isActive ? (
                        <Badge variant="success" className="text-xs">
                          Đang tuyển
                        </Badge>
                      ) : (
                        <Badge variant="danger" className="text-xs">
                          Đã đóng
                        </Badge>
                      )}
                    </div>

                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {job.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium text-gray-900">{job.recruiterName}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium">
                          {job.salaryMin && job.salaryMax
                            ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`
                            : "Thỏa thuận"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isOwner && (
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => navigate(ROUTES.RECRUITER.JOB_EDIT(job.id))}
                        className="border-gray-300 hover:border-primary"
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        onClick={() => navigate(ROUTES.RECRUITER.APPLICANTS(job.id))}
                        className="bg-primary hover:bg-primary-dark"
                      >
                        Xem ứng viên ({job.applications})
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-primary" />
                  Mô tả công việc
                </h3>
              </div>
              <div className="p-6">
                <div className="prose prose-gray max-w-none text-gray-600 whitespace-pre-line">
                  {job.description}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Yêu cầu công việc
                </h3>
              </div>
              <div className="p-6">
                <div className="whitespace-pre-line text-gray-600">
                  {job.requirements}
                </div>
              </div>
            </div>

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent px-6 py-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-primary" />
                    Quyền lợi & Phúc lợi
                  </h3>
                </div>
                <div className="p-6">
                  <div className="whitespace-pre-line text-gray-600">
                    {job.benefits}
                  </div>
                </div>
              </div>
            )}

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div className="pt-4">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Việc làm tương tự</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {similarJobs.map((similarJob) => (
                    <JobCard key={similarJob.id} job={similarJob} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - Luôn hiển thị trên desktop */}
          <div className="space-y-4 xl:sticky xl:top-24 order-3">
            {/* Thông tin chung */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-transparent px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center">
                  <Award className="w-4 h-4 mr-2 text-primary" />
                  Thông tin chung
                </h3>
              </div>
              <div className="p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ngày đăng:</span>
                  <span>{new Date(job.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hết hạn:</span>
                  <span className="text-red-600">{new Date(job.expirationDate).toLocaleDateString("vi-VN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lượt ứng tuyển:</span>
                  <span>{job.applications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lượt xem:</span>
                  <span>{job.views}</span>
                </div>
              </div>
            </div>

            {/* Kỹ năng yêu cầu */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-transparent px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  Kỹ năng yêu cầu
                </h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-1.5">
                  {job.skillDetails.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant={skill.isRequired ? "danger" : "gray"}
                      className="text-xs"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Liên hệ */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-transparent px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-primary" />
                  Liên hệ
                </h3>
              </div>
              <div className="p-4">
                <a
                  href={`mailto:${job.recruiterEmail}`}
                  className="text-primary hover:underline text-sm break-all"
                >
                  {job.recruiterEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;