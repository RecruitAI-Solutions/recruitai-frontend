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

    const delta = 1;
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
          "px-3 py-1 rounded-md border transition-all duration-200",
          currentPage === 1
            ? "text-text-disabled border-border cursor-not-allowed"
            : "text-text-secondary border-border hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
        )}
      >
        ←
      </button>

      {/* Page numbers */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 text-text-disabled !text-white">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={cn(
              "px-3 py-1 rounded-md border transition-all duration-200",
              currentPage === p
                ? "bg-primary text-white border-primary cursor-pointer !text-white"
                : "text-text-secondary border-border hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
            )}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "px-3 py-1 rounded-md border transition-all duration-200",
          currentPage === totalPages
            ? "text-text-disabled border-border cursor-not-allowed"
            : "text-text-secondary border-border hover:border-primary/30 hover:bg-primary/5 cursor-pointer"
        )}
      >
        →
      </button>
    </div>
  );
};