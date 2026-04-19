import { Container } from "@/shared/layouts/Container";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Button } from "@/shared/components/ui/Button";
import {
  Briefcase,
  Upload,
  User,
  FileText,
  TrendingUp,
  Eye,
} from "lucide-react";
import { QuickCard } from "@/pages/home/QuickCard";
import { StatCard } from "@/pages/home/StatCard";

export default function CandidateDashboard() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <Container className="py-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Chào mừng trở lại, {user?.fullName}! 🎉
        </h2>
        <p className="opacity-90">
          Hôm nay là ngày tốt để tìm kiếm cơ hội mới. Khám phá các vị trí phù
          hợp với bạn.
        </p>
        <div className="flex gap-4 mt-4">
          <Link to={ROUTES.CANDIDATE.DASHBOARD}>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <QuickCard
          to={ROUTES.JOB}
          icon={<Briefcase />}
          title="Tìm việc làm"
          desc="Khám phá cơ hội mới"
        />
        <QuickCard
          to={ROUTES.CANDIDATE.CV_MANAGEMENT}
          icon={<Upload />}
          title="Upload CV"
          desc="Quản lý hồ sơ của bạn"
        />
        <QuickCard
          to={ROUTES.CANDIDATE.PROFILE}
          icon={<User />}
          title="Hồ sơ cá nhân"
          desc="Xem và chỉnh sửa thông tin"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          value="24"
          label="Việc làm mới hôm nay"
          icon={<Briefcase />}
        />
        <StatCard value="3" label="Đã ứng tuyển" icon={<FileText />} />
        <StatCard value="12" label="Tin phù hợp" icon={<TrendingUp />} />
        <StatCard value="58" label="Hồ sơ đã xem" icon={<Eye />} />
      </div>
    </Container>
  );
}
// QuickCard, StatCard
