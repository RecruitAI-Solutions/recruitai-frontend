import { useState } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { useAdminStats } from "../hooks/useAdminStats";
import { DashboardFilter } from "../components/dashboard/DashboardFilter";
import { TrendChart } from "../components/dashboard/TrendChart";
import { PieChartCard } from "../components/dashboard/PieChartCard";
import { BarChartCard } from "../components/dashboard/BarChartCard";
import { Spin } from "antd";
import { StatCard } from "@/pages/home/StatCard";

export const AdminDashboard = () => {
  const [fromDate, setFromDate] = useState<string | undefined>();
  const [toDate, setToDate] = useState<string | undefined>();

  const { data, isLoading, refetch } = useAdminStats({ fromDate, toDate });

  const handleDateChange = (
    from: string | undefined,
    to: string | undefined,
  ) => {
    setFromDate(from);
    setToDate(to);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Section>
      <Container size="full">
        <h1 className="text-2xl font-bold mb-4">Dashboard Quản trị</h1>

        <DashboardFilter
          fromDate={fromDate}
          toDate={toDate}
          onDateChange={handleDateChange}
          onRefresh={handleRefresh}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : data ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                label="Tổng CV"
                value={data.summary.totalCVs}
                color="primary"
              />
              <StatCard
                label="Tổng Jobs"
                value={data.summary.totalJobs}
                color="primary"
              />
              <StatCard
                label="Tổng Users"
                value={data.summary.totalUsers}
                color="primary"
              />
              <StatCard
                label="Tổng Applications"
                value={data.summary.totalApplications}
                color="primary"
              />
            </div>

            <TrendChart data={data.recentTrend} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <PieChartCard
                data={data.usersByRole}
                title="Phân bố người dùng theo vai trò"
              />
              <BarChartCard
                data={data.applicationsByStatus}
                title="Trạng thái đơn ứng tuyển"
                color="#82ca9d"
              />
            </div>

            <BarChartCard
              data={data.jobsByStatus}
              title="Trạng thái công việc"
              color="#ffc658"
            />
          </>
        ) : null}
      </Container>
    </Section>
  );
};
