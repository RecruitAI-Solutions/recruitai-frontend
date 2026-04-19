import { useGetMyCVs } from "../hooks/useGetMyCVs";
import { CVCard } from "./CVCard";
import { useCVFilter } from "../hooks/useCVFilter";
import { Pagination } from "@/shared/components/ui/Pagination";
import { usePermission } from "@/lib/usePermission";
import { PERMISSIONS } from "@/config/permissions.constants";

export const CVList = () => {
  const { can } = usePermission();
  const { filter, updateFilter } = useCVFilter();
  const { data: response, isLoading, isError } = useGetMyCVs(filter);

  if (!can(PERMISSIONS.VIEW_OWN_CVS)) return null;

  const handlePageChange = (page: number) => {
    updateFilter({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cvs = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = response?.totalPages ?? 0;
  const currentPage = filter.page || 1;

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-background rounded-lg h-20 animate-pulse"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-8 text-error text-sm">
          Không thể tải danh sách CV. Vui lòng thử lại.
        </div>
      ) : cvs.length === 0 ? (
        <div className="text-center py-10 text-text-secondary">
          <p className="text-sm">Bạn chưa có CV nào.</p>
          <p className="text-xs mt-1">Hãy upload CV đầu tiên của bạn ở trên.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-text-secondary">
            Hiển thị {cvs.length} / {total} CV
          </p>
          <div className="space-y-3">
            {cvs.map((cv) => (
              <CVCard key={cv.id} cv={cv} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
