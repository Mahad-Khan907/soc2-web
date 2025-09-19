import { Card } from "@/components/ui/card";
import { StatusIndicator, StatusType } from "./StatusIndicator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ComplianceMetric {
  name: string;
  status: StatusType;
  value: string;
  change?: string;
}

interface ComplianceCardProps {
  title: string;
  description: string;
  overallStatus: StatusType;
  metrics: ComplianceMetric[];
  icon: React.ReactNode;
  lastUpdated: string;
}

export const ComplianceCard = ({
  title,
  description,
  overallStatus,
  metrics,
  icon,
  lastUpdated,
}: ComplianceCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-card border border-border/50 shadow-card hover:shadow-glow/50 transition-all duration-500 hover:border-primary/20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-base sm:text-lg lg:text-xl text-foreground break-words">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground break-words">
                {description}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <StatusIndicator status={overallStatus} label="Overall" pulse />
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3 overflow-x-auto sm:overflow-visible">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-muted/30 border border-border/30 min-w-[220px]"
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <StatusIndicator status={metric.status} label="" size="sm" />
                <span className="text-xs sm:text-sm font-medium text-foreground break-words">
                  {metric.name}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {metric.value}
                </span>
                {metric.change && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs sm:text-sm",
                      metric.change.startsWith("+")
                        ? "text-status-green"
                        : "text-status-red"
                    )}
                  >
                    {metric.change}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-border/30">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </Card>
  );
};
