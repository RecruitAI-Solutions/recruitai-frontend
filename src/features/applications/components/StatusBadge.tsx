import { Badge, type BadgeProps } from "@/shared/components/ui/Badge";
import {
  APPLICATION_STATUS,
  type ApplicationStatusValue,
} from "../types/application.type";

const STATUS_CONFIG: Record<
  ApplicationStatusValue,
  { label: string; variant: BadgeProps["variant"] }
> = {
  [APPLICATION_STATUS.PENDING]: {
    label: "Chờ duyệt",
    variant: "warning",
  },
  [APPLICATION_STATUS.REVIEWED]: {
    label: "Đã xem",
    variant: "default",
  },
  [APPLICATION_STATUS.ACCEPTED]: {
    label: "Đạt",
    variant: "success",
  },
  [APPLICATION_STATUS.REJECTED]: {
    label: "Từ chối",
    variant: "danger",
  },
};
type Props = { status: ApplicationStatusValue };

export const StatusBadge = ({ status }: Props) => {
  const config = STATUS_CONFIG[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
