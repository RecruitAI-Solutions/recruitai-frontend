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

export const UserMenu = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const { can } = usePermission();

  const getInitials = (name?: string) => {
    if (!name) return "U";

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) return parts[0][0].toUpperCase();

    const first = parts[0][0];
    const second = parts[parts.length - 1][0];
    return (first + second).toUpperCase();
  };

  return (
    <DropdownMenu.Root>
      {/* Trigger */}
      <DropdownMenu.Trigger asChild>
        <button className="outline-none">
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenu.Trigger>

      {/* Content */}
      <DropdownMenu.Content
        align="end"
        className="
          w-56 rounded-lg bg-surface border border-border shadow-lg p-2
        "
      >
        {/* User info */}
        <div className="px-2 py-2 border-b">
          <p className="text-sm font-medium text-text-primary">
            {user?.fullName}
          </p>
          <p className="text-xs text-text-secondary">{user?.email}</p>
        </div>

        {/* Actions */}
        {can(PERMISSIONS.EDIT_PROFILE) && (
          <>
            <DropdownMenu.Item className="menu-item">
              Hồ sơ cá nhân
            </DropdownMenu.Item>
            <DropdownMenu.Item className="menu-item">
              Đổi mật khẩu
            </DropdownMenu.Item>

            <DropdownMenu.Item className="menu-item">
              Xác thực tài khoản
            </DropdownMenu.Item>
          </>
        )}

        {can(PERMISSIONS.FULL_ACCESS) && (
          <>
            <DropdownMenu.Separator className="my-2 h-px bg-border" />
            <DropdownMenu.Item className="menu-item">
              Quản lý người dùng
            </DropdownMenu.Item>
            <DropdownMenu.Item className="menu-item">
              Quản lý hệ thống
            </DropdownMenu.Item>
          </>
        )}
        <DropdownMenu.Separator className="my-2 h-px bg-border" />
        <DropdownMenu.Item
          onClick={() => dispatch(logout())}
          className="menu-item text-error"
        >
          Đăng xuất
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
