import { Container } from "@/shared/layouts/Container";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";
// import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
// import { Button } from "@/shared/components/ui/Button";
import {
  Briefcase,
  PlusCircle,
  FileText,
  Users,
  UserCheck,
  Eye,
} from "lucide-react";
import { useGetMyJobs } from "../hooks/useGetMyJobs";
import { QuickCard } from "@/pages/home/QuickCard";
import { StatCard } from "@/pages/home/StatCard";
import { useRecruiterApplications } from "@/features/applications/hooks/useRecruiterApplications";
import { useRecruiterCandidates } from "@/features/applications/hooks/useRecruiterCandidates";
import { DashboardJobTable } from "../components/DashboardJobTable";
import { Link } from "react-router-dom";

export default function RecruiterDashboard() {
  const user = useAppSelector(selectCurrentUser);

  const { data: myJobsData } = useGetMyJobs();
  const { data: appsData } = useRecruiterApplications();
  const { data: candidatesData } = useRecruiterCandidates();

  const jobs = myJobsData?.data ?? [];
  const totalApplications = appsData?.total ?? 0;
  const totalCandidates = candidatesData?.total ?? 0;

  return (
    <Container size="full" className="py-8 space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Chào mừng trở lại, {user?.fullName}! 😊
        </h2>
        <p className="opacity-90">
          Quản lý tin tuyển dụng và tìm kiếm ứng viên tài năng cho tổ chức của
          bạn.
        </p>
        {/* <div className="flex gap-4 mt-4"> */}
        {/*   <Link to={ROUTES.RECRUITER.DASHBOARD}> */}
        {/*     <Button variant="secondary" className="!text-white"> */}
        {/*       Vào Dashboard */}
        {/*     </Button> */}
        {/*   </Link> */}
        {/*   <Link to={ROUTES.JOB}> */}
        {/*     <Button */}
        {/*       variant="outline" */}
        {/*       className="bg-transparent border-white text-white hover:bg-white/10" */}
        {/*     > */}
        {/*       Tìm việc làm */}
        {/*     </Button> */}
        {/*   </Link> */}
        {/* </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <QuickCard
          to={ROUTES.RECRUITER.DASHBOARD}
          icon={<Briefcase />}
          title="Dashboard"
          desc="Tổng quan"
        />
        <QuickCard
          to={ROUTES.RECRUITER.JOB_CREATE}
          icon={<PlusCircle />}
          title="Đăng tin tuyển dụng"
          desc="Thêm một công việc mới"
        />
        <QuickCard
          to={ROUTES.RECRUITER.APPLICATIONS_ALL}
          icon={<Users />}
          title="Hồ sơ ứng tuyển"
          desc="Xem danh sách ứng tuyển của mình"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Briefcase className="w-5 h-5" />}
          label="Tin đang tuyển"
          value={jobs.length}
          color="primary"
        />
        <StatCard
          icon={<FileText className="w-5 h-5" />}
          label="Đơn ứng tuyển"
          value={totalApplications}
          color="warning"
        />
        <StatCard
          icon={<UserCheck className="w-5 h-5" />}
          label="Ứng viên"
          value={totalCandidates}
          color="success"
        />
      </div>

      <div className="p-4 border border-border rounded-xl">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold mb-4">Việc làm của bạn</h3>

          <Link
            to={ROUTES.RECRUITER.JOBS}
            className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
          >
            <Eye className="w-4 h-4" /> Xem tất cả
          </Link>
        </div>

        <DashboardJobTable jobs={jobs.slice(0, 5)} loading={false} />
      </div>

      <div className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-text-primary">
              Liên hệ ứng viên ngay
            </h4>
            <p className="text-sm text-text-secondary">
              Liên hệ trực tiếp với các ứng viên đáp ứng đủ điều kiện.
            </p>
          </div>
        </div>
        <Link
          to={ROUTES.RECRUITER.CANDIDATES}
          className="text-primary hover:underline font-medium text-sm flex items-center gap-1"
        >
          Xem ứng viên →
        </Link>
      </div>
    </Container>
  );
}
