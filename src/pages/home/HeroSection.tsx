import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface HeroAction {
  to: string;
  label: string;
  icon: ReactNode;
  bg: string;
  color: string;
}

interface HeroSectionProps {
  user?: {
    name: string;
    email: string;
  };
  badge: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  gradient: string;
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
  quickActions?: HeroAction[];
}

export const HeroSection = ({
  user,
  badge,
  badgeColor = "bg-white/20 border-white/30",
  title,
  subtitle,
  gradient,
  primaryAction,
  secondaryAction,
  quickActions,
}: HeroSectionProps) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* LEFT */}
          <div className="flex-1">
            {user && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border border-white/30">
                  {user.name.charAt(0)}
                </div>

                <div>
                  <span
                    className={`inline-block text-xs px-2.5 py-1 rounded-full border font-medium mb-1 ${badgeColor}`}
                  >
                    {badge}
                  </span>
                  <p className="text-white/80 text-sm">{user.email}</p>
                </div>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>

            <p className="text-white/70 text-lg mb-6 max-w-lg">{subtitle}</p>

            <div className="flex flex-wrap gap-3">
              {primaryAction}
              {secondaryAction}
            </div>
          </div>

          {/* RIGHT */}
          {quickActions && (
            <div className="lg:w-80 xl:w-96">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-3 font-medium">
                Truy cập nhanh
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {quickActions.map((action) => (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] block"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg ${action.bg} flex items-center justify-center mb-3`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-white text-sm leading-snug flex-1">{action.label}</p>
                      <ChevronRight className="w-8 h-8 text-white/40 group-hover:text-white/80 transition-colors shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
