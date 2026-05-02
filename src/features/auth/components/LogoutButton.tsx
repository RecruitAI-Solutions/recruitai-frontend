import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { ConfirmDialog } from "@/shared/components/ui/ConfirmDialog";
import { LogOutIcon } from "lucide-react";

export const LogoutButton = ({ variant = "full", className = "" }) => {
  const { mutate: logout, isPending } = useLogout();
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleLogoutClick = () => {
    setOpenConfirm(true);
  };

  if (variant === "icon") {
    return (
      <>
        <button
          onClick={handleLogoutClick}
          disabled={isPending}
          className={`flex items-center gap-1 text-error p-2 bg-red-50 cursor-pointer rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 ${className}`}
        >
          <LogOutIcon color="red" />
          <span>Đăng xuất</span>
        </button>

        <ConfirmDialog
          open={openConfirm}
          onOpenChange={setOpenConfirm}
          title="Đăng xuất?"
          description="Bạn sẽ cần đăng nhập lại."
          confirmText="Đăng xuất"
          cancelText="Hủy"
          variant="destructive"
          onConfirm={() => {
            logout();
            setOpenConfirm(false);
          }}
        />
      </>
    );
  }

  if (variant === "text") {
    return (
      <>
        <button
          onClick={handleLogoutClick}
          disabled={isPending}
          className={`px-4 py-2 text-sm font-medium ${className}`}
        >
          {isPending ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>

        <ConfirmDialog
          open={openConfirm}
          onOpenChange={setOpenConfirm}
          title="Đăng xuất?"
          description="Bạn sẽ cần đăng nhập lại."
          confirmText="Đăng xuất"
          cancelText="Hủy"
          variant="destructive"
          onConfirm={() => {
            logout();
            setOpenConfirm(false);
          }}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleLogoutClick}
        disabled={isPending}
        className={`flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg ${className}`}
      >
        <span>{isPending ? "Đang đăng xuất..." : "Đăng xuất"}</span>
      </button>

      <ConfirmDialog
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title="Đăng xuất?"
        description="Bạn sẽ cần đăng nhập lại."
        confirmText="Đăng xuất"
        cancelText="Hủy"
        variant="destructive"
        onConfirm={() => {
          logout();
          setOpenConfirm(false);
        }}
      />
    </>
  );
};
