import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, 
  Target, 
  Flame, 
  Award, 
  Shield, 
  CheckCircle, 
  Zap,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  score: number;
  badges: number;
  department: string;
}

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Incident Response Tested',
    description: 'Successfully completed incident response drill',
    icon: Shield,
    earned: true,
    earnedDate: '2 days ago',
    rarity: 'epic'
  },
  {
    id: '2',
    name: 'Encryption Verified',
    description: 'Validated encryption-at-rest implementation',
    icon: CheckCircle,
    earned: true,
    earnedDate: '5 days ago',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Policy Pioneer',
    description: 'Created comprehensive security policy',
    icon: Award,
    earned: true,
    earnedDate: '1 week ago',
    rarity: 'common'
  },
  {
    id: '4',
    name: 'Audit Ace',
    description: 'Achieve 100% audit readiness score',
    icon: Trophy,
    earned: false,
    rarity: 'legendary'
  },
  {
    id: '5',
    name: 'Zero Day Hero',
    description: 'Maintain zero critical issues for 30 days',
    icon: Zap,
    earned: false,
    rarity: 'epic'
  }
];

const mockLeaderboard: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: '/placeholder.svg',
    score: 2840,
    badges: 12,
    department: 'Security Team'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: '/placeholder.svg',
    score: 2650,
    badges: 10,
    department: 'DevOps Team'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    avatar: '/placeholder.svg',
    score: 2390,
    badges: 9,
    department: 'Compliance Team'
  },
  {
    id: '4',
    name: 'David Park',
    avatar: '/placeholder.svg',
    score: 2180,
    badges: 8,
    department: 'IT Team'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    avatar: '/placeholder.svg',
    score: 1920,
    badges: 7,
    department: 'Risk Team'
  }
];

const rarityConfig = {
  common: { color: 'text-muted-foreground', bg: 'bg-muted/10' },
  rare: { color: 'text-status-green', bg: 'bg-status-green/10' },
  epic: { color: 'text-status-amber', bg: 'bg-status-amber/10' },
  legendary: { color: 'text-primary', bg: 'bg-primary/10' }
};

export const GamificationLayer = () => {
  const currentScore = 2840;
  const maxScore = 3000;
  const compliancePercentage = (currentScore / maxScore) * 100;
  const streakDays = 14;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Compliance Score Tracker */}
      <Card className="p-6 bg-gradient-card border border-border/50 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Compliance Score</h3>
            <p className="text-xs text-muted-foreground">Progress to 100% readiness</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.round(compliancePercentage)}%
            </div>
            <div className="text-sm text-muted-foreground">
              {currentScore} / {maxScore} points
            </div>
          </div>

          <Progress 
            value={compliancePercentage} 
            className="h-3 bg-muted"
          />

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Flame className="h-3 w-3 text-status-amber" />
              <span className="text-muted-foreground">{streakDays} day streak</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-status-green" />
              <span className="text-status-green">+120 this week</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Badges Collection */}
      <Card className="p-6 bg-gradient-card border border-border/50 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-status-amber" />
            <div>
              <h3 className="font-semibold text-foreground">Badges</h3>
              <p className="text-xs text-muted-foreground">
                {mockBadges.filter(b => b.earned).length} of {mockBadges.length} earned
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mockBadges.slice(0, 4).map((badge) => {
            const Icon = badge.icon;
            const config = rarityConfig[badge.rarity];
            
            return (
              <div 
                key={badge.id}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-300",
                  badge.earned 
                    ? `${config.bg} border-current ${config.color}` 
                    : "bg-muted/5 border-muted text-muted-foreground opacity-50"
                )}
              >
                <Icon className="h-6 w-6 mb-2 mx-auto" />
                <div className="text-center">
                  <div className="text-xs font-medium truncate">{badge.name}</div>
                  {badge.earned && (
                    <div className="text-xs opacity-75">{badge.earnedDate}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-6 bg-gradient-card border border-border/50 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-5 w-5 text-status-amber" />
          <div>
            <h3 className="font-semibold text-foreground">Team Leaderboard</h3>
            <p className="text-xs text-muted-foreground">Top compliance contributors</p>
          </div>
        </div>

        <div className="space-y-3">
          {mockLeaderboard.slice(0, 5).map((member, index) => (
            <div key={member.id} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold">
                {index + 1}
              </div>
              
              <Avatar className="w-8 h-8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {member.name}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {member.department}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-primary">
                  {member.score.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {member.badges} badges
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};