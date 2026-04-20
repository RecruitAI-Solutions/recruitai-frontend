import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "antd";
import type { AdminStatsResponse } from "../../types/admin.types";

type Props = {
  data: AdminStatsResponse["recentTrend"];
};

export const TrendChart = ({ data }: Props) => {
  if (
    !data ||
    !data.cvsLast7Days ||
    !data.jobsLast7Days ||
    !data.applicationsLast7Days
  ) {
    return (
      <Card title="Xu hướng 7 ngày gần nhất" className="mb-6">
        <div className="h-[300px] flex items-center justify-center text-text-secondary">
          Không có dữ liệu
        </div>
      </Card>
    );
  }
  const chartData = data.cvsLast7Days.map((_, index) => ({
    day: `Ngày ${index + 1}`,
    CV: data.cvsLast7Days[index],
    "Công việc": data.jobsLast7Days[index],
    "Ứng tuyển": data.applicationsLast7Days[index],
  }));

  return (
    <Card title="Xu hướng 7 ngày gần nhất" className="mb-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="CV" stroke="#8884d8" />
          <Line type="monotone" dataKey="Công việc" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Ứng tuyển" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
