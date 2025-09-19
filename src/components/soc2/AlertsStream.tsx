import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  Clock,
  User,
  CheckCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
  owner: string;
  status: "active" | "acknowledged" | "resolved";
  category: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    severity: "high",
    title: "Encryption-at-rest validation failed",
    description:
      "Database Cluster-1 encryption validation failed during automated scan",
    timestamp: "2 min ago",
    owner: "DevOps Team",
    status: "active",
    category: "Security Controls",
  },
  {
    id: "2",
    severity: "medium",
    title: "Access log anomaly detected",
    description: "Unusual login pattern detected from IP 192.168.1.100",
    timestamp: "5 min ago",
    owner: "Security Team",
    status: "acknowledged",
    category: "Access Control",
  },
  {
    id: "3",
    severity: "low",
    title: "Policy documentation update needed",
    description: "Password policy document requires quarterly review update",
    timestamp: "15 min ago",
    owner: "Compliance Team",
    status: "active",
    category: "Documentation",
  },
  {
    id: "4",
    severity: "high",
    title: "Backup verification failure",
    description: "Daily backup integrity check failed for Production DB",
    timestamp: "22 min ago",
    owner: "Database Team",
    status: "resolved",
    category: "Data Protection",
  },
];

const severityConfig = {
  high: {
    color: "text-status-red",
    bg: "bg-status-red/10",
    border: "border-status-red/30",
  },
  medium: {
    color: "text-status-amber",
    bg: "bg-status-amber/10",
    border: "border-status-amber/30",
  },
  low: {
    color: "text-status-green",
    bg: "bg-status-green/10",
    border: "border-status-green/30",
  },
};

interface AlertsStreamProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsStream = ({ isOpen, onClose }: AlertsStreamProps) => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  useEffect(() => {
    const interval = setInterval(() => {
      // simulate new alerts incoming
      setAlerts((prev) => [...prev]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "acknowledged" } : alert
      )
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  const handleAssign = (alertId: string) => {
    alert("Assignment functionality would open user picker here");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end sm:items-stretch justify-center sm:justify-end">
      <div className="w-full sm:w-[90%] lg:max-w-md h-[90%] sm:h-full bg-gradient-card border-l border-border shadow-glow flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-status-amber" />
            <div>
              <h3 className="font-semibold text-foreground text-base sm:text-lg">
                Alerts & Issues
              </h3>
              <p className="text-xs text-muted-foreground">
                Real-time compliance monitoring
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Badges */}
        <div className="p-4 flex flex-wrap items-center gap-2 sm:gap-4">
          <Badge
            variant="secondary"
            className="bg-status-red/10 text-status-red text-xs sm:text-sm"
          >
            {
              alerts.filter((a) => a.severity === "high" && a.status === "active")
                .length
            }{" "}
            High
          </Badge>
          <Badge
            variant="secondary"
            className="bg-status-amber/10 text-status-amber text-xs sm:text-sm"
          >
            {
              alerts.filter(
                (a) => a.severity === "medium" && a.status === "active"
              ).length
            }{" "}
            Medium
          </Badge>
          <Badge
            variant="secondary"
            className="bg-status-green/10 text-status-green text-xs sm:text-sm"
          >
            {
              alerts.filter((a) => a.severity === "low" && a.status === "active")
                .length
            }{" "}
            Low
          </Badge>
        </div>

        {/* Alerts List */}
        <ScrollArea className="flex-1 px-4 pb-4">
          <div className="space-y-3">
            {alerts.map((alert) => {
              const config = severityConfig[alert.severity];
              return (
                <Card
                  key={alert.id}
                  className={cn(
                    "p-4 border-l-4 transition-all duration-300 rounded-lg",
                    config.border,
                    alert.status === "resolved" && "opacity-60"
                  )}
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", config.bg, config.color)}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {alert.category}
                      </Badge>
                    </div>
                    {alert.status === "resolved" && (
                      <CheckCircle className="h-4 w-4 text-status-green" />
                    )}
                  </div>

                  {/* Title + Description */}
                  <h4 className="font-medium text-sm sm:text-base text-foreground mb-1">
                    {alert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                    {alert.description}
                  </p>

                  {/* Timestamp + Owner */}
                  <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {alert.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {alert.owner}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {alert.status === "active" && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleAssign(alert.id)}
                      >
                        Assign
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        Acknowledge
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleResolve(alert.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
