import { cn } from "@/lib/utils";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null;

  const createPages = () => {
    const pages: (number | "...")[] = [];

    const delta = 1; // số trang xung quanh current

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPages();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "px-3 py-1 rounded border",
          currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-100",
        )}
      >
        ←
      </button>

      {/* Page numbers */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "px-3 py-1 rounded border",
              currentPage === p
                ? "bg-primary text-white border-primary"
                : "hover:bg-gray-100",
            )}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "px-3 py-1 rounded border",
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-100",
        )}
      >
        →
      </button>
    </div>
  );
};
