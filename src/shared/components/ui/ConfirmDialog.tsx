import * as AlertDialog from "@radix-ui/react-alert-dialog";
type ConfirmVariant = "primary" | "destructive";
type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  confirmText?: string;
  cancelText?: string;

  variant?: ConfirmVariant;

  onConfirm: () => void;
};

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
  onConfirm,
}: Props) => {
  const confirmStyles = {
    primary: "bg-primary !text-primary-foreground hover:opacity-90",
    destructive: "bg-red-500 !text-primary-foreground hover:bg-red-600",
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        {/* Overlay */}
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />

        {/* Content */}
        <AlertDialog.Content
          className="
            fixed z-100000
            top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[90vw] max-w-md
            bg-white
            rounded-xl shadow-lg
            p-6
            space-y-4
          "
        >
          {/* Title */}
          <AlertDialog.Title className="text-lg font-semibold text-text-primary">
            {title}
          </AlertDialog.Title>

          {/* Description */}
          <AlertDialog.Description className="text-md text-gray-600">
            {description}
          </AlertDialog.Description>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <AlertDialog.Cancel asChild>
              <button
                className="
                  px-4 py-2 text-sm
                  rounded-lg border border-border cursor-pointer
                  hover:bg-gray-100
                "
              >
                {cancelText}
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className={`
                  px-4 py-2 text-sm rounded-lg cursor-pointer
                  ${confirmStyles[variant]}
                `}
              >
                {confirmText}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
