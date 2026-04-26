// src/features/auth/components/AvatarUpload.tsx
import { useState, useRef } from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/Avatar";
import { useUploadAvatar, useDeleteAvatar } from "../hooks/useAvatar";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "../slices/authSlice";
import { Camera, Trash2, Loader2 } from "lucide-react";

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const AvatarUpload = () => {
  const user = useAppSelector(selectCurrentUser);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const { mutate: deleteAvatar, isPending: isDeleting } = useDeleteAvatar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Chỉ chấp nhận JPG, PNG, GIF, WEBP");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(`Kích thước tối đa ${MAX_SIZE_MB}MB`);
      return;
    }

    uploadAvatar(file);
    e.target.value = "";
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const avatarSrc = `${import.meta.env.VITE_API_BASE_AVATAR_URL}${user?.avatar}` || user?.avatar;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar */}
      <div className="relative group">
        <Avatar className="w-32 h-32 ring-4 ring-white shadow-lg">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback className="text-4xl bg-primary/10 text-primary">
            {getInitials(user?.fullName)}
          </AvatarFallback>
        </Avatar>

        {/* Overlay buttons */}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Tải ảnh lên"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            ) : (
              <Camera className="w-4 h-4 text-primary" />
            )}
          </button>
          {user?.avatar && !user.avatar.includes("default") && (
            <button
              onClick={() => deleteAvatar()}
              disabled={isDeleting}
              className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
              title="Xóa ảnh"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 text-red-500 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 text-red-500" />
              )}
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Hint */}
      <p className="text-xs text-text-muted text-center">
        {ALLOWED_TYPES.map((t) => t.replace("image/", ".")).join(", ")} · Tối đa{" "}
        {MAX_SIZE_MB}MB
      </p>
    </div>
  );
};
