import { formatFileSize } from "@/lib/utils";

export const CV_STATUS = {
  PENDING: "Pending",
  UPLOADED: "Uploaded",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
  ANALYZED: "Analyzed",
  FAILED: "Failed",
} as const;

export type CVStatus = (typeof CV_STATUS)[keyof typeof CV_STATUS];

export type RawStatus = number | string;

export const normalizeStatus = (
  status: RawStatus,
  statusName?: string,
): CVStatus => {
  if (statusName) {
    const matched = Object.values(CV_STATUS).find(
      (v) => v.toLowerCase() === statusName.toLowerCase(),
    );
    if (matched) return matched;
  }
  if (typeof status === "string") {
    const matched = Object.values(CV_STATUS).find(
      (v) => v.toLowerCase() === status.toLowerCase(),
    );
    if (matched) return matched;
    return CV_STATUS.PENDING;
  }

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

// ---- RAW RESPONSE từ backend ----
export type CVUploadResponse = {
  cvId: string; // ← chỉ endpoint này dùng cvId
  fileName: string;
  filePath: string;
  fileSize: number;
  uploadedAt: string;
  status: RawStatus;
  downloadUrl: string | null;
};

export type CVListItemResponse = {
  id: string; // ← id, không phải cvId
  fileName: string;
  fileSize: number;
  formattedFileSize: string;
  uploadedAt: string;
  status: RawStatus;
  statusName: string;
};

export type CVListPaginatedResponse = {
  data: CVListItemResponse[]; // ← array nằm trong .data
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type CVDetailResponse = {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  contentType: string;
  uploadedAt: string;
  processedAt: string;
  status: RawStatus;
  errorMessage: string;
  downloadUrl: string;
  formattedFileSize: string;
  statusName: string;
};

// GET /api/v1/CV/my-cvs trả về array
export type CVListResponse = CVUploadResponse[];

// ---- TRANSFORMED TYPE dùng trong component ----
export type CV = {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  formattedFileSize: string;
  uploadedAt: string;
  status: CVStatus;
  statusName: string;
};

// ---- TRANSFORM FUNCTION ----
const baseTransform = (data: {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: RawStatus;
  filePath?: string;
  formattedFileSize?: string;
  statusName?: string;
}): CV => ({
  id: data.id,
  fileName: data.fileName,
  filePath: data.filePath ?? "",
  fileSize: data.fileSize,
  formattedFileSize: data.formattedFileSize ?? formatFileSize(data.fileSize),
  uploadedAt: data.uploadedAt,
  status: data.statusName
    ? normalizeStatus(data.statusName)
    : normalizeStatus(data.status),
  statusName: data.statusName ?? normalizeStatus(data.status),
});

// Transform từ upload response (có cvId)
export const transformCVUpload = (data: CVUploadResponse): CV =>
  baseTransform({
    id: data.cvId,
    ...data,
  });

// Transform từ list/detail response (có id)
export const transformCVItem = (
  data: CVListItemResponse | CVDetailResponse,
): CV => baseTransform(data);
