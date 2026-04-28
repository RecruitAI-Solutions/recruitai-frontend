import { useAppSelector } from "@/app/hooks";
import {
  selectUserRole,
  selectCurrentUser,
} from "@/features/auth/slices/authSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Button } from "@/shared/components/ui/Button";
import {
  Briefcase,
  FileText,
  Upload,
  Users,
  PlusCircle,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";
import { HeroSection } from "./HeroSection";

export const HeroByRole = () => {
  const role = useAppSelector(selectUserRole) || "guest";
  const user = useAppSelector(selectCurrentUser);

  if (role === "candidate") {
    return (
      <HeroSection
        user={{
          name: user?.fullName || "",
          email: user?.email || "",
        }}
        badge="Ứng viên"
        title={`Chào mừng trở lại, ${user?.fullName || "User"}! 👋`}
        subtitle="Khám phá cơ hội việc làm phù hợp với bạn."
        gradient="from-primary to-primary/80"
        primaryAction={
          <Link to={ROUTES.CANDIDATE.DASHBOARD}>
            <Button
              variant="outline"
              className="!bg-white/10 !border-white/50 !text-white hover:!bg-white/20"
            >
              Dashboard
            </Button>
          </Link>
        }
        secondaryAction={
          <Link to={ROUTES.JOB}>
            <Button
              variant="outline"
              className="!bg-white/10 !border-white/30 !text-white hover:!bg-white/20"
            >
              Tìm việc ngay
            </Button>
          </Link>
        }
        quickActions={[
          {
            to: ROUTES.CANDIDATE.DASHBOARD,
            label: "Dashboard",
            icon: <LayoutDashboard className="w-4 h-4 text-black" />,
            bg: "bg-white",
            color: "text-black",
          },
          {
            to: ROUTES.JOB,
            label: "Tìm việc",
            icon: <Search className="w-4 h-4 text-black" />,
            bg: "bg-white",
            color: "text-black",
          },
          {
            to: ROUTES.CANDIDATE.APPLICATIONS,
            label: "Đơn ứng tuyển",
            icon: <FileText className="w-4 h-4 text-black" />,
            bg: "bg-white",
            color: "text-black",
          },
          {
            to: ROUTES.CANDIDATE.CV_MANAGEMENT,
            label: "Quản lý CV",
            icon: <Upload className="w-4 h-4 text-black" />,
            bg: "bg-white",
            color: "text-black",
          },
        ]}
      />
    );
  }

  if (role === "recruiter") {
    return (
      <HeroSection
        user={{
          name: user?.fullName || "",
          email: user?.email || "",
        }}
        badge="Nhà tuyển dụng"
        title={`Chào mừng trở lại, ${user?.fullName?.split(" ")[0] || "User"}! 🎯`}
        subtitle="Quản lý tuyển dụng và tìm kiếm ứng viên."
        gradient="from-success to-success/80"
        primaryAction={
          <Link to={ROUTES.RECRUITER.DASHBOARD}>
            <Button
              variant="outline"
              className="!bg-white/10 !border-white/50 !text-white hover:!bg-white/20"
            >
              Dashboard
            </Button>
          </Link>
        }
        secondaryAction={
          <Link to={ROUTES.JOB}>
            <Button
              variant="outline"
              className="!bg-white/10 !border-white/30 !text-white hover:!bg-white/20"
            >
              Tìm việc
            </Button>
          </Link>
        }
        quickActions={[
          {
            to: ROUTES.RECRUITER.DASHBOARD,
            label: "Dashboard",
            icon: <LayoutDashboard className="w-4 h-4 text-gray-700" />,
            bg: "bg-white",
            color: "text-gray-800",
          },
          {
            to: ROUTES.RECRUITER.JOB_CREATE,
            label: "Đăng tin",
            icon: <PlusCircle className="w-4 h-4 text-gray-700" />,
            bg: "bg-white",
            color: "text-gray-800",
          },
          {
            to: ROUTES.RECRUITER.JOBS,
            label: "Tin đăng",
            icon: <Briefcase className="w-4 h-4 text-gray-700" />,
            bg: "bg-white",
            color: "text-gray-800",
          },
          {
            to: "/recruiter/applications",
            label: "Ứng viên",
            icon: <Users className="w-4 h-4 text-gray-700" />,
            bg: "bg-white",
            color: "text-gray-800",
          },
        ]}
      />
    );
  }

  if (role === "admin") {
    return (
      <HeroSection
        user={{
          name: user?.fullName || "",
          email: user?.email || "",
        }}
        badge="Quản trị viên"
        title="Chào mừng, Admin! 🛡️"
        subtitle="Quản lý toàn bộ hệ thống."
        gradient="from-purple-500 to-purple-600"
        primaryAction={
          <Link to={ROUTES.ADMIN.DASHBOARD}>
            <Button
              variant="outline"
              className="!bg-white/10 !border-white/50 !text-white hover:!bg-white/20"
            >
              Dashboard
            </Button>
          </Link>
        }
        quickActions={[
          {
            to: ROUTES.ADMIN.USERS,
            label: "Người dùng",
            icon: <Users className="w-4 h-4 text-gray-700" />,
            bg: "bg-white",
            color: "text-gray-800",
          },
          {
            to: ROUTES.ADMIN.JOBS,
            label: "Việc làm",
            icon: <Briefcase className="w-4 h-4 text-gray-700" />,
            bg: "bg-white",
            color: "text-gray-800",
          },
          {
            to: ROUTES.ADMIN.REPORTS,
            label: "Báo cáo",
            icon: <Settings className="w-4 h-4 text-gray-700" />,
            bg: "bg-white",
            color: "text-gray-800",
          },
        ]}
      />
    );
  }

  // guest
  return (
    <HeroSection
      badge="#1 Job Portal"
      title="Hành Trình Sự Nghiệp Mơ Ước Bắt Đầu Tại Đây"
      subtitle="Kết nối với hàng ngàn doanh nghiệp."
      gradient="from-gray-900 to-gray-700"
      primaryAction={
        <Link to={ROUTES.JOB}>
          <Button
            variant="outline"
            className="!bg-white !text-gray-900 hover:!bg-gray-100"
          >
            Tìm việc làm
          </Button>
        </Link>
      }
      secondaryAction={
        <Link to={ROUTES.LOGIN}>
          <Button
            variant="outline"
            className="!border-white/50 !text-white hover:!bg-white/10"
          >
            Đăng nhập
          </Button>
        </Link>
      }
    />
  );
};

