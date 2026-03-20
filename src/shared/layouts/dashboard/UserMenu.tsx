import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/slices/authSlice";

export const UserMenu = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-[var(--color-primary)] font-semibold text-sm">
          {user?.fullName?.charAt(0)}
        </span>
      </div>

      {/* User info (hidden on mobile) */}
      <div className="hidden md:block text-sm">
        <div className="font-medium text-gray-900">{user?.fullName}</div>
        <div className="text-xs text-gray-500">{user?.roleName}</div>
      </div>
    </div>
  );
};
