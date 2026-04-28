// shared/components/ui/ButtonBack.tsx
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef, useState, useRef } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonBackProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "primary";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  showText?: boolean;
  fallbackPath?: string;
  onBack?: () => void;
  animation?: "none" | "slide" | "bounce" | "fade" | "scale" | "glow" | "shake";
}

export const ButtonBack = forwardRef<HTMLButtonElement, ButtonBackProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      icon,
      iconPosition = "left",
      showText = true,
      fallbackPath = "/",
      onBack,
      disabled,
      animation = "slide",
      ...props
    },
    ref,
  ) => {
    const navigate = useNavigate();
    const [isHoveringText, setIsHoveringText] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleBack = () => {
      if (onBack) {
        onBack();
      } else {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate(fallbackPath);
        }
      }
    };

    const handleTextMouseEnter = () => {
      if (animation === "bounce" || animation === "shake") {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setIsHoveringText(true);
        timeoutRef.current = setTimeout(() => {
          setIsHoveringText(false);
        }, 500);
      }
    };

    const variants = {
      default: "text-text-secondary hover:text-primary bg-transparent",
      outline:
        "px-3 py-1.5 border border-gray-300 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 bg-transparent",
      ghost: "hover:bg-gray-100 px-2 py-1 rounded bg-transparent",
      primary:
        "px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 shadow-sm hover:shadow-md",
    };

    const sizes = {
      sm: "text-xs gap-1",
      md: "text-sm gap-2",
      lg: "text-base gap-2",
      xl: "text-lg gap-3",
    };

    const iconSizes = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    // Chỉ trigger bounce/shake khi hover đúng vào text
    const getTextAnimation = () => {
      if (!isHoveringText) return "";
      if (animation === "bounce") return "animate-[bounce_0.5s_ease_1]";
      if (animation === "shake") return "animate-[shake_0.3s_ease-in-out_1]";
      return "";
    };

    const getIconAnimation = () => {
      if (!isHoveringText) return "";
      if (animation === "bounce") return "animate-[bounce_0.5s_ease_1]";
      if (animation === "shake") return "animate-[shake_0.3s_ease-in-out_1]";
      return "";
    };

    // Các animation khác vẫn dùng hover bình thường
    const getButtonAnimation = () => {
      switch (animation) {
        case "slide":
          return "hover:translate-x-[-4px] transition-transform duration-300 ease-out";
        case "fade":
          return "hover:opacity-70 transition-opacity duration-300";
        case "scale":
          return "hover:scale-105 transition-transform duration-300 ease-out active:scale-95";
        case "glow":
          return "hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:border-primary/50 transition-all duration-300";
        default:
          return "";
      }
    };

    const defaultIcon =
      variant === "primary" ? (
        <ArrowLeft className={cn(iconSizes[size], getIconAnimation())} />
      ) : (
        <ChevronLeft className={cn(iconSizes[size], getIconAnimation())} />
      );

    return (
      <button
        ref={ref}
        onClick={handleBack}
        disabled={disabled}
        className={cn(
          "group relative inline-flex items-center transition-all duration-200 font-medium overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          getButtonAnimation(),
          className,
        )}
        {...props}
      >
        <span className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="absolute inset-0 opacity-0 group-active:opacity-100 group-active:animate-[ripple_0.4s_ease-out] bg-white/20 rounded-full" />
        </span>

        {/* Nội dung - chỉ hover vào đây mới trigger bounce/shake */}
        <span
          className={cn("inline-flex items-center gap-2", getTextAnimation())}
          onMouseEnter={handleTextMouseEnter}
        >
          {iconPosition === "left" && (icon || defaultIcon)}
          {showText &&
            (children !== undefined
              ? children
              : variant === "default"
                ? "Quay lại"
                : "Back")}
          {iconPosition === "right" && (icon || defaultIcon)}
        </span>
      </button>
    );
  },
);

ButtonBack.displayName = "ButtonBack";

