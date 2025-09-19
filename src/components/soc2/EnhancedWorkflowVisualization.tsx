import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Database, 
  Shield, 
  CheckCircle, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  Activity,
  Zap,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowNode {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'healthy' | 'warning' | 'error';
  metrics: {
    processed: number;
    rate: string;
    total?: number;
  };
  details: string[];
}

const workflowNodes: WorkflowNode[] = [
  {
    id: 'collect',
    title: 'Data Collected',
    description: 'Automated evidence gathering',
    icon: Database,
    status: 'healthy',
    metrics: { processed: 849, rate: '2.3k/min', total: 1000 },
    details: ['System logs: 340 events', 'Access records: 285 events', 'Security events: 224 events']
  },
  {
    id: 'validate',
    title: 'Validated Evidence',
    description: 'AI-powered evidence verification',
    icon: CheckCircle,
    status: 'healthy',
    metrics: { processed: 826, rate: '2.1k/min', total: 849 },
    details: ['Encryption checks: Passed', 'Access control: Verified', 'Data integrity: Confirmed']
  },
  {
    id: 'controls',
    title: 'Security Controls Checked',
    description: 'SOC2 control validation',
    icon: Shield,
    status: 'healthy',
    metrics: { processed: 787, rate: '1.9k/min', total: 826 },
    details: ['CC6.1: Access controls', 'CC6.2: Logical boundaries', 'CC6.3: Access credentials']
  },
  {
    id: 'policy',
    title: 'Policy Mapped Evidence',
    description: 'Evidence to policy alignment',
    icon: FileText,
    status: 'warning',
    metrics: { processed: 773, rate: '1.8k/min', total: 787 },
    details: ['Security policy: 98% mapped', 'Privacy policy: 95% mapped', 'Incident response: 92% mapped']
  },
  {
    id: 'issues',
    title: 'Issues/Exceptions',
    description: 'Compliance gaps identified',
    icon: AlertTriangle,
    status: 'error',
    metrics: { processed: 25, rate: '45/min' },
    details: ['High severity: 3 issues', 'Medium severity: 8 issues', 'Low severity: 14 issues']
  }
];

const statusConfig = {
  healthy: { color: 'text-status-green', bg: 'bg-status-green/10', border: 'border-status-green/30', dot: 'bg-status-green' },
  warning: { color: 'text-status-amber', bg: 'bg-status-amber/10', border: 'border-status-amber/30', dot: 'bg-status-amber' },
  error: { color: 'text-status-red', bg: 'bg-status-red/10', border: 'border-status-red/30', dot: 'bg-status-red' }
};

export const EnhancedWorkflowVisualization = () => {
  return (
    <Card className="p-4 sm:p-6 bg-gradient-card border border-border/50 shadow-card">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Live SOC2 Monitoring Workflow
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time compliance pipeline processing
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-status-green animate-pulse" />
            <span className="text-xs text-muted-foreground">Live Processing</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Zap className="h-3 w-3 mr-1" />
            Auto-Scale
          </Badge>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {workflowNodes.map((node, index) => {
          const Icon = node.icon;
          const config = statusConfig[node.status];
          const isLast = index === workflowNodes.length - 1;
          const completionRate = node.metrics.total 
            ? (node.metrics.processed / node.metrics.total) * 100 
            : 100;

          return (
            <div key={node.id} className="relative">
              <Card className={cn(
                "p-4 transition-all duration-300 hover:shadow-glow/20",
                config.bg,
                "border-l-4",
                config.border
              )}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className={cn("p-2 rounded-lg border self-start", config.bg, config.border)}>
                    <Icon className={cn("h-5 w-5", config.color)} />
                  </div>

                  <div className="flex-1">
                    {/* Title + Metrics */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 gap-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{node.title}</h4>
                        <p className="text-xs text-muted-foreground">{node.description}</p>
                      </div>
                      
                      <div className="text-left md:text-right">
                        <div className="text-lg font-bold text-foreground">
                          {node.metrics.processed.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {node.metrics.rate}
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    {node.metrics.total && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Processing Rate</span>
                          <span className={config.color}>{Math.round(completionRate)}%</span>
                        </div>
                        <Progress value={completionRate} className="h-1.5" />
                      </div>
                    )}

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {node.details.map((detail, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground bg-background/30 rounded px-2 py-1">
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-3 border-t border-border/20 gap-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", config.dot)} />
                    <span className="text-xs text-muted-foreground">
                      {node.status === 'healthy' ? 'Processing' : 
                       node.status === 'warning' ? 'Attention Required' : 'Issues Detected'}
                    </span>
                  </div>
                  
                  {node.status === 'healthy' && (
                    <div className="flex items-center gap-1 text-status-green">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">Optimal</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Animated Arrow */}
              {!isLast && (
                <div className="flex justify-center py-2">
                  <div className="flex items-center gap-1 text-primary animate-pulse">
                    <ArrowRight className="h-4 w-4" />
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pipeline Summary */}
      <div className="mt-6 pt-4 border-t border-border/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-status-green">97.8%</div>
            <div className="text-xs text-muted-foreground">Processing Efficiency</div>
          </div>
          <div>
            <div className="text-xl font-bold text-primary">8.5k</div>
            <div className="text-xs text-muted-foreground">Events/min</div>
          </div>
          <div>
            <div className="text-xl font-bold text-status-amber">14s</div>
            <div className="text-xs text-muted-foreground">Avg Latency</div>
          </div>
          <div>
            <div className="text-xl font-bold text-foreground">99.9%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
