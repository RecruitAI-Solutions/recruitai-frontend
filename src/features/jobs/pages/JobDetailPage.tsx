// JobDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Eye,
  Mail,
  Clock,
  Building2,
  Award,
  Target,
  TrendingUp,
  Sparkles,
  BookOpen,
  Heart,
  Globe,
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
import { useEffect, useState, useRef } from "react";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useGetJob(id || "");
  const user = useAppSelector(selectCurrentUser);
  const userRole = useAppSelector(selectUserRole);
  const { data: similarData } = useGetSimilarJobs(id ?? "", !!id);
  const similarJobs = similarData?.data ?? [];

  const contentRef = useRef<HTMLDivElement>(null);
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);

  useEffect(() => {
    const updatePositions = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        // Sidebar cách content 24px
        setLeftPosition(rect.left - 320 - 24);
        setRightPosition(window.innerWidth - rect.right - 320 - 24);
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);
    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [job]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Sticky với background thụt vào */}
      <div className="sticky top-0 z-10">
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div
            className="w-full shadow-md"
            style={{ maxWidth: mainContentMaxWidth }}
          >
            <div className="py-4">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                Quay lại danh sách
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Header */}
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 mt-4">
        <div
          className="w-full bg-white rounded-2xl shadow-sm border border-gray-100"
          style={{ maxWidth: mainContentMaxWidth }}
        >
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
                    <Badge
                      variant="success"
                      className="text-xs flex items-center gap-1"
                    >
                      <Shield className="w-3 h-3" />
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
                    <span className="font-medium text-gray-900">
                      {job.companyName || job.recruiterName}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">
                      {job.salaryMin && job.salaryMax
                        ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`
                        : "Thỏa thuận"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Owner Actions */}
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
                    onClick={() =>
                      navigate(ROUTES.RECRUITER.APPLICANTS(job.id))
                    }
                    className="bg-primary hover:bg-primary-dark"
                  >
                    Xem ứng viên ({job.applications})
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Fixed Sidebars */}
      <div className="relative mt-6">
        {/* Left Sidebar - Candidate Actions (Fixed) */}
        {userRole === "candidate" && (
          <div
            className="hidden lg:block fixed left-4 xl:left-8 top-32 w-80 space-y-6"
            style={{ maxHeight: "calc(100vh - 8rem)", overflowY: "auto" }}
          >
            {/* Apply Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-transparent px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
      {/* Left Sidebar */}
      {userRole === "candidate" && leftPosition > 0 && (
        <div
          className="hidden lg:block fixed top-32 w-80 z-10"
          style={{ left: leftPosition }}
        >
          <div className="space-y-4">
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
        </div>
      )}

        {/* Right Sidebar - Info (Fixed) */}
        <div
          className="hidden lg:block fixed right-4 xl:right-8 top-32 w-80 space-y-6"
          style={{ maxHeight: "calc(100vh - 8rem)", overflowY: "auto" }}
        >
          {/* Job Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-transparent px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Thông tin chung
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Ngày đăng
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                </span>
      {/* Right Sidebar */}
      {rightPosition > 0 && (
        <div
          className="hidden lg:block fixed top-32 w-80 z-10"
          style={{ right: rightPosition }}
        >
          <div className="space-y-4">
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

          {job.companyName && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-transparent px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-primary" />
                  Thông tin công ty
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                      {job.companyName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {job.companyName}
                    </p>
                    {job.companyAddress && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" /> {job.companyAddress}
                      </p>
                    )}
                  </div>
                </div>
                {job.companyWebsite && (
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    <Globe className="w-4 h-4 mr-1" /> {job.companyWebsite}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Skills Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-transparent px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Kỹ năng yêu cầu
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {job.skillDetails.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={skill.isRequired ? "danger" : "gray"}
                    className="text-xs"
                  >
                    {skill.name}
                  </Badge>
                ))}
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
                    <Badge key={skill.id} variant={skill.isRequired ? "danger" : "gray"} className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-transparent px-4 py-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-primary" />
                  Liên hệ
                </h3>
              </div>
              <div className="p-4">
                <a href={`mailto:${job.recruiterEmail}`} className="text-primary hover:underline text-sm break-all">
                  {job.recruiterEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="max-w-7xl mx-auto">
          {/* Back button */}
          <div className="py-4">
            <ButtonBack>Quay lại</ButtonBack>
          </div>

          {/* Job Header */}
          <div className="mb-6">
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
                        <DollarSign className="w-4 h-4 mr-2 text-primary" />
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
          </div>

          {/* Main Content */}
          <div className="space-y-6">
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
                  {similarJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

              {similarJobs.length > 0 && (
                <Section padding="md">
                  <Container>
                    <h2 className="text-xl font-bold mb-6">
                      Việc làm tương tự
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      {similarJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </Container>
                </Section>
              )}
      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="space-y-4">
          {userRole === "candidate" && (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <ApplySection jobId={job.id} />
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <MatchCVButton jobId={job.id} />
              </div>
            </>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ngày đăng:</span>
              <span>{new Date(job.createdAt).toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Hết hạn:</span>
              <span className="text-red-600">{new Date(job.expirationDate).toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Lượt ứng tuyển:</span>
              <span>{job.applications}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Lượt xem:</span>
              <span>{job.views}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold mb-2 text-gray-900">Kỹ năng yêu cầu</h3>
            <div className="flex flex-wrap gap-1.5">
              {job.skillDetails.map((skill) => (
                <Badge key={skill.id} variant={skill.isRequired ? "danger" : "gray"} className="text-xs">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold mb-2 text-gray-900">Liên hệ</h3>
            <a href={`mailto:${job.recruiterEmail}`} className="text-primary hover:underline text-sm break-all">
              {job.recruiterEmail}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;

