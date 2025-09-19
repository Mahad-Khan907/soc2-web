import { cn } from "@/lib/utils";

export type StatusType = "green" | "amber" | "red";

interface StatusIndicatorProps {
  status: StatusType;
  label: string;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  green: {
    color: "text-status-green",
    bg: "bg-status-green/20",
    border: "border-status-green/30",
  },
  amber: {
    color: "text-status-amber",
    bg: "bg-status-amber/20",
    border: "border-status-amber/30",
  },
  red: {
    color: "text-status-red",
    bg: "bg-status-red/20",
    border: "border-status-red/30",
  },
};

const sizeConfig = {
  sm: "h-2 w-2 sm:h-3 sm:w-3",         // smaller on mobile
  md: "h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5", // normal on md
  lg: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7", // large on big screens
};

export const StatusIndicator = ({
  status,
  label,
  pulse = true,
  size = "md",
}: StatusIndicatorProps) => {
  const config = statusConfig[status];
  const sizeClass = sizeConfig[size];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className={cn(
          "rounded-full border-2 transition-all duration-300",
          sizeClass,
          config.bg,
          config.border,
          pulse && "animate-pulse-status",
          config.color
        )}
        style={{
          color: `hsl(var(--status-${status}))`,
          borderColor: `hsl(var(--status-${status}) / 0.3)`,
          backgroundColor: `hsl(var(--status-${status}) / 0.2)`,
        }}
      />
      <span className="text-xs sm:text-sm md:text-base font-medium text-foreground">
        {label}
      </span>
    </div>
  );
};
