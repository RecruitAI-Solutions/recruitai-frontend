import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Eye,
  ChevronLeft,
  Mail,
  Clock,
  Building2,
  CheckCircle2,
  Award,
  Target,
  TrendingUp,
  Sparkles,
  Shield,
  BookOpen,
  Heart,
} from "lucide-react";
import { useGetJob } from "../hooks/useGetJob";
import { useAppSelector } from "@/app/hooks";
import {
  selectCurrentUser,
  selectUserRole,
} from "@/features/auth/slices/authSlice";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Section } from "@/shared/layouts/Section";
import { Container } from "@/shared/layouts/Container";
import { ROUTES } from "@/config/routes.config";
import { MatchCVButton } from "@/features/ai/components/MatchCVButton";
import { ApplySection } from "@/features/applications/components/ApplySection";
import { useGetSimilarJobs } from "../hooks/useGetSimilarJobs";
import { JobCard } from "../components/JobCard";

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
            <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl" />
                <div className="h-96 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl" />
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl" />
                <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl" />
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
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Không tìm thấy công việc</h2>
            <p className="text-text-secondary mb-8">
              Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Button onClick={() => navigate(-1)}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Quay lại
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  const isOwner = userRole === "recruiter" && job.recruiterId === user?.id;

  // Độ rộng tối đa của content chính
  const mainContentMaxWidth = "min(calc(100% - 20rem), 1200px)";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Sticky với background thụt vào */}
      <div className="sticky top-0 z-10">
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full shadow-md" style={{ maxWidth: mainContentMaxWidth }}>
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
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100" style={{ maxWidth: mainContentMaxWidth }}>
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
                    <Badge variant="success" className="text-xs flex items-center gap-1">
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

      {/* Main Content with Fixed Sidebars */}
      <div className="relative mt-6">
        {/* Left Sidebar - Candidate Actions (Fixed) */}
        {userRole === "candidate" && (
          <div className="hidden lg:block fixed left-4 xl:left-8 top-32 w-80 space-y-6" style={{ maxHeight: "calc(100vh - 8rem)", overflowY: "auto" }}>
            {/* Apply Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-transparent px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Ứng tuyển ngay
                </h3>
              </div>
              <div className="p-6">
                <ApplySection jobId={job.id} />
              </div>
            </div>

            {/* Match CV Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-transparent px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  Kiểm tra độ phù hợp
                </h3>
              </div>
              <div className="p-6">
                <MatchCVButton jobId={job.id} />
              </div>
            </div>
          </div>
        )}

        {/* Right Sidebar - Info (Fixed) */}
        <div className="hidden lg:block fixed right-4 xl:right-8 top-32 w-80 space-y-6" style={{ maxHeight: "calc(100vh - 8rem)", overflowY: "auto" }}>
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
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-primary" />
                  Hết hạn
                </div>
                <span className="font-medium text-red-600 text-sm">
                  {new Date(job.expirationDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  Lượt ứng tuyển
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  {job.applications}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <Eye className="w-4 h-4 mr-2 text-primary" />
                  Lượt xem
                </div>
                <span className="font-medium text-gray-700 text-sm">
                  {job.views}
                </span>
              </div>
            </div>
          </div>

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
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-transparent px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                Thông tin liên hệ
              </h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Mail className="w-4 h-4 mr-3 text-primary" />
                <a
                  href={`mailto:${job.recruiterEmail}`}
                  className="text-primary hover:underline text-sm"
                >
                  {job.recruiterEmail}
                </a>
              </div>
              <div className="flex items-start text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Building2 className="w-4 h-4 mr-3 text-primary mt-0.5" />
                <span className="text-gray-600 text-sm">
                  Bộ phận: {job.department}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full" style={{ maxWidth: mainContentMaxWidth }}>
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
                  <div className="prose prose-gray max-w-none text-gray-600 whitespace-pre-line">
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
                    <div className="prose prose-gray max-w-none text-gray-600 whitespace-pre-line">
                      {job.benefits}
                    </div>
                  </div>
                </div>
              )}

              {similarJobs.length > 0 && (
                <Section padding="md">
                  <Container>
                    <h2 className="text-xl font-bold mb-6">Việc làm tương tự</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      {similarJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </Container>
                </Section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;