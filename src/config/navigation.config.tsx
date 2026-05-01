import {
  Home,
  Briefcase,
  LayoutDashboard,
  FileText,
  Upload,
  User,
  Plus,
  Users,
  BarChart,
  FolderOpen,
} from "lucide-react";
import { ROUTES } from "./routes.config";

export type Role = "guest" | "candidate" | "recruiter" | "admin";

export type NavItemProps = {
  label: string;
  to: string;
  icon?: React.ReactNode;
};

export type NavGroup = {
  title?: string;
  roles: Role[];
  layout: "header" | "sidebar" | "dashboard-header";
  items: NavItemProps[];
};

export const NAV_CONFIG: NavGroup[] = [
  // PUBLIC HEADER
  {
    roles: ["guest", "candidate", "recruiter", "admin"],
    layout: "header",
    items: [
      {
        label: "Trang chủ",
        to: ROUTES.HOME,
        icon: <Home className="w-4 h-4" />,
      },
      {
        label: "Việc làm",
        to: ROUTES.JOB,
        icon: <Briefcase className="w-4 h-4" />,
      },
    ],
  },
  // CANDIDATE DASHBOARD HEADER
  {
    roles: ["candidate"],
    layout: "dashboard-header",
    items: [
      {
        label: "Trang chủ",
        to: ROUTES.HOME,
        icon: <Home className="w-4 h-4" />,
      },
      {
        label: "Việc làm",
        to: ROUTES.JOB,
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        label: "Dashboard",
        to: ROUTES.CANDIDATE.DASHBOARD,
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      // {
      //   label: "Find Jobs",
      //   to: ROUTES.JOB,
      //   icon: <Briefcase className="w-4 h-4" />,
      // },
      {
        label: "CV của tôi",
        to: ROUTES.CANDIDATE.CV_MANAGEMENT,
        icon: <Upload className="w-4 h-4" />,
      },
      {
        label: "Đơn ứng tuyển",
        to: ROUTES.CANDIDATE.APPLICATIONS,
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Tài khoản",
        to: ROUTES.PROFILE,
        icon: <User className="w-4 h-4" />,
      },
    ],
  },
  // RECRUITER SIDEBAR
  {
    title: "NAVIGATION",
    roles: ["recruiter"],
    layout: "sidebar",
    items: [
      {
        label: "Dashboard",
        to: ROUTES.RECRUITER.DASHBOARD,
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        label: "My Jobs",
        to: ROUTES.RECRUITER.JOBS,
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        label: "Post a Job",
        to: ROUTES.RECRUITER.JOB_CREATE,
        icon: <Plus className="w-4 h-4" />,
      },
      {
        label: "Applications",
        to: ROUTES.RECRUITER.APPLICATIONS_ALL,
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Candidates",
        to: ROUTES.RECRUITER.CANDIDATES,
        icon: <Users className="w-4 h-4" />,
      },
    ],
  },
  // ADMIN SIDEBAR
  {
    title: "ADMIN",
    roles: ["admin"],
    layout: "sidebar",
    items: [
      {
        label: "Dashboard",
        to: ROUTES.ADMIN.DASHBOARD,
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        label: "Người dùng",
        to: ROUTES.ADMIN.USERS,
        icon: <Users className="w-4 h-4" />,
      },
      {
        label: "Việc làm",
        to: ROUTES.ADMIN.JOBS,
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        label: "Đơn ứng tuyển",
        to: ROUTES.ADMIN.APPLICATIONS,
        icon: <FileText className="w-4 h-4" />,
      },
      {
        label: "Kỹ năng",
        to: "/admin/skills",
        icon: <FolderOpen className="w-4 h-4" />,
      },
      {
        label: "Audit Logs",
        to: "/admin/audit-logs",
        icon: <BarChart className="w-4 h-4" />,
      },
      {
        label: "Báo cáo",
        to: "/admin/reports",
        icon: <BarChart className="w-4 h-4" />,
      },
    ],
  },
  // PUBLIC LINK IN SIDEBAR
  {
    title: "TRANG CÔNG KHAI",
    roles: ["recruiter", "admin"],
    layout: "sidebar",
    items: [
      {
        label: "Trang chủ",
        to: ROUTES.HOME,
        icon: <Home className="w-4 h-4" />,
      },
      {
        label: "Danh sách việc làm",
        to: ROUTES.JOB,
        icon: <Briefcase className="w-4 h-4" />,
      },
    ],
  },
  // Guest-only item (nếu muốn hiển thị link "Dành cho NTD" trên header)
  {
    roles: ["guest"],
    layout: "header",
    items: [
      { label: "Dành cho NTD", to: "/recruiter/dashboard" }, // hoặc trang landing cho recruiter
    ],
  },
];
