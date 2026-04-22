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
  ChevronRight,
} from "lucide-react";
import { QuickCard } from "@/pages/home/QuickCard";
import { StatCard } from "@/pages/home/StatCard";

export default function CandidateDashboard() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Container className="py-8 space-y-8">
      {/* Welcome Banner - Cải thiện gradient và layout */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Chào mừng trở lại, {user?.fullName?.split(" ")[0] || "User"}! 🎉
          </h2>
          <p className="opacity-90 max-w-2xl">
            Hôm nay là ngày tốt để tìm kiếm cơ hội mới. Khám phá các vị trí phù hợp với bạn.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link to={ROUTES.JOB}>
              <Button
                variant="primary"
                className="bg-primary/20 border border-white/30 text-white hover:bg-white/10"
              >
                Tìm việc ngay
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to={ROUTES.CANDIDATE.CV_MANAGEMENT}>
              <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                Quản lý CV
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions - Giữ nguyên nhưng thêm hover effect */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Thao tác nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickCard
            to={ROUTES.JOB}
            icon={<Briefcase className="w-5 h-5" />}
            title="Tìm việc làm"
            desc="Khám phá cơ hội mới"
          />
          <QuickCard
            to={ROUTES.CANDIDATE.CV_MANAGEMENT}
            icon={<Upload className="w-5 h-5" />}
            title="Upload CV"
            desc="Quản lý hồ sơ của bạn"
          />
          <QuickCard
            to={ROUTES.CANDIDATE.PROFILE}
            icon={<User className="w-5 h-5" />}
            title="Hồ sơ cá nhân"
            desc="Xem và chỉnh sửa thông tin"
          />
        </div>
      </div>

      {/* Stats - Giữ nguyên layout */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Tổng quan</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Việc làm mới"
            value="24"
            color="primary"
            icon={<Briefcase className="w-5 h-5" />}
            trend={{ value: 12, isUp: true }}
          />
          <StatCard
            label="Đã ứng tuyển"
            value="3"
            color="success"
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            label="Tin phù hợp"
            value="12"
            color="warning"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            label="Hồ sơ đã xem"
            value="58"
            color="error"
            icon={<Eye className="w-5 h-5" />}
            trend={{ value: 8, isUp: true }}
          />
        </div>
      </div>
    </Container>
  );
}