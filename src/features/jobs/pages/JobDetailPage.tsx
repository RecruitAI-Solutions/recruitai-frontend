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

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useGetJob(id || "");
  const user = useAppSelector(selectCurrentUser);
  const userRole = useAppSelector(selectUserRole);

  if (isLoading) {
    return (
      <Section padding="lg">
        <Container>
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-gray-200 rounded-xl w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl" />
                <div className="h-64 bg-gray-200 rounded-xl" />
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-gray-200 rounded-xl" />
                <div className="h-48 bg-gray-200 rounded-xl" />
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
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy công việc</h2>
          <p className="text-text-secondary mb-8">
            Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button onClick={() => navigate(-1)}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Quay lại
          </Button>
        </Container>
      </Section>
    );
  }

  const isOwner = userRole === "recruiter" && job.recruiterId === user?.id;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header Section */}
      <Section background="surface" className="border-b border-gray-200">
        <Container>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-text-secondary hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Quay lại danh sách
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="purple">{job.employmentType}</Badge>
                <Badge variant="default">{job.experienceLevel}</Badge>
                {job.isActive ? (
                  <Badge variant="success">Đang tuyển</Badge>
                ) : (
                  <Badge variant="danger">Đã đóng</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-text-secondary">
                <div className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-primary" />
                  <span className="font-medium text-text-primary">
                    {job.recruiterName}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-primary" />
                  <span>
                    {job.salaryMin && job.salaryMax
                      ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ${job.currency}`
                      : "Thỏa thuận"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {isOwner ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate(ROUTES.RECRUITER.JOB_EDIT(job.id))}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(ROUTES.RECRUITER.APPLICANTS(job.id))
                    }
                  >
                    Xem ứng viên ({job.applications})
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline">Lưu tin</Button>
                  <Button>Ứng tuyển ngay</Button>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Section */}
      <Section padding="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[var(--color-surface)] p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-primary" /> Mô tả công
                  việc
                </h3>
                <div className="prose prose-blue max-w-none text-text-secondary whitespace-pre-line">
                  {job.description}
                </div>
              </div>

              <div className="bg-[var(--color-surface)] p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <CheckCircle2 className="w-5 h-5 mr-2 text-primary" /> Yêu cầu
                  công việc
                </h3>
                <div className="prose prose-blue max-w-none text-text-secondary whitespace-pre-line">
                  {job.requirements}
                </div>
              </div>

              {job.benefits && (
                <div className="bg-[var(--color-surface)] p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-primary" /> Quyền
                    lợi & Phúc lợi
                  </h3>
                  <div className="prose prose-blue max-w-none text-text-secondary whitespace-pre-line">
                    {job.benefits}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Info Card */}
              <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4">Thông tin chung</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-text-secondary">
                      <Calendar className="w-4 h-4 mr-2" /> Ngày đăng
                    </div>
                    <span className="font-medium">
                      {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-text-secondary">
                      <Clock className="w-4 h-4 mr-2" /> Hết hạn
                    </div>
                    <span className="font-medium text-red-600">
                      {new Date(job.expirationDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-text-secondary">
                      <Users className="w-4 h-4 mr-2" /> Lượt ứng tuyển
                    </div>
                    <span className="font-medium">{job.applications}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-text-secondary">
                      <Eye className="w-4 h-4 mr-2" /> Lượt xem
                    </div>
                    <span className="font-medium">{job.views}</span>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4">Kỹ năng yêu cầu</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skillDetails.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant={skill.isRequired ? "danger" : "gray"}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold mb-4">Thông tin liên hệ</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    <a
                      href={`mailto:${job.recruiterEmail}`}
                      className="text-primary hover:underline"
                    >
                      {job.recruiterEmail}
                    </a>
                  </div>
                  <div className="flex items-start text-sm">
                    <Building2 className="w-4 h-4 mr-2 text-primary mt-0.5" />
                    <span className="text-text-secondary">
                      Bộ phận: {job.department}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default JobDetailPage;
