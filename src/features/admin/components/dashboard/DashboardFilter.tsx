import { Button, DatePicker } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type Props = {
  fromDate: string | undefined;
  toDate: string | undefined;
  onDateChange: (
    fromDate: string | undefined,
    toDate: string | undefined,
  ) => void;
  onRefresh: () => void;
  isLoading?: boolean;
};

export const DashboardFilter = ({
  fromDate,
  toDate,
  onDateChange,
  onRefresh,
  isLoading,
}: Props) => {
  const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (!dates || !dates[0] || !dates[1]) {
      onDateChange(undefined, undefined);
      return;
    }
    onDateChange(
      dates[0].startOf("day").toISOString(),
      dates[1].endOf("day").toISOString(),
    );
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <RangePicker
        value={
          fromDate && toDate ? [dayjs(fromDate), dayjs(toDate)] : undefined
        }
        onChange={handleRangeChange}
        placeholder={["Từ ngày", "Đến ngày"]}
        format="DD/MM/YYYY"
      />
      <Button icon={<ReloadOutlined />} onClick={onRefresh} loading={isLoading}>
        Làm mới
      </Button>
    </div>
  );
};
