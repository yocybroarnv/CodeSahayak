import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Trophy,
  Star,
  Target,
  BookOpen,
  Clock,
  Award,
  Settings,
  LogOut,
  Crown,
  Code,
  Calendar,
  CheckCircle2,
  Play,
  Zap,
  Brain,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { api, USE_MOCK_AUTH } from '@/store/authStore';
import { toast } from 'sonner';

interface DashboardStats {
  user: {
    streak: number;
    xp: number;
    level: number;
    isPro: boolean;
    lastActive?: string;
  };
  stats: {
    totalConcepts: number;
    masteredConcepts: number;
    totalAttempts: number;
    averageMastery: number;
  };
  progress: Array<{
    concept: string;
    masteryLevel: number;
    attempts: number;
  }>;
  recentSubmissions: Array<{
    id: string;
    assignment: {
      title: string;
      subject: string;
    };
    status: string;
    score?: number;
    submittedAt: string;
  }>;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const data = await api.request('/user/dashboard');
        setStats(data);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        const isAuthError = errorMsg.includes('Unauthorized') || errorMsg.includes('HTTP 401') || errorMsg.includes('HTTP 403');
        
        if (isAuthError) {
          logout();
          navigate('/auth');
          return;
        }

        if (USE_MOCK_AUTH) {
          console.log('Using mock dashboard data');
          setStats({
            user: {
              streak: user?.streak || 7,
              xp: user?.xp || 450,
              level: user?.level || 5,
              isPro: user?.isPro || false,
              lastActive: new Date().toISOString(),
            },
            stats: {
              totalConcepts: 15,
              masteredConcepts: 8,
              totalAttempts: 45,
              averageMastery: 65,
            },
            progress: [
              { concept: 'Variables & Data Types', masteryLevel: 85, attempts: 12 },
              { concept: 'Control Flow', masteryLevel: 70, attempts: 8 },
              { concept: 'Functions', masteryLevel: 60, attempts: 10 },
              { concept: 'Arrays & Lists', masteryLevel: 75, attempts: 15 },
            ],
            recentSubmissions: [
              {
                id: '1',
                assignment: { title: 'Binary Search Implementation', subject: 'Algorithms' },
                status: 'PASSED',
                score: 95,
                submittedAt: new Date().toISOString(),
              },
              {
                id: '2',
                assignment: { title: 'Sorting Algorithm', subject: 'Data Structures' },
                status: 'REVIEWED',
                score: 88,
                submittedAt: new Date().toISOString(),
              },
            ],
          });
        } else {
          console.error('Failed to fetch dashboard:', error);
          toast.error('Failed to load dashboard data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated, navigate, user, logout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#6C5CE7] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !stats) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#636E72] mb-4">Unable to load dashboard</p>
          <Button onClick={() => navigate('/auth')}>Back to Login</Button>
        </div>
      </div>
    );
  }

  const xpToNextLevel = (user.level || 1) * 100;
  const currentLevelXp = (user.xp || 0) % 100;
  const xpProgress = (currentLevelXp / 100) * 100;

  // Mock data for learning paths and upcoming assignments
  const learningPaths = [
    { id: 1, title: 'Python Basics', progress: 75, lessons: 12, completed: 9, color: '#2E86AB' },
    { id: 2, title: 'Data Structures', progress: 40, lessons: 15, completed: 6, color: '#6C5CE7' },
    { id: 3, title: 'Web Development', progress: 20, lessons: 20, completed: 4, color: '#14b8a6' },
  ];

  const upcomingAssignments = [
    { id: 1, title: 'Binary Search Implementation', subject: 'Algorithms', dueDate: '2026-03-12', difficulty: 'Medium' },
    { id: 2, title: 'React Component Design', subject: 'Web Dev', dueDate: '2026-03-15', difficulty: 'Hard' },
    { id: 3, title: 'SQL Query Practice', subject: 'Databases', dueDate: '2026-03-18', difficulty: 'Easy' },
  ];

  const recentActivity = [
    { id: 1, type: 'completed', title: 'Completed "Arrays & Lists"', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-500' },
    { id: 2, type: 'streak', title: 'Maintained 7-day streak!', time: '1 day ago', icon: Flame, color: 'text-orange-500' },
    { id: 3, type: 'level', title: 'Reached Level 5', time: '2 days ago', icon: Trophy, color: 'text-yellow-500' },
    { id: 4, type: 'submission', title: 'Submitted "Sorting Algorithm"', time: '3 days ago', icon: Code, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      {/* Header */}
      <header className="bg-white border-b border-[#E8EAF6] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <div>
              <span className="font-bold text-xl text-[#1A1D2B]">CodeSahayak</span>
              <span className="ml-2 text-xs text-[#636E72] hidden sm:inline">Student Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.isPro && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full text-white text-xs font-semibold shadow-md">
                <Crown className="w-3.5 h-3.5" />
                PRO
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-sm text-orange-700">{stats?.user?.streak || 0}</span>
            </div>
            <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => toast.info('Settings panel coming soon! You can update your profile and language preferences here.')}>
              <Settings className="w-5 h-5 text-[#636E72]" />
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="w-5 h-5 text-[#636E72]" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section with Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1D2B]">
                Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
              </h1>
              <p className="text-[#636E72] mt-1 text-sm sm:text-base">
                Keep up your {stats?.user?.streak || 0}-day streak. You're doing amazing!
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:shadow-lg transition-all"
                onClick={() => navigate('/ide')}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Coding
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/editor')}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Learn
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all border-[#E8EAF6] bg-gradient-to-br from-white to-purple-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Level {user?.level || 1}</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">{user?.xp || 0} XP</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] rounded-xl flex items-center justify-center shadow-md">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={xpProgress} className="h-2 bg-purple-100" />
                  <p className="text-xs text-[#636E72] mt-2">
                    {currentLevelXp} / {xpToNextLevel} XP to level {(user?.level || 1) + 1}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-all border-[#E8EAF6] bg-gradient-to-br from-white to-orange-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Streak</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">{stats?.user?.streak || 0} days</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-[#636E72] mt-4">
                  🔥 Keep learning daily to maintain it!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-all border-[#E8EAF6] bg-gradient-to-br from-white to-yellow-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Concepts Mastered</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">
                      {stats?.stats?.masteredConcepts || 0} / {stats?.stats?.totalConcepts || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-[#636E72] mt-4">
                  ⭐ {stats?.stats?.averageMastery || 0}% average mastery
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-all border-[#E8EAF6] bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Total Attempts</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">{stats?.stats?.totalAttempts || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-[#636E72] mt-4">
                  💪 Practice makes perfect!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Learning Paths & Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Paths */}
            <Card className="border-[#E8EAF6]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl">Your Learning Paths</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/editor')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPaths.map((path) => (
                    <div
                      key={path.id}
                      className="p-4 rounded-xl border border-[#E8EAF6] hover:border-[#6C5CE7] hover:shadow-md transition-all cursor-pointer bg-white"
                      onClick={() => navigate('/editor')}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${path.color}15` }}
                          >
                            <BookOpen className="w-5 h-5" style={{ color: path.color }} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#1A1D2B]">{path.title}</h4>
                            <p className="text-xs text-[#636E72]">
                              {path.completed} / {path.lessons} lessons completed
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-bold" style={{ color: path.color }}>
                          {path.progress}%
                        </span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Concept Progress upgraded to interactive visual SVG Mastery tree */}
            <Card className="border-[#E8EAF6] overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 border-b border-[#E8EAF6]">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#6C5CE7]" />
                      Interactive Concept Mastery Map
                    </CardTitle>
                    <p className="text-xs text-[#636E72] mt-0.5">Click nodes to auto-load CBSE/NCERT learning modules directly into the workspace</p>
                  </div>
                  <Badge className="bg-[#6C5CE7] text-white">Interactive Graph</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-slate-950/5 relative">
                {/* SVG Mastery Map */}
                <div className="relative w-full h-[320px] flex items-center justify-center bg-[#1E1E2E] rounded-2xl border border-[#2D2D3A] overflow-hidden shadow-inner">
                  {/* Dynamic Dependency Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="line-grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
                      </linearGradient>
                      <linearGradient id="line-grad-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    {/* Connection Paths (Dependencies) */}
                    <path d="M 120 70 L 250 150" stroke="url(#line-grad-green)" strokeWidth="2" strokeDasharray="5,5" className="animate-dash" />
                    <path d="M 120 250 L 250 150" stroke="url(#line-grad-green)" strokeWidth="2" strokeDasharray="5,5" className="animate-dash" />
                    <path d="M 250 150 L 400 150" stroke="url(#line-grad-green)" strokeWidth="2.5" strokeDasharray="6,6" className="animate-dash" />
                    <path d="M 400 150 L 530 70" stroke="url(#line-grad-yellow)" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" />
                    <path d="M 400 150 L 530 250" stroke="url(#line-grad-yellow)" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" />
                  </svg>

                  {/* Node Items */}
                  {[
                    { id: 'var', label: 'Variables', x: '12%', y: '20%', mastery: 85, attempts: 12, description: 'Declaration & Primitive types' },
                    { id: 'lists', label: 'Lists & Arrays', x: '12%', y: '80%', mastery: 75, attempts: 15, description: 'Index parsing & Mutations' },
                    { id: 'flow', label: 'Control Flow', x: '40%', y: '50%', mastery: 70, attempts: 8, description: 'Loop bounds & If queries' },
                    { id: 'func', label: 'Functions', x: '68%', y: '50%', mastery: 60, attempts: 10, description: 'Parameters & Return scope' },
                    { id: 'recur', label: 'Recursion', x: '88%', y: '20%', mastery: 35, attempts: 6, description: 'Base case dry-runs' },
                    { id: 'oop', label: 'OOP & Classes', x: '88%', y: '80%', mastery: 20, attempts: 4, description: 'Object inheritance models' }
                  ].map((node) => {
                    const isHigh = node.mastery >= 80;
                    const isMed = node.mastery >= 40 && node.mastery < 80;
                    return (
                      <motion.div
                        key={node.id}
                        onClick={() => {
                          toast.success(`Loading ${node.label} curriculum sets...`);
                          navigate('/ide');
                        }}
                        whileHover={{ scale: 1.08 }}
                        className="absolute cursor-pointer p-3 rounded-xl border flex flex-col justify-between w-[140px] text-left shadow-lg backdrop-blur-md"
                        style={{
                          left: node.x,
                          top: node.y,
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: isHigh ? 'rgba(16,185,129,0.1)' : isMed ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                          borderColor: isHigh ? '#10B981' : isMed ? '#F59E0B' : '#EF4444',
                          boxShadow: isHigh ? '0 0 12px rgba(16,185,129,0.2)' : isMed ? '0 0 12px rgba(245,158,11,0.2)' : '0 0 12px rgba(239,68,68,0.2)',
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-white tracking-wide truncate">{node.label}</span>
                          <span className={`text-[9px] font-bold px-1 rounded ${
                            isHigh ? 'bg-green-500/20 text-green-400' :
                            isMed ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400 animate-pulse'
                          }`}>{node.mastery}%</span>
                        </div>
                        <span className="text-[8px] text-gray-400 leading-tight block line-clamp-2">{node.description}</span>
                        <div className="mt-1 flex items-center justify-between text-[8px] text-gray-500 border-t border-white/5 pt-1">
                          <span>{node.attempts} attempts</span>
                          <span className="text-[#6C5CE7] hover:underline font-bold">Code →</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <Card className="border-[#E8EAF6]">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? (
                    stats.recentSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-4 bg-[#F6F7FB] rounded-xl hover:bg-[#F0F4FA] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Code className="w-5 h-5 text-[#6C5CE7]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1A1D2B] text-sm">{sub.assignment.title}</p>
                            <p className="text-xs text-[#636E72]">{sub.assignment.subject}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            sub.status === 'PASSED' ? 'bg-green-500' :
                            sub.status === 'FAILED' ? 'bg-red-500' :
                            sub.status === 'REVIEWED' ? 'bg-blue-500' :
                            'bg-yellow-500'
                          }>
                            {sub.status}
                          </Badge>
                          {sub.score !== undefined && (
                            <p className="text-xs text-[#636E72] mt-1">{sub.score}/100</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-[#636E72]">
                      <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">No submissions yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Upcoming & Activity */}
          <div className="space-y-6">
            {/* Upcoming Assignments */}
            <Card className="border-[#E8EAF6]">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#6C5CE7]" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="p-3 rounded-lg border border-[#E8EAF6] hover:border-[#6C5CE7] hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-[#1A1D2B] leading-tight">
                          {assignment.title}
                        </h4>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            assignment.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                            assignment.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-red-500 text-red-700'
                          }`}
                        >
                          {assignment.difficulty}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#636E72] mb-2">{assignment.subject}</p>
                      <div className="flex items-center gap-1 text-xs text-orange-600">
                        <Clock className="w-3 h-3" />
                        Due {assignment.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-[#E8EAF6]">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor:
                            activity.color === 'text-green-500' ? 'rgba(34,197,94,0.1)' :
                            activity.color === 'text-orange-500' ? 'rgba(249,115,22,0.1)' :
                            activity.color === 'text-yellow-500' ? 'rgba(234,179,8,0.1)' :
                            'rgba(59,130,246,0.1)'
                        }}
                      >
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1A1D2B] font-medium leading-tight">
                          {activity.title}
                        </p>
                        <p className="text-xs text-[#636E72] mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements Preview */}
            <Card className="border-[#E8EAF6] bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#6C5CE7]" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: '🎯', unlocked: (stats?.stats?.totalAttempts || 0) > 0 },
                    { icon: '🔥', unlocked: (stats?.user?.streak || 0) >= 3 },
                    { icon: '⚡', unlocked: (stats?.user?.streak || 0) >= 7 },
                    { icon: '🧠', unlocked: (stats?.stats?.masteredConcepts || 0) >= 5 },
                    { icon: '💎', unlocked: (user?.xp || 0) >= 500 },
                    { icon: '🚀', unlocked: (user?.level || 0) >= 5 },
                  ].map((achievement, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] shadow-md'
                          : 'bg-gray-100 opacity-40 grayscale'
                      }`}
                    >
                      {achievement.icon}
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toast.success(`You have ${(stats?.stats?.masteredConcepts || 0)} mastered concepts! Full achievements page coming soon.`)}
                >
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
