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
  Bookmark,
  Bell,
  FileCheck,
} from "lucide-react";
import { QuickCard } from "@/pages/home/QuickCard";
import { StatCard } from "@/pages/home/StatCard";
import { useCandidateDashboard } from "../hooks/useGetCandidateDashboard";

export default function CandidateDashboard() {
  const user = useAppSelector(selectCurrentUser);
  const { data: dashboardData, isLoading, error } = useCandidateDashboard();

  // Dữ liệu mặc định
  const defaultData = {
    newJobsToday: 0,
    totalApplications: 0,
    suggestedJobs: 0,
    reviewedApplications: 0,
    analyzedCVs: 0,
    savedJobs: 0,
    unreadNotifications: 0,
  };

  const stats = dashboardData || defaultData;

  if (isLoading) {
    return (
      <Container className="py-8 space-y-8">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-2xl mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    console.error("Dashboard error:", error);
    // Vẫn hiển thị UI với dữ liệu mặc định
  }

  return (
    <Container className="py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 md:p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Chào mừng trở lại, {user?.fullName?.split(" ")[0] || "User"}! 🎉
          </h2>
          <p className="opacity-90 max-w-2xl">
            Hôm nay là ngày tốt để tìm kiếm cơ hội mới. Khám phá các vị trí phù
            hợp với bạn.
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
              <Button
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                Quản lý CV
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">
          Thao tác nhanh
        </h3>
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
            to={ROUTES.PROFILE}
            icon={<User className="w-5 h-5" />}
            title="Hồ sơ cá nhân"
            desc="Xem và chỉnh sửa thông tin"
          />
        </div>
      </div>

      {/* Stats - Cập nhật theo data thực tế */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-text-primary">Tổng quan</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Việc làm mới hôm nay"
            value={stats.newJobsToday.toString()}
            color="primary"
            icon={<Briefcase className="w-5 h-5" />}
          />
          <StatCard
            label="Đã ứng tuyển"
            value={stats.totalApplications.toString()}
            color="success"
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            label="Việc làm phù hợp"
            value={stats.suggestedJobs.toString()}
            color="warning"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            label="Lượt xem đơn ứng tuyển"
            value={stats.reviewedApplications.toString()}
            color="error"
            icon={<Eye className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Additional Stats - Hàng thứ 2 nếu muốn hiển thị thêm */}
      {
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary">
            Thông tin khác
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {
              <StatCard
                label="CV đã phân tích"
                value={stats.analyzedCVs.toString()}
                color="primary"
                icon={<FileCheck className="w-5 h-5" />}
              />
            }
            {
              <StatCard
                label="Việc làm đã lưu"
                value={stats.savedJobs.toString()}
                color="warning"
                icon={<Bookmark className="w-5 h-5" />}
              />
            }
            {
              <StatCard
                label="Thông báo chưa đọc"
                value={stats.unreadNotifications.toString()}
                color="error"
                icon={<Bell className="w-5 h-5" />}
              />
            }
          </div>
        </div>
      }

      {/* Message when no data */}
      {stats.newJobsToday === 0 &&
        stats.totalApplications === 0 &&
        stats.suggestedJobs === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-text-secondary">Chưa có dữ liệu thống kê</p>
            <p className="text-sm text-text-muted mt-2">
              Hãy bắt đầu tìm kiếm việc làm và upload CV để xem thống kê chi
              tiết
            </p>
          </div>
        )}
    </Container>
  );
}

