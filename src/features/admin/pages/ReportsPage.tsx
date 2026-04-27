import { useState } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Card, DatePicker, Select, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
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
import dayjs from "dayjs";
import {
  useJobsByMonthReport,
  useApplicationsByMonthReport,
} from "../hooks/useAdminReports";

const currentYear = dayjs().year();

export const ReportsPage = () => {
  const [year, setYear] = useState<number>(currentYear);
  const [appStatus, setAppStatus] = useState<number | undefined>(undefined);

  const {
    data: jobsReport,
    isLoading: jobsLoading,
    refetch: refetchJobs,
  } = useJobsByMonthReport({ year });
  const {
    data: appsReport,
    isLoading: appsLoading,
    refetch: refetchApps,
  } = useApplicationsByMonthReport({
    year,
    status: appStatus,
  });

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const jobChartData =
    jobsReport?.data.map((item) => ({
      name: monthNames[item.month - 1],
      "Số lượng": item.total,
    })) || [];

  const appChartData =
    appsReport?.data.map((item) => ({
      name: monthNames[item.month - 1],
      Tổng: item.total,
      "Chờ duyệt": item.pending,
      "Đã xem": item.reviewed,
      Đạt: item.accepted,
      "Từ chối": item.rejected,
    })) || [];

  return (
    <Section>
      <Container size="full">
        <h1 className="text-2xl font-bold mb-6">Báo cáo thống kê</h1>

        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Năm</label>
            <DatePicker
              picker="year"
              value={dayjs().year(year)}
              onChange={(date) => date && setYear(date.year())}
              allowClear={false}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Trạng thái ứng tuyển
            </label>
            <Select
              placeholder="Tất cả"
              allowClear
              style={{ width: 160 }}
              value={appStatus}
              onChange={(val) => setAppStatus(val)}
              options={[
                { value: 1, label: "Chờ duyệt" },
                { value: 2, label: "Đã xem" },
                { value: 3, label: "Đạt" },
                { value: 4, label: "Từ chối" },
              ]}
            />
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              refetchJobs();
              refetchApps();
            }}
          >
            Làm mới
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card title={`Công việc theo tháng năm ${year}`}>
            {jobsLoading ? (
              <div className="text-center py-8">Đang tải...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Số lượng" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>

          <Card title={`Đơn ứng tuyển theo tháng năm ${year}`}>
            {appsLoading ? (
              <div className="text-center py-8">Đang tải...</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={appChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Tổng" fill="#8884d8" />
                  <Bar dataKey="Chờ duyệt" fill="#82ca9d" />
                  <Bar dataKey="Đã xem" fill="#ffc658" />
                  <Bar dataKey="Đạt" fill="#ff7300" />
                  <Bar dataKey="Từ chối" fill="#ff4d4f" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
};
