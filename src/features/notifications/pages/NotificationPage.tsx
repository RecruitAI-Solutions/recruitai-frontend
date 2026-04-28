import { useState } from "react";
import { Container } from "@/shared/layouts/Container";
import { Section } from "@/shared/layouts/Section";
import { useNotifications } from "../hooks/useNotifications";
import { useMarkAllAsRead } from "../hooks/useMarkAllAsRead";
import { NotificationItem } from "../components/NotificationItem";
import { Pagination } from "@/shared/components/ui/Pagination";
import { Button } from "@/shared/components/ui/Button";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Select } from "@/shared/components/ui/Select";
import type { GetNotificationsParams } from "../types/notification.types";
import { Check } from "lucide-react";

export const NotificationsPage = () => {
  const [params, setParams] = useState<GetNotificationsParams>({
    page: 1,
    pageSize: 10,
  });
  const { data, isLoading } = useNotifications(params);
  const { mutate: readAll, isPending: isReadingAll } = useMarkAllAsRead();

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <Section>
      <Container>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Thông báo</h1>
          <div className="flex gap-4">
            <Select
              value={
                params.isRead === undefined
                  ? "all"
                  : params.isRead
                    ? "read"
                    : "unread"
              }
              onChange={(e) => {
                const val = e.target.value;
                setParams({
                  ...params,
                  page: 1,
                  isRead: val === "all" ? undefined : val === "read",
                });
              }}
              options={[
                { value: "all", label: "Tất cả" },
                { value: "unread", label: "Chưa đọc" },
                { value: "read", label: "Đã đọc" },
              ]}
            />
            <Button
              variant="outline"
              onClick={() => readAll()}
              isLoading={isReadingAll}
            >
              <Check className="w-4 h-4 mr-2" />
              Đánh dấu tất cả đã đọc
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : data && data.data.length > 0 ? (
          <>
            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              {data.data.map((item) => (
                <NotificationItem key={item.id} notification={item} />
              ))}
            </div>
            {data.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-center py-10 text-text-secondary">
            Không có thông báo nào.
          </p>
        )}
      </Container>
    </Section>
  );
};
