import { useGetMyCVs } from "../hooks/useGetMyCVs";
import { CVCard } from "./CVCard";
import { usePermission } from "@/lib/usePermission";
import { PERMISSIONS } from "@/config/permissions.constants";

export const CVList = () => {
  const { can } = usePermission();
  const { data: cvs, isLoading, isError } = useGetMyCVs();

  if (!can(PERMISSIONS.VIEW_OWN_CVS)) return null; // P102

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="bg-background rounded-lg h-20 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-error text-sm">
        Không thể tải danh sách CV. Vui lòng thử lại.
      </div>
    );
  }

  if (!cvs || cvs.length === 0) {
    return (
      <div className="text-center py-10 text-text-secondary">
        <p className="text-sm">Bạn chưa có CV nào.</p>
        <p className="text-xs mt-1">Hãy upload CV đầu tiên của bạn ở trên.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {cvs.map((cv) => (
        <CVCard key={cv.id} cv={cv} />
      ))}
    </div>
  );
};
