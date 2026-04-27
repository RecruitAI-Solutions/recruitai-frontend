export type NotificationType =
  | "application_update"
  | "cv_processed"
  | "job_update"
  | "job_match"
  | "account_update"
  | "job_saved";

export const NOTIFICATION_TYPE_LABEL: Record<NotificationType, string> = {
  application_update: "Cập nhật đơn ứng tuyển",
  cv_processed: "CV được xử lý",
  job_update: "Cập nhật công việc",
  job_match: "Công việc phù hợp",
  account_update: "Tài khoản",
  job_saved: "Lưu công việc",
};

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: NotificationType;
  isRead: boolean;
  data: string | null;
  createdAt: string;
}

export interface NotificationListResponse {
  data: NotificationItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface GetNotificationsParams {
  page?: number;
  pageSize?: number;
  isRead?: boolean;
}

export type UnreadCountResponse = number;

export type MarkAsReadResponse = string;

export type MarkAllReadResponse = string;
