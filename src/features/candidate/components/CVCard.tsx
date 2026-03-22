import { CV_STATUS, type CV } from "../types/cv.types";
import { CVStatusBadge } from "./CVStatusBadge";
import { Button } from "@/shared/components/ui/Button";
import { useDownloadCV } from "../hooks/useDownloadCV";
import { usePermission } from "@/lib/usePermission";
import { PERMISSIONS } from "@/config/permissions.constants";

type Props = { cv: CV };

export const CVCard = ({ cv }: Props) => {
  const { can } = usePermission();
  const { mutate: download, isPending: isDownloading } = useDownloadCV();

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("vi-VN");

  return (
    <div className="bg-white rounded-lg border p-4 flex items-center justify-between gap-4">
      {/* Icon + Info */}
      <div className="flex items-center gap-3 min-w-0">
        {/* PDF icon */}
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-red-600 text-xs font-bold">PDF</span>
        </div>

        <div className="min-w-0">
          <p className="font-medium text-gray-900 truncate">{cv.fileName}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {cv.formattedFileSize} · Uploaded {formatDate(cv.uploadedAt)}
          </p>
        </div>
      </div>

      {/* Status + Actions */}
      <div className="flex items-center gap-3 shrink-0">
        <CVStatusBadge status={cv.status} />

        {can(PERMISSIONS.DOWNLOAD_OWN_CV) && ( // P103
          <Button
            variant="outline"
            isLoading={isDownloading}
            disabled={cv.status !== CV_STATUS.COMPLETED}
            onClick={() => download({ id: cv.id, fileName: cv.fileName })}
          >
            Tải xuống
          </Button>
        )}
      </div>
    </div>
  );
};
