import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`
            w-full px-4 py-2 rounded-lg border
            bg-surface text-text-primary
            border-border
            placeholder:text-text-muted

            transition-all duration-200

            focus:outline-none
            focus:ring-2 focus:ring-primary
            focus:border-primary

            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-none
            ${error ? "border-error focus:ring-error" : ""}
            ${className}
          `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
});
TextareaField.displayName = "TextareaField";
