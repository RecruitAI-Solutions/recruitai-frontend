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
import type { ApplicationStatusLabel } from "../types/application.type";

export const ApplicationDetailPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const userRole = useAppSelector(selectUserRole);
  const { data, isLoading } = useApplicationDetail(applicationId!);
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus(
    applicationId!,
  );
  const [newStatus, setNewStatus] = useState<ApplicationStatusLabel | "">("");

  const handleStatusUpdate = () => {
    if (!newStatus) return;

    updateStatus({
      status: newStatus,
    });
  };

  if (isLoading)
    return (
      <Section>
        <Container>Loading...</Container>
      </Section>
    );
  if (!data)
    return (
      <Section>
        <Container>Không tìm thấy đơn ứng tuyển</Container>
      </Section>
    );

  const isRecruiter = userRole === "recruiter";

  return (
    <Section>
      <Container>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-text-secondary hover:text-primary mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Quay lại
        </button>

        <div className="bg-surface rounded-xl border p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{data.jobTitle}</h1>
              <p className="text-text-secondary">
                {data.candidateName} · {data.candidateEmail}
              </p>
              <p className="text-sm text-text-muted mt-1">
                Ứng tuyển:{" "}
                {new Date(data.appliedAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">
                  {data.matchPercentage}%
                </span>
                <span className="text-sm text-text-secondary block">
                  phù hợp
                </span>
              </div>
              <StatusBadge status={data.status} />
            </div>
          </div>

          {isRecruiter && (
            <div className="flex gap-4 items-end">
              <Select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(e.target.value as ApplicationStatusLabel)
                }
                options={[
                  { value: "", label: "Chọn trạng thái" },
                  { value: "pending", label: "Chờ duyệt" },
                  { value: "reviewed", label: "Đã xem" },
                  { value: "accepted", label: "Đạt" },
                  { value: "rejected", label: "Từ chối" },
                ]}
              />
              <Button onClick={handleStatusUpdate} isLoading={isPending}>
                Cập nhật
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">
                Kỹ năng có ({data.matchedSkillCount}/{data.requiredSkillCount})
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.matchedSkills.map((s) => (
                  <Badge key={s.skillId} variant="success">
                    {s.name}
                  </Badge>
                ))}
              </div>
              {data.missingSkills.length > 0 && (
                <>
                  <h3 className="font-medium mt-4 mb-2">Kỹ năng thiếu</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.missingSkills.map((s) => (
                      <Badge key={s.skillId} variant="danger">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">CV ứng tuyển</h3>
              <p>{data.cvName}</p>
              <a
                href={data.cvDownloadUrl}
                download
                className="mt-2 inline-block"
              >
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Tải CV
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
