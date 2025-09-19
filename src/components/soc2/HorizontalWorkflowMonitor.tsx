import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Activity,
  Target,
  FileText,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowStage {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  current: number;
  rate: string;
  status: "processing" | "warning" | "error";
  color: string;
}

const workflowStages: WorkflowStage[] = [
  {
    id: "collect",
    icon: Database,
    title: "Data Collection",
    current: 1313,
    rate: "2.3k/min",
    status: "processing",
    color: "text-primary",
  },
  {
    id: "analyze",
    icon: Activity,
    title: "Analysis",
    current: 1261,
    rate: "2.1k/min",
    status: "processing",
    color: "text-primary",
  },
  {
    id: "validate",
    icon: Target,
    title: "Validation",
    current: 1253,
    rate: "1.9k/min",
    status: "processing",
    color: "text-primary",
  },
  {
    id: "document",
    icon: FileText,
    title: "Documentation",
    current: 1247,
    rate: "1.8k/min",
    status: "processing",
    color: "text-primary",
  },
  {
    id: "issues",
    icon: AlertTriangle,
    title: "Issues Detected",
    current: 514,
    rate: "45/min",
    status: "warning",
    color: "text-status-amber",
  },
];

export const HorizontalWorkflowMonitor = () => {
  const [stages, setStages] = useState(workflowStages);
  const [progress, setProgress] = useState(75);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStages((prev) =>
        prev.map((stage) => ({
          ...stage,
          current: stage.current + Math.floor(Math.random() * 5) + 1,
        }))
      );

      setProgress((prev) => {
        const newProgress = prev + (Math.random() - 0.5) * 2;
        return Math.max(70, Math.min(100, newProgress));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Animation cycle for flowing dots
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <Card className="p-6 bg-gradient-card border border-border/50 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Live SOC2 Monitoring Workflow
        </h3>
        <p className="text-sm text-muted-foreground">
          Real-time data processing pipeline with automated compliance validation
        </p>
      </div>

      <div className="relative">
        {/* Workflow Stages */}
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-between mb-8 gap-8 lg:gap-0">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isLast = index === stages.length - 1;
            const isIssueStage = stage.status === "warning";

            return (
              <div
                key={stage.id}
                className="flex flex-col items-center relative"
              >
                {/* Stage Node */}
                <div
                  className={cn(
                    "relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 transition-all duration-500",
                    "flex items-center justify-center bg-gradient-card",
                    isIssueStage
                      ? "border-status-amber shadow-[0_0_20px_hsl(var(--status-amber)/0.3)]"
                      : "border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                  )}
                >
                  <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", stage.color)} />

                  {/* Status Indicator */}
                  {!isIssueStage && (
                    <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-status-green bg-background rounded-full" />
                  )}
                </div>

                {/* Stage Info */}
                <div className="mt-3 text-center min-w-[70px] sm:min-w-[80px]">
                  <div className={cn("text-base sm:text-xl font-bold", stage.color)}>
                    {stage.current.toLocaleString()}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    {stage.rate}
                  </div>
                </div>

                {/* Animated Connection Line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute",
                      "lg:top-10 lg:left-20 lg:w-16 lg:h-0.5 lg:bg-gradient-to-r",
                      "from-primary/50 to-primary/20",
                      "lg:block hidden"
                    )}
                  >
                    {/* Animated Flow Dots */}
                    <div className="relative w-full h-full overflow-hidden">
                      {[0, 1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className={cn(
                            "absolute w-1 h-1 bg-primary rounded-full transition-all duration-500",
                            "animate-pulse"
                          )}
                          style={{
                            left: `${((dot + animationPhase) % 4) * 25}%`,
                            top: "-1px",
                            animationDelay: `${dot * 125}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Timeline */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Pipeline Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>

          <div className="relative">
            <Progress value={progress} className="h-2 bg-muted/30" />

            {/* Active Processing Indicator */}
            <div
              className="absolute top-0 h-2 w-4 bg-primary/80 rounded-full animate-pulse"
              style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
                <span className="text-muted-foreground">Processing Active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground">Real-time Updates</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-status-green">
              <CheckCircle className="h-3 w-3" />
              <span>System Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 pt-4 border-t border-border/20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm sm:text-lg font-bold text-status-green">
              98.2%
            </div>
            <div className="text-xs text-muted-foreground">
              Processing Efficiency
            </div>
          </div>
          <div>
            <div className="text-sm sm:text-lg font-bold text-primary">8.7k</div>
            <div className="text-xs text-muted-foreground">Events/min</div>
          </div>
          <div>
            <div className="text-sm sm:text-lg font-bold text-status-amber">
              12ms
            </div>
            <div className="text-xs text-muted-foreground">Avg Latency</div>
          </div>
          <div>
            <div className="text-sm sm:text-lg font-bold text-foreground">
              99.9%
            </div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
