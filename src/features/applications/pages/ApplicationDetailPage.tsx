import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { StatusBadge } from "../components/StatusBadge";
import { useApplicationDetail } from "../hooks/useApplicationDetail";
import { useUpdateApplicationStatus } from "../hooks/useUpdateApplicationStatus";
import { useAppSelector } from "@/app/hooks";
import { selectUserRole } from "@/features/auth/slices/authSlice";
import { ChevronLeft, Download } from "lucide-react";
import { Select } from "@/shared/components/ui/Select";
import { useState } from "react";
import type {
  ApplicationStatusLabel,
  ApplicationStatusValue,
} from "../types/application.type";
import { ButtonBack } from "@/shared/components/ui/ButtonBack";

export const ApplicationDetailPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const userRole = useAppSelector(selectUserRole);
  const { data, isLoading } = useApplicationDetail(applicationId!);

  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();
  const [newStatus, setNewStatus] = useState<
    ApplicationStatusValue | undefined
  >(undefined);

  const handleStatusUpdate = () => {
    if (!newStatus) return;
    updateStatus({
      applicationId: applicationId!,
      data: { status: newStatus },
    });
  };

  if (isLoading) {
    return (
      <Section>
        <Container>Đang tải...</Container>
      </Section>
    );
  }

  if (!data) {
    return (
      <Section>
        <Container>Không tìm thấy đơn ứng tuyển</Container>
      </Section>
    );
  }

  const isRecruiter = userRole === "recruiter";
  const { job, cv, candidate, matchResult } = data;

  return (
    <Section>
      <Container>
        <ButtonBack className="!mb-5">Quay lại danh sách</ButtonBack>

        <div className="bg-surface rounded-xl border p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-text-secondary">
                {candidate.fullName} · {candidate.email}
              </p>
              <p className="text-sm text-text-muted mt-1">
                Ứng tuyển:{" "}
                {new Date(data.appliedAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">
                  {matchResult.matchPercentage}%
                </span>
                <span className="text-sm text-text-secondary block">
                  phù hợp
                </span>
              </div>
              <StatusBadge status={data.status} />
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Mô tả công việc</h3>
              <p className="whitespace-pre-line text-text-secondary">
                {job.description}
              </p>
              <h3 className="font-medium mt-4 mb-2">Yêu cầu</h3>
              <p className="whitespace-pre-line text-text-secondary">
                {job.requirements}
              </p>
              {job.benefits && (
                <>
                  <h3 className="font-medium mt-4 mb-2">Phúc lợi</h3>
                  <p className="whitespace-pre-line text-text-secondary">
                    {job.benefits}
                  </p>
                </>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">Thông tin ứng viên</h3>
              <p>
                <strong>Tên:</strong> {candidate.fullName}
              </p>
              <p>
                <strong>Email:</strong> {candidate.email}
              </p>
              <p>
                <strong>Điện thoại:</strong>{" "}
                {candidate.phoneNumber || "Chưa cung cấp"}
              </p>
              <h3 className="font-medium mt-4 mb-2">CV ứng tuyển</h3>
              <p className="text-sm">
                {cv.fileName} · {(cv.fileSize / 1024).toFixed(0)} KB
              </p>
              <p className="text-xs text-text-muted">
                Upload: {new Date(cv.uploadedAt).toLocaleDateString("vi-VN")}
              </p>
              <a href={cv.downloadUrl} download className="mt-3 inline-block">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Tải CV
                </Button>
              </a>
            </div>
          </div>

          {/* Skills Match */}
          <div>
            <h3 className="font-medium mb-2">
              Kỹ năng khớp ({matchResult.matchedSkillCount}/
              {matchResult.requiredSkillCount})
            </h3>
            <div className="flex flex-wrap gap-2">
              {matchResult.matchedSkills.map((skill) => (
                <Badge key={skill.skillId} variant="success">
                  {skill.name}
                </Badge>
              ))}
            </div>
            {matchResult.missingSkills.length > 0 && (
              <>
                <h3 className="font-medium mt-4 mb-2">Kỹ năng thiếu</h3>
                <div className="flex flex-wrap gap-2">
                  {matchResult.missingSkills.map((skill) => (
                    <Badge key={skill.skillId} variant="danger">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </>
            )}
            <p className="text-xs text-text-muted mt-2">
              Phân tích lúc:{" "}
              {new Date(matchResult.calculatedAt).toLocaleString("vi-VN")}
            </p>
          </div>

          {/* Recruiter Status Update */}
          {isRecruiter && (
            <div className="flex gap-4 items-end border-t pt-6">
              <Select
                value={newStatus?.toString() || ""}
                onChange={(e) =>
                  setNewStatus(Number(e.target.value) as ApplicationStatusValue)
                }
                options={[
                  { value: "", label: "Chọn trạng thái" },
                  { value: "1", label: "Chờ duyệt" },
                  { value: "2", label: "Đã xem" },
                  { value: "3", label: "Đạt" },
                  { value: "4", label: "Từ chối" },
                ]}
                className="min-w-[200px]"
              />
              <Button onClick={handleStatusUpdate} isLoading={isPending}>
                Cập nhật
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
