import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Award,
  User,
  FileText,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { ComplianceNodeData } from './ComplianceCanvas';
import { StatusIndicator } from './StatusIndicator';

interface NodePropertiesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  nodeData: ComplianceNodeData | null;
}

export const NodePropertiesPanel = ({
  isOpen,
  onClose,
  nodeData,
}: NodePropertiesPanelProps) => {
  if (!nodeData) return null;

  const statusOptions = [
    { value: 'compliant', label: 'Compliant ✅', color: 'green' as const },
    { value: 'at-risk', label: 'At Risk ⚠️', color: 'amber' as const },
    { value: 'non-compliant', label: 'Non-Compliant ❌', color: 'red' as const },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="w-full sm:w-[90%] md:w-[540px] max-w-[600px] bg-gradient-card p-4 sm:p-6 overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-sm sm:text-lg">
            <StatusIndicator
              status={
                nodeData.status === 'compliant'
                  ? 'green'
                  : nodeData.status === 'at-risk'
                  ? 'amber'
                  : 'red'
              }
              label=""
              size="sm"
            />
            {nodeData.title}
          </SheetTitle>
          <SheetDescription className="text-xs sm:text-sm">
            Configure compliance node properties and tracking
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={nodeData.title} className="mt-1" readOnly />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={nodeData.description}
                className="mt-1"
                rows={3}
                readOnly
              />
            </div>

            <div>
              <Label>Node Type</Label>
              <Badge variant="outline" className="mt-1 capitalize">
                {nodeData.type.replace('-', ' ')}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Status & Assignment */}
          <div className="space-y-4">
            <div>
              <Label>Status</Label>
              <div className="mt-1 space-y-2">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`flex flex-wrap sm:flex-nowrap items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                      nodeData.status === option.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 hover:border-primary/30'
                    }`}
                  >
                    <StatusIndicator status={option.color} label="" size="sm" />
                    <span className="text-sm">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {nodeData.owner && (
              <div>
                <Label htmlFor="owner">Assigned Owner</Label>
                <div className="mt-1 flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Input id="owner" value={nodeData.owner} className="flex-1" readOnly />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Evidence */}
          {nodeData.evidence?.length > 0 && (
            <>
              <div>
                <Label className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Linked Evidence
                </Label>
                <div className="mt-2 space-y-2">
                  {nodeData.evidence.map((evidence, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap sm:flex-nowrap items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/30"
                    >
                      <span className="text-sm text-foreground break-all">{evidence}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => alert(`Opening evidence file: ${evidence}`)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Gamification */}
          {nodeData.xpEarned !== undefined && (
            <>
              <div>
                <Label className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-status-amber" />
                  Gamification
                </Label>
                <div className="mt-2 p-3 rounded-lg bg-gradient-status border border-border/30">
                  <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                    <span className="text-sm text-muted-foreground">XP Earned</span>
                    <span className="text-lg font-bold text-status-amber">
                      {nodeData.xpEarned}
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-status-amber h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((nodeData.xpEarned / 300) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* AI Assistant */}
          <div>
            <Label className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Assistant (Grok)
            </Label>
            <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-3">
                Get contextual help and recommendations for this compliance node.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() =>
                  alert(
                    `Grok AI: Here are some recommendations for "${nodeData.title}":\n\n• Review current policies\n• Update security controls\n• Schedule compliance audit\n• Implement automation`
                  )
                }
              >
                Ask Grok for Help
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
