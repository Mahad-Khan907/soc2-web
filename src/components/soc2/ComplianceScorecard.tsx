import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Shield,
  FileText,
  Database,
  AlertTriangle,
  GraduationCap,
  Users,
  ClipboardCheck,
  Award,
  Filter,
  Search,
  MoreHorizontal,
} from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';
import { useState } from 'react';

const complianceData = [
  {
    id: '1',
    type: 'framework',
    title: 'SOC 2 Type II',
    owner: 'Security Team',
    status: 'compliant' as const,
    completionRate: 98,
    lastUpdated: '2024-01-15',
    xpEarned: 250,
  },
  {
    id: '2',
    type: 'policy',
    title: 'IT Security Policy',
    owner: 'IT Team',
    status: 'compliant' as const,
    completionRate: 95,
    lastUpdated: '2024-01-14',
    xpEarned: 150,
  },
  {
    id: '3',
    type: 'evidence',
    title: 'Server Logs',
    owner: 'DevOps Team',
    status: 'compliant' as const,
    completionRate: 100,
    lastUpdated: '2024-01-15',
    xpEarned: 100,
  },
  {
    id: '4',
    type: 'risk',
    title: 'AI Risk Assessment',
    owner: 'Risk Team',
    status: 'at-risk' as const,
    completionRate: 72,
    lastUpdated: '2024-01-13',
    xpEarned: 75,
  },
  {
    id: '5',
    type: 'training',
    title: 'Security Training',
    owner: 'HR Team',
    status: 'compliant' as const,
    completionRate: 88,
    lastUpdated: '2024-01-12',
    xpEarned: 200,
  },
  {
    id: '6',
    type: 'vendor',
    title: 'AWS Assessment',
    owner: 'Procurement Team',
    status: 'compliant' as const,
    completionRate: 92,
    lastUpdated: '2024-01-14',
    xpEarned: 180,
  },
  {
    id: '7',
    type: 'audit',
    title: 'Audit Readiness',
    owner: 'Compliance Team',
    status: 'non-compliant' as const,
    completionRate: 45,
    lastUpdated: '2024-01-10',
    xpEarned: 0,
  },
  {
    id: '8',
    type: 'trust-center',
    title: 'Public Trust Center',
    owner: 'Marketing Team',
    status: 'compliant' as const,
    completionRate: 100,
    lastUpdated: '2024-01-15',
    xpEarned: 300,
  },
];

const typeIcons = {
  framework: Shield,
  policy: FileText,
  evidence: Database,
  risk: AlertTriangle,
  training: GraduationCap,
  vendor: Users,
  audit: ClipboardCheck,
  'trust-center': Award,
};

export const ComplianceScorecard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredData = complianceData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'green';
      case 'at-risk':
        return 'amber';
      case 'non-compliant':
        return 'red';
      default:
        return 'green';
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 95) return 'text-status-green';
    if (rate >= 80) return 'text-status-amber';
    return 'text-status-red';
  };

  return (
    <Card className="p-4 sm:p-6 bg-gradient-card border border-border/50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            Compliance Scorecard
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Detailed view of all compliance nodes and their current status
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-3 top-5 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('compliant')}>
                Compliant
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('at-risk')}>
                At Risk
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setStatusFilter('non-compliant')}
              >
                Non-Compliant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table with scroll on mobile */}
      <div className="rounded-lg border border-border/50 overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="text-xs sm:text-sm">Node</TableHead>
              <TableHead className="text-xs sm:text-sm">Owner</TableHead>
              <TableHead className="text-xs sm:text-sm">Status</TableHead>
              <TableHead className="text-xs sm:text-sm">Completion</TableHead>
              <TableHead className="text-xs sm:text-sm">Last Updated</TableHead>
              <TableHead className="text-xs sm:text-sm">XP Earned</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => {
              const Icon =
                typeIcons[item.type as keyof typeof typeIcons];
              return (
                <TableRow key={item.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-xs sm:text-sm text-foreground">
                          {item.title}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground capitalize">
                          {item.type.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-[10px] sm:text-xs">
                      {item.owner}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <StatusIndicator
                        status={getStatusColor(item.status) as any}
                        label=""
                        size="sm"
                      />
                      <span className="text-[10px] sm:text-xs capitalize">
                        {item.status.replace('-', ' ')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-12 sm:w-16 bg-muted/30 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            item.completionRate >= 95
                              ? 'bg-status-green'
                              : item.completionRate >= 80
                              ? 'bg-status-amber'
                              : 'bg-status-red'
                          }`}
                          style={{ width: `${item.completionRate}%` }}
                        />
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-medium ${getCompletionColor(
                          item.completionRate
                        )}`}
                      >
                        {item.completionRate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[10px] sm:text-xs text-muted-foreground">
                    {item.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-status-amber" />
                      <span className="text-[10px] sm:text-xs font-medium">
                        {item.xpEarned}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Viewing details for: ${item.title}`)
                          }
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Editing node: ${item.title}`)}
                        >
                          Edit Node
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Viewing evidence for: ${item.title}`)
                          }
                        >
                          View Evidence
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          No compliance nodes match your current filters.
        </div>
      )}
    </Card>
  );
};
