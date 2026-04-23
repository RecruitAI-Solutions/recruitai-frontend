// features/admin/components/dashboard/BarChartCard.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "antd";

type Props = {
  data: Record<string, number>;
  title: string;
  color?: string;
};

export const BarChartCard = ({ data, title, color = "#8884d8" }: Props) => {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
