import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useUnreadCount } from "../hooks/useUnreadCount";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/auth/slices/authSlice";
import toast from "react-hot-toast";

export const NotificationBell = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: unreadCount } = useUnreadCount(isAuthenticated);

  const [liveCount, setLiveCount] = useState<number>(unreadCount ?? 0);

  useEffect(() => {
    if (unreadCount !== undefined) {
      setLiveCount(unreadCount);
    }
  }, [unreadCount]);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      setLiveCount((prev) => prev + 1);
    };
    window.addEventListener("new-notification", handler as EventListener);
    return () =>
      window.removeEventListener("new-notification", handler as EventListener);
  }, []);

  useEffect(() => {
    const handler = (event: CustomEvent) => {
      const notification = event.detail;
      setLiveCount((prev) => prev + 1);
      toast(notification.title, {
        icon: "🔔",
        duration: 5000,
      });
    };
    window.addEventListener("new-notification", handler as EventListener);
    return () =>
      window.removeEventListener("new-notification", handler as EventListener);
  }, []);

  if (!isAuthenticated) return null;

  return (
    <Link to="/notifications" className="relative p-2">
      <Bell className="w-5 h-5 text-text-secondary hover:text-primary transition-colors" />
      {liveCount > 0 && (
        <>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {liveCount > 99 ? "99+" : liveCount}
          </span>
          <span className="absolute -top-1 -right-1 animate-ping bg-red-400 text-white text-xs rounded-full h-5 w-5" />
        </>
      )}
    </Link>
  );
};
