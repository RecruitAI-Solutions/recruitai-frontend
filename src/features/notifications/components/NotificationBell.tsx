import { useEffect } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useUnreadCount } from "../hooks/useUnreadCount";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice";

export const NotificationBell = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: unreadCount, refetch } = useUnreadCount(isAuthenticated);

  useEffect(() => {
    const handler = () => {
      refetch();
    };
    window.addEventListener("new-notification", handler);
    return () => window.removeEventListener("new-notification", handler);
  }, [refetch]);

  if (!isAuthenticated) return null;

  const count = unreadCount ?? 0;

  return (
    <Link to="/notifications" className="relative p-2">
      <Bell className="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
      {count > 0 && (
        <>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {count > 99 ? "99+" : count}
          </span>
          <span className="absolute -top-1 -right-1 animate-ping bg-red-400 text-white text-xs rounded-full h-5 w-5" />
        </>
      )}
    </Link>
  );
};
