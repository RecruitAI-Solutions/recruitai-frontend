import { useLogout } from "../hooks/useLogout";

export const LogoutButton = ({ variant = "full", className = "" }) => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      logout();
    }
  };

  if (variant === "icon") {
    return (
      <button
        onClick={handleLogout}
        disabled={isPending}
        className={`p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 ${className}`}
        title="Đăng xuất"
      >
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    );
  }

  if (variant === "text") {
    return (
      <button
        onClick={handleLogout}
        disabled={isPending}
        className={`px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 ${className}`}
      >
        {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className={`
        flex items-center gap-2 px-4 py-2 
        bg-red-50 text-red-600 rounded-lg
        hover:bg-red-100 transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>

      <span className="font-medium">
        {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
      </span>
    </button>
  );
};
