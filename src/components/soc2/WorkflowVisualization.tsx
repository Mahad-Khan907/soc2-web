import { useState, useEffect } from "react";
import { Activity, Shield, FileCheck, Eye, AlertTriangle, Database } from "lucide-react";
import { AnimatedConnection } from "./AnimatedConnection";
import { StatusIndicator, StatusType } from "./StatusIndicator";
import { cn } from "@/lib/utils";

interface WorkflowStep {
  id: string;
  title: string;
  status: StatusType;
  icon: React.ReactNode;
  description: string;
  currentCount?: number;
  throughput?: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: "collect",
    title: "Data Collection",
    status: "green",
    icon: <Database className="h-5 w-5" />,
    description: "System monitoring",
    currentCount: 847,
    throughput: "2.3k/min"
  },
  {
    id: "process",
    title: "Data Processing",
    status: "green",
    icon: <Activity className="h-5 w-5" />,
    description: "Real-time analysis",
    currentCount: 823,
    throughput: "2.1k/min"
  },
  {
    id: "assess",
    title: "Risk Assessment",
    status: "amber",
    icon: <Shield className="h-5 w-5" />,
    description: "AI-powered scanning",
    currentCount: 785,
    throughput: "1.9k/min"
  },
  {
    id: "validate",
    title: "Compliance Check",
    status: "green",
    icon: <FileCheck className="h-5 w-5" />,
    description: "SOC2 validation",
    currentCount: 771,
    throughput: "1.8k/min"
  },
  {
    id: "alert",
    title: "Alert System",
    status: "red",
    icon: <AlertTriangle className="h-5 w-5" />,
    description: "Issue detection",
    currentCount: 23,
    throughput: "45/min"
  },
  {
    id: "report",
    title: "Reporting",
    status: "green",
    icon: <Eye className="h-5 w-5" />,
    description: "Dashboard updates",
    currentCount: 748,
    throughput: "1.7k/min"
  }
];

export const WorkflowVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [processedCounts, setProcessedCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % workflowSteps.length);

      // Simulate data processing
      setProcessedCounts(prev => {
        const newCounts = { ...prev };
        workflowSteps.forEach(step => {
          const increment = Math.floor(Math.random() * 5) + 1;
          newCounts[step.id] = (newCounts[step.id] || step.currentCount || 0) + increment;
        });
        return newCounts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isStepActive = (index: number) =>
    index === activeStep || index === (activeStep - 1 + workflowSteps.length) % workflowSteps.length;

  const getConnectionActive = (index: number) =>
    activeStep > index || (activeStep === 0 && index === workflowSteps.length - 1);

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-card border border-border/50 shadow-card rounded-xl">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Live SOC2 Monitoring Workflow
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Real-time data processing pipeline with automated compliance validation
        </p>
      </div>

      {/* Workflow Steps - Responsive Layout */}
      <div className="relative">
        {/* Desktop/Tablet Horizontal Layout */}
        <div className="hidden md:flex overflow-x-auto pb-4">
          <div className="flex items-center gap-4 lg:gap-6 min-w-full">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                {/* Workflow Node */}
                <div
                  className={cn(
                    "relative group transition-all duration-500",
                    isStepActive(index) && "scale-110"
                  )}
                >
                  {/* Glow Effect */}
                  {isStepActive(index) && (
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  )}

                  {/* Node Container */}
                  <div
                    className={cn(
                      "relative w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 transition-all duration-500",
                      "bg-gradient-card shadow-card cursor-pointer",
                      "flex flex-col items-center justify-center p-3 lg:p-4",
                      isStepActive(index)
                        ? "border-primary shadow-glow"
                        : "border-border/50 hover:border-primary/30"
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "p-1.5 lg:p-2 rounded-lg mb-1 lg:mb-2 transition-colors duration-300",
                        isStepActive(index)
                          ? "bg-primary/20 text-primary"
                          : "bg-muted/30 text-muted-foreground"
                      )}
                    >
                      <div className="w-4 h-4 lg:w-5 lg:h-5">{step.icon}</div>
                    </div>

                    {/* Count */}
                    <div className="text-center">
                      <div
                        className={cn(
                          "text-sm lg:text-lg font-bold transition-colors duration-300",
                          isStepActive(index) ? "text-primary" : "text-foreground"
                        )}
                      >
                        {processedCounts[step.id] || step.currentCount}
                      </div>
                      <div className="text-xs text-muted-foreground">{step.throughput}</div>
                    </div>

                    {/* Status indicator */}
                    <div className="absolute -top-1 lg:-top-2 -right-1 lg:-right-2">
                      <StatusIndicator
                        status={step.status}
                        label=""
                        size="sm"
                        pulse={isStepActive(index)}
                      />
                    </div>
                  </div>

                  {/* Node Label */}
                  <div className="absolute -bottom-12 lg:-bottom-16 left-1/2 transform -translate-x-1/2 text-center w-24 lg:w-32">
                    <h4 className="font-semibold text-xs lg:text-sm text-foreground mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground hidden lg:block">{step.description}</p>
                  </div>
                </div>

                {/* Connection Line */}
                {index < workflowSteps.length - 1 && (
                  <div className="flex-1 px-2 lg:px-4 min-w-[60px] lg:min-w-[80px]">
                    <AnimatedConnection
                      isActive={getConnectionActive(index)}
                      direction="horizontal"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden flex space-y-4">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Workflow Node */}
              <div
                className={cn(
                  "relative group transition-all duration-500 flex items-center gap-4 w-full",
                  "p-4 rounded-lg border-2 bg-gradient-card",
                  isStepActive(index)
                    ? "border-primary shadow-glow scale-105"
                    : "border-border/50"
                )}
              >
                {/* Glow Effect */}
                {isStepActive(index) && (
                  <div className="absolute inset-0 bg-primary/10 rounded-lg animate-pulse" />
                )}

                {/* Icon Container */}
                <div
                  className={cn(
                    "relative w-16 h-16 rounded-full border-4 transition-all duration-500",
                    "flex items-center justify-center flex-shrink-0",
                    isStepActive(index)
                      ? "border-primary bg-primary/10"
                      : "border-border/50 bg-muted/30"
                  )}
                >
                  <div
                    className={cn(
                      "transition-colors duration-300",
                      isStepActive(index) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {step.icon}
                  </div>

                  {/* Status indicator */}
                  <div className="absolute -top-1 -right-1">
                    <StatusIndicator
                      status={step.status}
                      label=""
                      size="sm"
                      pulse={isStepActive(index)}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm text-foreground">{step.title}</h4>
                    <div
                      className={cn(
                        "text-lg font-bold transition-colors duration-300",
                        isStepActive(index) ? "text-primary" : "text-foreground"
                      )}
                    >
                      {processedCounts[step.id] || step.currentCount}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{step.description}</p>
                  <div className="text-xs text-muted-foreground">{step.throughput}</div>
                </div>
              </div>

              {/* Connection Line */}
              {index < workflowSteps.length - 1 && (
                <div className="py-2">
                  <AnimatedConnection
                    isActive={getConnectionActive(index)}
                    direction="vertical"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Processing Stats */}
      <div className="mt-12 lg:mt-20 pt-4 lg:pt-6 border-t border-border/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-center">
          <div>
            <div className="text-lg lg:text-2xl font-bold text-status-green mb-1">
              {Object.values(processedCounts).reduce((a, b) => a + b, 0) || 4547}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Total Processed</div>
          </div>
          <div>
            <div className="text-lg lg:text-2xl font-bold text-primary mb-1 truncate">
              {workflowSteps[activeStep]?.title ?? "Processing..."}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Current Step</div>
          </div>
          <div>
            <div className="text-lg lg:text-2xl font-bold text-status-amber mb-1">
              {processedCounts.alert || 23}
            </div>
            <div className="text-xs lg:text-sm text-muted-foreground">Alerts Generated</div>
          </div>
          <div>
            <div className="text-lg lg:text-2xl font-bold text-foreground mb-1">99.7%</div>
            <div className="text-xs lg:text-sm text-muted-foreground">Processing Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
