import { formatFileSize } from "@/lib/utils";

export const CV_STATUS = {
  PENDING: "pending",
  UPLOADED: "uploaded",
  PROCESSING: "processing",
  COMPLETED: "completed",
  ANALYZED: "analyzed",
  FAILED: "failed",
} as const;

export type CVStatus = (typeof CV_STATUS)[keyof typeof CV_STATUS];

export type RawStatus = number | string;

export const normalizeStatus = (
  status: RawStatus,
  statusName?: string,
): CVStatus => {
  // Ưu tiên dùng statusName nếu có
  if (statusName) {
    const matched = Object.values(CV_STATUS).find(
      (v) => v.toLowerCase() === statusName.toLowerCase(),
    );
    if (matched) return matched;
  }

  // Xử lý string status
  if (typeof status === "string") {
    const matched = Object.values(CV_STATUS).find(
      (v) => v.toLowerCase() === status.toLowerCase(),
    );
    if (matched) return matched;
    return CV_STATUS.PENDING;
  }

  // Xử lý number status (enum từ backend)
  const map: Record<number, CVStatus> = {
    1: CV_STATUS.PENDING,
    2: CV_STATUS.UPLOADED,
    3: CV_STATUS.PROCESSING,
    4: CV_STATUS.COMPLETED,
    5: CV_STATUS.ANALYZED,
    6: CV_STATUS.FAILED,
  };

  return map[status] ?? CV_STATUS.PENDING;
};

// ============ RAW RESPONSE TYPES ============

// POST /api/v1/CV/upload
export type CVUploadResponse = {
  cvId: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadedAt: string;
  status: RawStatus;
  statusName?: string;
  downloadUrl: string | null;
};

// GET /api/v1/CV/my-cvs (paginated)
export type CVListResponse = {
  data: CVListItemResponse[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type CVListItemResponse = {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: RawStatus;
  statusName: string;
  totalSkills?: number; // Thêm totalSkills từ API mới
};

// GET /api/v1/CV/{id}
export type CVDetailResponse = {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  contentType: string;
  uploadedAt: string;
  processedAt: string | null;
  status: RawStatus;
  statusName: string;
  errorMessage: string | null;
  downloadUrl: string;
  totalSkills?: number; // Thêm totalSkills
};

// ============ TRANSFORMED TYPE (dùng trong component) ============
export type CV = {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  formattedFileSize: string;
  uploadedAt: string;
  status: number;
  statusName: CVStatus;
  totalSkills: number; // Luôn có, default = 0
};

// ============ TRANSFORM FUNCTIONS ============

const baseTransform = (data: {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: RawStatus;
  filePath?: string;
  statusName?: string;
  totalSkills?: number;
}): CV => ({
  id: data.id,
  fileName: data.fileName,
  filePath: data.filePath ?? "",
  fileSize: data.fileSize,
  formattedFileSize: formatFileSize(data.fileSize),
  uploadedAt: data.uploadedAt,
  status: typeof data.status === "number" ? data.status : 0,
  statusName: normalizeStatus(data.status, data.statusName),
  totalSkills: data.totalSkills ?? 0,
});

// Transform từ upload response (có cvId)
export const transformCVUpload = (data: CVUploadResponse): CV =>
  baseTransform({
    id: data.cvId,
    fileName: data.fileName,
    filePath: data.filePath,
    fileSize: data.fileSize,
    uploadedAt: data.uploadedAt,
    status: data.status,
    statusName: data.statusName,
  });

// Transform từ list item response
export const transformCVItem = (data: CVListItemResponse): CV =>
  baseTransform({
    id: data.id,
    fileName: data.fileName,
    fileSize: data.fileSize,
    uploadedAt: data.uploadedAt,
    status: data.status,
    statusName: data.statusName,
    totalSkills: data.totalSkills,
  });

// Transform từ detail response
export const transformCVDetail = (data: CVDetailResponse): CV =>
  baseTransform({
    id: data.id,
    fileName: data.fileName,
    filePath: data.filePath,
    fileSize: data.fileSize,
    uploadedAt: data.uploadedAt,
    status: data.status,
    statusName: data.statusName,
    totalSkills: data.totalSkills,
  });