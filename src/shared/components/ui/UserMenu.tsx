import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/Avatar";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { selectCurrentUser, logout } from "@/features/auth/slices/authSlice";
import { usePermission } from "@/lib/usePermission";
import { PERMISSIONS } from "@/config/permissions.constants";
import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes.config";
import {
  User,
  KeyRound,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  FileText,
  Briefcase,
  Bell,
  Heart,
  Clock,
  Award,
  MessageSquare,
  Star,
  HelpCircle,
} from "lucide-react";

export const UserMenu = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { can } = usePermission();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const role = user?.role;

  return (
    <DropdownMenu.Root>
      {/* Trigger */}
      <DropdownMenu.Trigger asChild>
        <button className="outline-none focus:ring-2 focus:ring-primary/50 rounded-full transition-all">
          <div className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-primary/5 transition-colors">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(user?.fullName)}
              </AvatarFallback>
            </Avatar>
            {role?.toLocaleLowerCase() === "candidate" ? (
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            ) : (
              <ChevronUp className="w-4 h-4 text-text-secondary" />
            )}
          </div>
        </button>
      </DropdownMenu.Trigger>

      {/* Content */}
      <DropdownMenu.Content
        align="end"
        sideOffset={8}
        className="
           w-64 rounded-xl 
            bg-surface 
            border border-border 
            shadow-2xl shadow-black/20 dark:shadow-black/40
            p-1 z-[99999]
            animate-in fade-in-0 zoom-in-95 duration-100
            ring-1 ring-black/5 dark:ring-white/10
        "
      >
        {/* User info */}
        <div className="px-3 py-3 border-b border-border">
          <p className="text-sm font-semibold text-text-primary line-clamp-1">
            {user?.fullName}
          </p>
          <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
            {user?.email}
          </p>
        </div>

        {/* === QUICK ACTIONS === */}
        <div className="py-1">
          <p className="px-3 py-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
            Nhanh
          </p>

          {/* Dashboard */}
          <DropdownMenu.Item asChild>
            <Link
              to={ROUTES.CANDIDATE.DASHBOARD}
              className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5"
            >
              <Briefcase className="w-4 h-4 text-text-secondary" />
              <span>Tổng quan</span>
            </Link>
          </DropdownMenu.Item>

          {/* CV Management */}
          <DropdownMenu.Item asChild>
            <Link
              to={ROUTES.CANDIDATE.CV_MANAGEMENT}
              className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5"
            >
              <FileText className="w-4 h-4 text-text-secondary" />
              <span>Quản lý CV</span>
            </Link>
          </DropdownMenu.Item>

          {/* Saved Jobs */}
          <DropdownMenu.Item asChild>
            <Link
              to={ROUTES.CANDIDATE.SAVED_JOBS}
              className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5"
            >
              <Heart className="w-4 h-4 text-text-secondary" />
              <span>Việc làm đã lưu</span>
            </Link>
          </DropdownMenu.Item>

          {/* Applications */}
          <DropdownMenu.Item asChild>
            <Link
              to={ROUTES.CANDIDATE.APPLICATIONS}
              className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5"
            >
              <Clock className="w-4 h-4 text-text-secondary" />
              <span>Đơn đã ứng tuyển</span>
            </Link>
          </DropdownMenu.Item>
        </div>

        {/* === ACCOUNT === */}
        {can(PERMISSIONS.EDIT_PROFILE) && (
          <div className="py-1">
            <p className="px-3 py-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
              Tài khoản
            </p>

            <DropdownMenu.Item asChild>
              <Link
                to={ROUTES.PROFILE}
                className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5"
              >
                <User className="w-4 h-4 text-text-secondary" />
                <span>Hồ sơ cá nhân</span>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link
                to={ROUTES.CHANGE_PASSWORD}
                className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5"
              >
                <KeyRound className="w-4 h-4 text-text-secondary" />
                <span>Đổi mật khẩu</span>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5">
              <Bell className="w-4 h-4 text-text-secondary" />
              <span>Thông báo</span>
            </DropdownMenu.Item>
          </div>
        )}

        {/* === ACHIEVEMENTS === */}
        <div className="py-1">
          <p className="px-3 py-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
            Thành tích
          </p>
          <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5">
            <Award className="w-4 h-4 text-text-secondary" />
            <span>Kỹ năng đã đạt</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5">
            <Star className="w-4 h-4 text-text-secondary" />
            <span>Đánh giá của tôi</span>
          </DropdownMenu.Item>
        </div>

        {/* === SUPPORT === */}
        <div className="py-1">
          <p className="px-3 py-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
            Hỗ trợ
          </p>
          <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5">
            <MessageSquare className="w-4 h-4 text-text-secondary" />
            <span>Trợ giúp</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5">
            <HelpCircle className="w-4 h-4 text-text-secondary" />
            <span>Hướng dẫn sử dụng</span>
          </DropdownMenu.Item>
        </div>

        {/* === ADMIN (if has permission) === */}
        {can(PERMISSIONS.FULL_ACCESS) && (
          <>
            <DropdownMenu.Separator className="my-1 h-px bg-border" />
            <div className="py-1">
              <p className="px-3 py-1 text-xs font-medium text-text-secondary uppercase tracking-wider">
                Quản trị
              </p>
              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5">
                <Users className="w-4 h-4 text-text-secondary" />
                <span>Quản lý người dùng</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 text-sm text-text-primary rounded-lg hover:bg-primary/5 transition-colors cursor-pointer outline-none focus:bg-primary/5">
                <Settings className="w-4 h-4 text-text-secondary" />
                <span>Quản lý hệ thống</span>
              </DropdownMenu.Item>
            </div>
          </>
        )}

        <DropdownMenu.Separator className="my-1 h-px bg-border" />

        {/* Logout */}
        <DropdownMenu.Item
          onClick={() => dispatch(logout())}
          className="flex items-center gap-3 px-3 py-2 text-sm text-error rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer outline-none focus:bg-red-50 dark:focus:bg-red-950/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};