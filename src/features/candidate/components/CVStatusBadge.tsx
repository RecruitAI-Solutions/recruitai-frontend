import { CVStatus, type CVStatusType } from "../types/cv.types";

const STATUS_CONFIG: Record<
  CVStatusType,
  { label: string; className: string }
> = {
  [CVStatus.PENDING]: {
    label: "Chờ xử lý",
    className: "bg-yellow-100 text-yellow-700",
  },
  [CVStatus.PROCESSING]: {
    label: "Đang xử lý",
    className: "bg-blue-100 text-blue-700 animate-pulse",
  },
  [CVStatus.COMPLETED]: {
    label: "Hoàn thành",
    className: "bg-green-100 text-green-700",
  },
  [CVStatus.FAILED]: {
    label: "Thất bại",
    className: "bg-red-100 text-red-700",
  },
};

type Props = { status: CVStatusType };

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
