import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { Pagination } from "@/shared/components/ui/Pagination";
import { StatusBadge } from "../components/StatusBadge";
import { Link } from "react-router-dom";
import { useGetMyApplications } from "../hooks/useGetMyApplication";
import {
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  ChevronRight,
  Filter,
  X,
  Search
} from "lucide-react";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useState } from "react";

// Status options
const STATUS_OPTIONS = [
  { value: 1, label: "Đang chờ" },
  { value: 2, label: "Đã xem" },
  { value: 3, label: "Đã duyệt" },
  { value: 4, label: "Từ chối" },
];

export const MyApplicationsPage = () => {
  const { data, isLoading, params, updateParams, handlePageChange } = useGetMyApplications();
  const [showFilter, setShowFilter] = useState(false);
  const [tempStatus, setTempStatus] = useState<number | undefined>();
  const [tempFromDate, setTempFromDate] = useState<string>("");
  const [tempToDate, setTempToDate] = useState<string>("");
  const [tempFileName, setTempFileName] = useState<string>("");

  const handleApplyFilter = () => {
    updateParams({
      status: tempStatus,
      fromDate: tempFromDate || undefined,
      toDate: tempToDate || undefined,
      query: tempFileName || undefined,
    });
    setShowFilter(false);
  };

  const handleClearFilter = () => {
    setTempStatus(undefined);
    setTempFromDate("");
    setTempToDate("");
    setTempFileName("");
    updateParams({
      status: undefined,
      fromDate: undefined,
      toDate: undefined,
      query: undefined,
    });
    setShowFilter(false);
  };

  const getStatusLabel = (status: number) => {
    return STATUS_OPTIONS.find(s => s.value === status)?.label || "Không xác định";
  };

  // Đếm số filter đang active
  const activeFilterCount = [
    params.status,
    params.fromDate,
    params.toDate,
    params.query,
  ].filter(Boolean).length;

  // Skeleton loading component
  const ApplicationSkeleton = () => (
    <div className="bg-surface rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-2" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <Skeleton className="h-7 w-12 mb-1" />
            <Skeleton className="h-3 w-10" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <Section className="py-8">
      <Container>
        {/* Header với thống kê */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Đơn ứng tuyển của tôi
            </h1>
            <p className="text-text-secondary">
              Quản lý tất cả các công việc bạn đã ứng tuyển
              {data && (
                <span className="ml-2 text-primary font-medium">
                  ({data.total} đơn)
                </span>
              )}
            </p>
          </div>

          {/* Filter button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-text-secondary rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Lọc
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilter && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status filter */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Trạng thái
                </label>
                <select
                  value={tempStatus ?? ""}
                  onChange={(e) => setTempStatus(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Tất cả</option>
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* From date */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Từ ngày
                </label>
                <input
                  type="date"
                  value={tempFromDate}
                  onChange={(e) => setTempFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* To date */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Đến ngày
                </label>
                <input
                  type="date"
                  value={tempToDate}
                  onChange={(e) => setTempToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              {/* File name search */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Tên công việc | công ty
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Nội dung tìm kiếm..."
                    value={tempFileName}
                    onChange={(e) => setTempFileName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Filter actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleClearFilter}
                className="px-4 py-2 text-text-secondary hover:bg-gray-200 rounded-lg transition-colors"
              >
                Xóa lọc
              </button>
              <button
                onClick={handleApplyFilter}
                className="px-4 py-2 bg-primary !text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        )}

        {/* Active filters display */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {params.status && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-lg">
                Trạng thái: {getStatusLabel(params.status)}
                <button onClick={() => updateParams({ status: undefined })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {params.fromDate && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-lg">
                Từ: {new Date(params.fromDate).toLocaleDateString("vi-VN")}
                <button onClick={() => updateParams({ fromDate: undefined })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {params.toDate && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-lg">
                Đến: {new Date(params.toDate).toLocaleDateString("vi-VN")}
                <button onClick={() => updateParams({ toDate: undefined })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {params.query && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-lg">
                Công việc: {params.query}
                <button onClick={() => updateParams({ query: undefined })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <ApplicationSkeleton key={i} />
            ))}
          </div>
        ) : data?.data.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">
              {activeFilterCount > 0 ? "Không tìm thấy đơn ứng tuyển" : "Chưa có đơn ứng tuyển nào"}
            </h3>
            <p className="text-text-secondary mb-6">
              {activeFilterCount > 0
                ? "Thử thay đổi bộ lọc hoặc xóa lọc để xem tất cả"
                : "Bạn chưa ứng tuyển công việc nào. Hãy khám phá và ứng tuyển ngay!"}
            </p>
            {activeFilterCount > 0 ? (
              <button
                onClick={handleClearFilter}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-text-primary rounded-lg hover:bg-gray-300 transition-colors"
              >
                Xóa lọc
              </button>
            ) : (
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Tìm việc ngay
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {data?.data.map((app) => (
                <Link
                  key={app.applicationId}
                  to={`/candidate/applications/${app.applicationId}`}
                  className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Left section - Job info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-1">
                        {app.jobTitle}
                      </h3>

                      <div className="flex flex-wrap gap-3 mb-2">
                        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                          <Building2 className="w-4 h-4" />
                          <span>{app.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                          <MapPin className="w-4 h-4" />
                          <span>{app.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            Ứng tuyển: {new Date(app.appliedAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right section - Match & Status */}
                    <div className="flex items-center gap-4">
                      <div className="text-right min-w-[70px]">
                        <div className="text-xl font-bold text-primary">
                          {app.matchPercentage}%
                        </div>
                        <div className="text-xs text-text-secondary">phù hợp</div>
                        <div className="w-16 bg-gray-100 rounded-full h-1 mt-1">
                          <div
                            className="bg-primary rounded-full h-1"
                            style={{ width: `${app.matchPercentage}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <StatusBadge status={app.status} />
                      </div>
                      <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="mt-8 pt-4 border-t border-gray-100">
                <Pagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};