import { cn } from "@/lib/utils";
import { StatusIndicator, StatusType } from "./StatusIndicator";

interface WorkflowNodeProps {
  title: string;
  status: StatusType;
  description?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  connections?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
}

export const WorkflowNode = ({
  title,
  status,
  description,
  icon,
  isActive = false,
  connections = {},
}: WorkflowNodeProps) => {
  return (
    <div className="relative group">
      {/* Connection Lines */}
      {connections.top && (
        <div className="absolute -top-4 sm:-top-5 md:-top-6 left-1/2 w-0.5 h-4 sm:h-5 md:h-6 bg-border transform -translate-x-0.5" />
      )}
      {connections.bottom && (
        <div className="absolute -bottom-4 sm:-bottom-5 md:-bottom-6 left-1/2 w-0.5 h-4 sm:h-5 md:h-6 bg-border transform -translate-x-0.5" />
      )}
      {connections.left && (
        <div className="absolute top-1/2 -left-4 sm:-left-5 md:-left-6 h-0.5 w-4 sm:w-5 md:w-6 bg-border transform -translate-y-0.5" />
      )}
      {connections.right && (
        <div className="absolute top-1/2 -right-4 sm:-right-5 md:-right-6 h-0.5 w-4 sm:w-5 md:w-6 bg-border transform -translate-y-0.5" />
      )}

      {/* Node */}
      <div
        className={cn(
          "relative rounded-xl border-2 transition-all duration-300 cursor-pointer",
          "bg-gradient-card shadow-card hover:shadow-glow/50",
          "p-3 sm:p-4 md:p-5",
          "min-w-[160px] sm:min-w-[200px] lg:min-w-[240px]",
          isActive
            ? "border-primary/50 ring-2 ring-primary/20"
            : "border-border/50 hover:border-primary/30",
          "group-hover:scale-105"
        )}
      >
        {/* Glow effect for active nodes */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl bg-primary/5 animate-glow" />
        )}

        <div className="relative space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary group-hover:animate-glow">
                {icon}
              </div>
              <div>
                <h4 className="font-semibold text-xs sm:text-sm md:text-base text-foreground">
                  {title}
                </h4>
                {description && (
                  <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                    {description}
                  </p>
                )}
              </div>
            </div>
            <StatusIndicator status={status} label="" size="sm" />
          </div>

          {/* Status bar */}
          <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                status === "green" && "bg-status-green w-full",
                status === "amber" && "bg-status-amber w-2/3",
                status === "red" && "bg-status-red w-1/3"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
