import { Link } from "react-router-dom";
import { CV_STATUS, type CV } from "../types/cv.types";
import { CVStatusBadge } from "./CVStatusBadge";
import { Button } from "@/shared/components/ui/Button";
import { useDownloadCV } from "../hooks/useDownloadCV";
import { useAnalyzeCV } from "@/features/ai/hooks/useAnalyzeCV";
import { useAnalysisResult } from "@/features/ai/hooks/useAnalysisResult";
import { usePermission } from "@/lib/usePermission";
import { PERMISSIONS } from "@/config/permissions.constants";
import { FileText, Download, RefreshCw, Trash2 } from "lucide-react";
import { useDeleteCV } from "../hooks/useDeleteCV";

type Props = { cv: CV };

export const CVCard = ({ cv }: Props) => {
  const { can } = usePermission();
  const { mutate: download, isPending: isDownloading } = useDownloadCV();
  const { mutate: deleteCV, isPending: isDeleting } = useDeleteCV();
  const { mutate: analyze, isPending: isAnalyzing } = useAnalyzeCV();
  const { data: analysis } = useAnalysisResult(
    cv.id,
    cv.status === CV_STATUS.COMPLETED || cv.status === CV_STATUS.ANALYZED,
  );

  console.log(cv);
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("vi-VN");

  const handleAnalyze = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    analyze(cv.id);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    download({ id: cv.id, fileName: cv.fileName });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Bạn có chắc muốn xóa CV này?")) {
      deleteCV(cv.id);
    }
  };

  return (
    <Link
      to={`/candidate/cv/${cv.id}`}
      className="bg-surface rounded-lg border p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-red-600" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{cv.fileName}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {cv.formattedFileSize} · Uploaded {formatDate(cv.uploadedAt)}
          </p>
          {analysis?.status === "analyzed" && (
            <p className="text-xs text-green-600 mt-1">
              {analysis.totalSkills} kỹ năng · AI enhanced
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <CVStatusBadge status={cv.status} />

        {cv.status === CV_STATUS.COMPLETED &&
          analysis?.status !== "analyzed" && (
            <Button
              variant="outline"
              isLoading={isAnalyzing}
              onClick={handleAnalyze}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Phân tích
            </Button>
          )}

        {can(PERMISSIONS.DOWNLOAD_OWN_CV) && (
          <Button
            variant="outline"
            isLoading={isDownloading}
            disabled={cv.status !== CV_STATUS.COMPLETED}
            onClick={handleDownload}
          >
            <Download className="w-3 h-3" />
          </Button>
        )}
        {can(PERMISSIONS.DELETE_OWN_CV) && ( // P104
          <Button
            variant="outline"
            isLoading={isDeleting}
            onClick={handleDelete}
          >
            <Trash2 className="w-3 h-3 text-red-600" />
          </Button>
        )}
      </div>
    </Link>
  );
};
