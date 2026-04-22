import { useAppSelector } from "@/app/hooks";
import {
  selectUserRole,
  selectCurrentUser,
} from "@/features/auth/slices/authSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import { Button } from "@/shared/components/ui/Button";
import { Briefcase, FileText, Upload, Users, PlusCircle } from "lucide-react";
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
        title={`Chào mừng trở lại, ${user?.fullName}! 👋`}
        subtitle="Khám phá cơ hội việc làm phù hợp với bạn."
        gradient="from-blue-500 to-blue-600"
        primaryAction={
          <Link to={ROUTES.CANDIDATE.DASHBOARD}>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Vào Dashboard
            </Button>
          </Link>
        }
        secondaryAction={
          <Link to={ROUTES.JOB}>
            <Button
              variant="outline"
              className="bg-white/10 border-white/30 text-white"
            >
              Tìm việc làm
            </Button>
          </Link>
        }
        quickActions={[
          {
            to: ROUTES.CANDIDATE.DASHBOARD,
            label: "Dashboard",
            icon: <Briefcase className="w-4 h-4 text-blue-600" />,
            bg: "bg-white",
            color: "text-blue-600",
          },
          {
            to: ROUTES.JOB,
            label: "Tìm việc làm",
            icon: <Briefcase className="w-4 h-4 text-green-600" />,
            bg: "bg-white",
            color: "text-green-600",
          },
          {
            to: ROUTES.CANDIDATE.APPLICATIONS,
            label: "Đơn ứng tuyển",
            icon: <FileText className="w-4 h-4 text-purple-600" />,
            bg: "bg-white",
            color: "text-purple-600",
          },
          {
            to: ROUTES.CANDIDATE.CV_MANAGEMENT,
            label: "Hồ sơ CV",
            icon: <Upload className="w-4 h-4 text-orange-600" />,
            bg: "bg-white",
            color: "text-orange-600",
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
        title={`Chào mừng trở lại, ${user?.fullName}! 🎯`}
        subtitle="Quản lý tuyển dụng và tìm kiếm ứng viên."
        gradient="from-green-500 to-green-600"
        primaryAction={
          <Link to={ROUTES.RECRUITER.DASHBOARD}>
            <Button className="bg-white text-green-600">Vào Dashboard</Button>
          </Link>
        }
        secondaryAction={
          <Link to={ROUTES.JOB}>
            <Button className="bg-white/10 border-white/30 text-white">
              Tìm việc làm
            </Button>
          </Link>
        }
        quickActions={[
          {
            to: ROUTES.RECRUITER.DASHBOARD,
            label: "Dashboard",
            icon: <Briefcase className="w-4 h-4 text-green-600" />,
            bg: "bg-white",
            color: "text-green-600",
          },
          {
            to: ROUTES.RECRUITER.JOB_CREATE,
            label: "Đăng tin",
            icon: <PlusCircle className="w-4 h-4 text-blue-600" />,
            bg: "bg-white",
            color: "text-blue-600",
          },
          {
            to: ROUTES.RECRUITER.JOBS,
            label: "Tin đăng",
            icon: <FileText className="w-4 h-4 text-purple-600" />,
            bg: "bg-white",
            color: "text-purple-600",
          },
          {
            to: "/recruiter/applications",
            label: "Ứng viên",
            icon: <Users className="w-4 h-4 text-orange-600" />,
            bg: "bg-white",
            color: "text-orange-600",
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
            <Button className="bg-white text-purple-600">Vào Dashboard</Button>
          </Link>
        }
        quickActions={[
          {
            to: ROUTES.ADMIN.USERS,
            label: "Users",
            icon: <Users className="w-4 h-4 text-blue-600" />,
            bg: "bg-white",
            color: "text-blue-600",
          },
          {
            to: ROUTES.ADMIN.JOBS,
            label: "Jobs",
            icon: <Briefcase className="w-4 h-4 text-green-600" />,
            bg: "bg-white",
            color: "text-green-600",
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
          <Button>Tìm việc làm</Button>
        </Link>
      }
      secondaryAction={
        <Link to={ROUTES.LOGIN}>
          <Button variant="outline">Đăng tin tuyển dụng</Button>
        </Link>
      }
    />
  );
};
