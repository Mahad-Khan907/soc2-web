import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Shield,
  FileText,
  Database,
  AlertTriangle,
  GraduationCap,
  Users,
  ClipboardCheck,
  Award,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { useState } from 'react';

const riskData = [
  {
    id: '1',
    type: 'framework',
    title: 'SOC 2 Type II',
    riskScore: 15,
    impact: 'high',
    likelihood: 'low',
    category: 'Security',
    trend: 'down',
  },
  {
    id: '2',
    type: 'policy',
    title: 'IT Security Policy',
    riskScore: 25,
    impact: 'medium',
    likelihood: 'low',
    category: 'Policy',
    trend: 'stable',
  },
  {
    id: '3',
    type: 'evidence',
    title: 'Server Logs',
    riskScore: 10,
    impact: 'low',
    likelihood: 'low',
    category: 'Technical',
    trend: 'down',
  },
  {
    id: '4',
    type: 'risk',
    title: 'AI Risk Assessment',
    riskScore: 75,
    impact: 'high',
    likelihood: 'medium',
    category: 'Operational',
    trend: 'up',
  },
  {
    id: '5',
    type: 'training',
    title: 'Security Training',
    riskScore: 35,
    impact: 'medium',
    likelihood: 'medium',
    category: 'Human',
    trend: 'down',
  },
  {
    id: '6',
    type: 'vendor',
    title: 'AWS Assessment',
    riskScore: 20,
    impact: 'medium',
    likelihood: 'low',
    category: 'Third Party',
    trend: 'stable',
  },
  {
    id: '7',
    type: 'audit',
    title: 'Audit Readiness',
    riskScore: 85,
    impact: 'high',
    likelihood: 'high',
    category: 'Compliance',
    trend: 'up',
  },
  {
    id: '8',
    type: 'trust-center',
    title: 'Public Trust Center',
    riskScore: 12,
    impact: 'low',
    likelihood: 'low',
    category: 'Reputational',
    trend: 'stable',
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

const getRiskColor = (score: number) => {
  if (score >= 70) return 'bg-status-red/20 border-status-red text-status-red';
  if (score >= 40) return 'bg-status-amber/20 border-status-amber text-status-amber';
  return 'bg-status-green/20 border-status-green text-status-green';
};

const getRiskLevel = (score: number) => {
  if (score >= 70) return 'High Risk';
  if (score >= 40) return 'Medium Risk';
  return 'Low Risk';
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'bg-status-red text-white';
    case 'medium': return 'bg-status-amber text-white';
    case 'low': return 'bg-status-green text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const RiskHeatmap = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('risk-score');

  const categories = ['all', ...Array.from(new Set(riskData.map(item => item.category)))];

  const filteredData = riskData
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'risk-score':
          return b.riskScore - a.riskScore;
        case 'impact':
          const impactOrder = { high: 3, medium: 2, low: 1 };
          return impactOrder[b.impact as keyof typeof impactOrder] - impactOrder[a.impact as keyof typeof impactOrder];
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return (
    <Card className="p-6 bg-gradient-card border border-border/50">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Risk Heatmap
          </h2>
          <p className="text-sm text-muted-foreground">
            Visual representation of compliance risks across all nodes
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="risk-score">Risk Score</SelectItem>
              <SelectItem value="impact">Impact</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-status border border-status-red/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Risk</p>
              <p className="text-2xl font-bold text-status-red">
                {filteredData.filter(item => item.riskScore >= 70).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-status-red" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-status border border-status-amber/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Medium Risk</p>
              <p className="text-2xl font-bold text-status-amber">
                {filteredData.filter(item => item.riskScore >= 40 && item.riskScore < 70).length}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-status-amber" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-status border border-status-green/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Risk</p>
              <p className="text-2xl font-bold text-status-green">
                {filteredData.filter(item => item.riskScore < 40).length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-status-green" />
          </div>
        </Card>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredData.map((item) => {
          const Icon = typeIcons[item.type as keyof typeof typeIcons];
          return (
            <Card
              key={item.id}
              className={`p-4 border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${getRiskColor(item.riskScore)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-background/10 backdrop-blur-sm">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1">
                  {item.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                  {item.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                  <span className="text-xs opacity-70">{item.trend}</span>
                </div>
              </div>
              
              <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                {item.title}
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">Risk Score</span>
                  <span className="text-lg font-bold">{item.riskScore}</span>
                </div>
                
                <div className="w-full bg-background/20 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-current transition-all duration-500"
                    style={{ width: `${item.riskScore}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="secondary" className={`${getImpactColor(item.impact)} border-0`}>
                    {item.impact} impact
                  </Badge>
                  <Badge variant="outline" className="text-xs opacity-70">
                    {item.category}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No risk data matches your current filters.
        </div>
      )}
    </Card>
  );
};