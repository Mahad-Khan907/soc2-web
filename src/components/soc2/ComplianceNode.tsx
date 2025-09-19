import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  Shield,
  FileText,
  Database,
  AlertTriangle,
  GraduationCap,
  Users,
  ClipboardCheck,
  Award,
} from 'lucide-react';
import { ComplianceNodeData } from './ComplianceCanvas';
import { StatusIndicator } from './StatusIndicator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const nodeIcons = {
  framework: Shield,
  policy: FileText,
  evidence: Database,
  risk: AlertTriangle,
  training: GraduationCap,
  vendor: Users,
  audit: ClipboardCheck,
  'trust-center': Award,
};

const nodeColors = {
  framework: 'bg-primary/10 text-primary border-primary/30',
  policy: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  evidence: 'bg-green-500/10 text-green-400 border-green-500/30',
  risk: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  training: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  vendor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  audit: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  'trust-center': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
};

export const ComplianceNode = memo(
  ({ data, selected }: NodeProps<ComplianceNodeData>) => {
    const Icon = nodeIcons[data.type];
    const colorClass = nodeColors[data.type];

    return (
      <div
        className={cn(
          'px-3 py-2 sm:px-4 sm:py-3 shadow-card rounded-lg bg-gradient-card border-2 transition-all duration-300 min-w-[160px] sm:min-w-[200px] max-w-full',
          selected ? 'border-primary shadow-glow' : 'border-border/50',
          'hover:shadow-glow/50 hover:border-primary/50'
        )}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-primary border-2 border-background"
        />

        <div className="flex items-start gap-2 sm:gap-3">
          {/* Icon */}
          <div className={cn('p-2 rounded-lg border flex-shrink-0', colorClass)}>
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <h4 className="font-semibold text-xs sm:text-sm md:text-base text-foreground truncate">
                {data.title}
              </h4>
              <StatusIndicator
                status={
                  data.status === 'compliant'
                    ? 'green'
                    : data.status === 'at-risk'
                    ? 'amber'
                    : 'red'
                }
                label=""
                size="sm"
              />
            </div>

            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2 md:line-clamp-3">
              {data.description}
            </p>

            <div className="space-y-1 sm:space-y-2">
              {data.owner && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Badge variant="secondary" className="text-[10px] sm:text-xs">
                    {data.owner}
                  </Badge>
                </div>
              )}

              {data.xpEarned !== undefined && (
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 text-status-amber" />
                  <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
                    {data.xpEarned} XP
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-primary border-2 border-background"
        />
      </div>
    );
  }
);
