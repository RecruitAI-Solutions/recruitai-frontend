import { CV_STATUS, type CVStatus } from "../types/cv.types";

const STATUS_CONFIG: Record<CVStatus, { label: string; className: string }> = {
  [CV_STATUS.PENDING]: {
    label: "Chờ xử lý",
    className: "bg-yellow-100 text-yellow-700",
  },
  [CV_STATUS.PROCESSING]: {
    label: "Đang xử lý",
    className: "bg-blue-100 text-blue-700 animate-pulse",
  },
  [CV_STATUS.COMPLETED]: {
    label: "Hoàn thành",
    className: "bg-green-100 text-green-700",
  },
  [CV_STATUS.FAILED]: {
    label: "Thất bại",
    className: "bg-red-100 text-red-700",
  },
};

type Props = { status: CVStatus };

export const CVStatusBadge = ({ status }: Props) => {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};
