import { Container } from "@/shared/layouts/Container";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Button } from "@/shared/components/ui/Button";
import { Briefcase, PlusCircle, FileText, Users } from "lucide-react";
import { JobTable } from "../components/JobTable";
import { useGetMyJobs } from "../hooks/useGetMyJobs";
import { QuickCard } from "@/pages/home/QuickCard";
import { StatCard } from "@/pages/home/StatCard";

export default function RecruiterDashboard() {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetMyJobs();
  const jobs = data?.data ?? [];

  return (
    <Container size="full" className="py-8">
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Chào mừng trở lại, {user?.fullName}! 😊
        </h2>
        <p className="opacity-90">
          Quản lý tin tuyển dụng và tìm kiếm ứng viên tài năng cho tổ chức của
          bạn.
        </p>
        <div className="flex gap-4 mt-4">
          <Link to={ROUTES.RECRUITER.DASHBOARD}>
            <Button variant="secondary">Vào Dashboard</Button>
          </Link>
          <Link to={ROUTES.JOB}>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              Tìm việc làm
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <QuickCard
          to={ROUTES.RECRUITER.DASHBOARD}
          icon={<Briefcase />}
          title="Dashboard"
        />
        <QuickCard
          to={ROUTES.RECRUITER.JOB_CREATE}
          icon={<PlusCircle />}
          title="Đăng tin tuyển dụng"
        />
        <QuickCard
          to={ROUTES.RECRUITER.JOBS}
          icon={<FileText />}
          title="Danh sách tin đăng"
        />
        <QuickCard
          to={ROUTES.RECRUITER.APPLICANTS("")}
          icon={<Users />}
          title="Hồ sơ ứng tuyển"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard value="5" label="Tin đăng đang hoạt động" />
        <StatCard value="18" label="Đơn ứng tuyển mới" />
        <StatCard value="7" label="Ứng viên tiềm năng" />
        <StatCard value="234" label="Tổng lượt xem" />
      </div>
      <h3 className="text-lg font-semibold mb-4">Active Job Posts</h3>
      <JobTable jobs={jobs.slice(0, 5)} />
    </Container>
  );
}
