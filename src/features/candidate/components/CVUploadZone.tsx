import { useRef, useState } from "react";
import { useUploadCV } from "../hooks/useUploadCV";
import { usePermission } from "@/lib/usePermission";
import { PERMISSIONS } from "@/config/permissions.constants";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB — theo API docs

export const CVUploadZone = () => {
  const { can } = usePermission();
  const { mutate: upload, isPending } = useUploadCV();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  if (!can(PERMISSIONS.UPLOAD_CV)) return null; // P101

  // Client-side validation (theo API docs)
  const validate = (file: File): string | null => {
    if (file.type !== "application/pdf") return "Chỉ chấp nhận file PDF.";
    if (file.size > MAX_SIZE_BYTES) return "File quá lớn, tối đa 10MB.";
    if (file.size === 0) return "File không được rỗng.";
    return null;
  };

  const handleFile = (file: File) => {
    setClientError(null);
    const error = validate(file);
    if (error) {
      setClientError(error);
      return;
    }
    upload(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ""; // reset để upload cùng file lần nữa được
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => !isPending && inputRef.current?.click()}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
        transition-colors
        ${dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
        ${isPending ? "pointer-events-none opacity-60" : ""}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleInputChange}
        disabled={isPending}
      />

      {/* Icon */}
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>

      {isPending ? (
        <p className="text-sm text-blue-600 font-medium">Đang tải lên...</p>
      ) : (
        <>
          <p className="text-sm font-medium text-text-secondary">
            Kéo thả file vào đây hoặc{" "}
            <span className="text-blue-600">chọn file</span>
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Chỉ chấp nhận PDF · Tối đa 10MB
          </p>
        </>
      )}

      {clientError && (
        <p className="mt-2 text-xs text-error font-medium">{clientError}</p>
      )}
    </div>
  );
};
