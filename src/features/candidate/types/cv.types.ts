// CV Status — từ DB Schema: 1=Pending, 2=Processing, 3=Completed, 4=Failed
export const CVStatus = {
  PENDING: 1,
  PROCESSING: 2,
  COMPLETED: 3,
  FAILED: 4,
} as const;

export type CVStatusType = (typeof CVStatus)[keyof typeof CVStatus];

// ---- RAW RESPONSE từ backend ----
export type CVUploadResponse = {
  cvId: string; // ← chỉ endpoint này dùng cvId
  fileName: string;
  filePath: string;
  fileSize: number;
  formattedFileSize: string;
  uploadedAt: string;
  status: CVStatusType;
  statusName: string;
};

export type CVListItemResponse = {
  id: string; // ← id, không phải cvId
  fileName: string;
  fileSize: number;
  formattedFileSize: string;
  uploadedAt: string;
  status: CVStatusType;
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
  status: CVStatusType;
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
  status: CVStatusType;
  statusName: string;
};

// ---- TRANSFORM FUNCTION ----
export const transformCV = (data: CVUploadResponse): CV => ({
  id: data.cvId,
  fileName: data.fileName,
  filePath: data.filePath,
  fileSize: data.fileSize,
  formattedFileSize: data.formattedFileSize,
  uploadedAt: data.uploadedAt,
  status: data.status,
  statusName: data.statusName,
});

// Transform từ upload response (có cvId)
export const transformCVUpload = (data: CVUploadResponse): CV => ({
  id: data.cvId, // ← cvId
  fileName: data.fileName,
  filePath: data.filePath,
  fileSize: data.fileSize,
  formattedFileSize: data.formattedFileSize,
  uploadedAt: data.uploadedAt,
  status: data.status,
  statusName: data.statusName,
});

// Transform từ list/detail response (có id)
export const transformCVItem = (
  data: CVListItemResponse | CVDetailResponse,
): CV => ({
  id: data.id, // ← id
  fileName: data.fileName,
  filePath: "filePath" in data ? data.filePath : "",
  fileSize: data.fileSize,
  formattedFileSize: data.formattedFileSize,
  uploadedAt: data.uploadedAt,
  status: data.status,
  statusName: data.statusName,
});
