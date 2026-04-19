import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { CVStatusBadge } from "../components/CVStatusBadge";
import { useGetCV } from "../hooks/useGetCV";
import { useDownloadCV } from "../hooks/useDownloadCV";
import { useAnalyzeCV } from "@/features/ai/hooks/useAnalyzeCV";
import { useAnalysisResult } from "@/features/ai/hooks/useAnalysisResult";
import { ChevronLeft, Download, RefreshCw, Loader2 } from "lucide-react";
import { CV_STATUS } from "../types/cv.types";

export const CVDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: cv, isLoading } = useGetCV(id || "");
  const { mutate: download } = useDownloadCV();
  const { mutate: analyze, isPending: isAnalyzing } = useAnalyzeCV();
  const { data: analysis } = useAnalysisResult(id || "", !!id);

  const handleDownload = () => {
    if (cv) download({ id: cv.id, fileName: cv.fileName });
  };

  const handleAnalyze = () => {
    if (id) analyze(id);
  };

  if (isLoading) {
    return (
      <Section>
        <Container>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded" />
          </div>
        </Container>
      </Section>
    );
  }

  if (!cv) {
    return (
      <Section>
        <Container className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy CV</h2>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-text-secondary hover:text-primary mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Quay lại danh sách
        </button>

        <div className="bg-surface rounded-xl border border-border p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-xs font-bold">PDF</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">
                  {cv.fileName}
                </h1>
                <p className="text-sm text-text-secondary mt-1">
                  {cv.formattedFileSize} · Upload{" "}
                  {new Date(cv.uploadedAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
            <CVStatusBadge status={cv.status} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-6">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Tải xuống
            </Button>
            {cv.status === CV_STATUS.COMPLETED && (
              <Button onClick={handleAnalyze} isLoading={isAnalyzing}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Phân tích CV
              </Button>
            )}
          </div>

          {/* Kết quả phân tích AI */}
          {analysis?.status === "processing" && (
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Đang phân tích CV...</span>
            </div>
          )}

          {analysis?.status === "analyzed" && (
            <>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-900">
                  AI đã phân tích {analysis.totalSkills} kỹ năng của bạn
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  Tìm việc làm phù hợp nhất với CV này
                </p>
                <Button
                  className="mt-3"
                  onClick={() =>
                    navigate(`/candidate/cv/${cv.id}/matching-jobs`)
                  }
                >
                  Xem việc làm phù hợp →
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">
                  Kỹ năng được trích xuất ({analysis.totalSkills})
                  {analysis.aiAnalysis?.isAvailable && (
                    <span className="ml-2 text-xs text-green-600">
                      (AI enhanced)
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill) => (
                    <Badge key={skill.skillId} variant="default">
                      {skill.name}
                      <span className="ml-1 text-xs opacity-70">
                        ({Math.round(skill.confidence * 100)}%)
                      </span>
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {analysis?.status === "failed" && (
            <p className="text-error">Phân tích thất bại. Vui lòng thử lại.</p>
          )}
        </div>
      </Container>
    </Section>
  );
};
