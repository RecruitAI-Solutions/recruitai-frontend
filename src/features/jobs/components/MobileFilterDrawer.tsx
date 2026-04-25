import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/shared/components/ui/Button";
import { X } from "lucide-react";
import JobFilterSidebar from "./JobFilterSidebar";

export const MobileFilterDrawer = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="md:hidden w-full">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Bộ lọc
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface z-50 p-0 shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <Dialog.Title className="font-semibold text-lg">
              Bộ lọc
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>
          <div className="p-4">
            <JobFilterSidebar className="border-0 p-0 shadow-none" />
          </div>
          <div className="p-4 border-t sticky bottom-0 bg-surface">
            <Dialog.Close asChild>
              <Button fullWidth className="!text-white">Xem kết quả</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
