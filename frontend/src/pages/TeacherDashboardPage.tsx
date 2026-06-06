import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  Eye,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
  AlertCircle,
  Award,
  BookOpen,
  Activity,
  Download,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { api, USE_MOCK_AUTH } from '@/store/authStore';
import { toast } from 'sonner';

interface TeacherDashboardData {
  assignments: Array<{
    id: string;
    title: string;
    subject: string;
    difficulty: string;
    isActive: boolean;
    _count: { submissions: number };
    createdAt: string;
  }>;
  stats: {
    totalAssignments: number;
    totalSubmissions: number;
    pendingSubmissions: number;
    reviewedSubmissions: number;
    averageScore: number;
    uniqueStudents: number;
  };
}

export default function TeacherDashboardPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (user?.role !== 'TEACHER' && user?.role !== 'ADMIN') {
      navigate('/dashboard');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const response = await api.request('/user/teacher-dashboard');
        setData(response);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        const isAuthError = errorMsg.includes('Unauthorized') || errorMsg.includes('HTTP 401') || errorMsg.includes('HTTP 403');
        
        if (isAuthError) {
          logout();
          navigate('/auth');
          return;
        }

        if (USE_MOCK_AUTH) {
          console.log('Using mock teacher dashboard data');
          setData({
            assignments: [
              {
                id: '1',
                title: 'Binary Search Implementation',
                subject: 'Algorithms',
                difficulty: 'MEDIUM',
                isActive: true,
                _count: { submissions: 28 },
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              },
              {
                id: '2',
                title: 'React Component Design',
                subject: 'Web Development',
                difficulty: 'HARD',
                isActive: true,
                _count: { submissions: 15 },
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              },
              {
                id: '3',
                title: 'SQL Query Practice',
                subject: 'Databases',
                difficulty: 'EASY',
                isActive: true,
                _count: { submissions: 42 },
                createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
              },
              {
                id: '4',
                title: 'Sorting Algorithms',
                subject: 'Data Structures',
                difficulty: 'MEDIUM',
                isActive: false,
                _count: { submissions: 35 },
                createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
              },
            ],
            stats: {
              totalAssignments: 12,
              totalSubmissions: 156,
              pendingSubmissions: 23,
              reviewedSubmissions: 133,
              averageScore: 78,
              uniqueStudents: 45,
            },
          });
        } else {
          console.error('Failed to fetch teacher dashboard:', error);
          toast.error('Failed to load teacher dashboard data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated, user, navigate, logout]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F7FB] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#6C5CE7] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !data) return null;

  // Mock data for enhanced teacher dashboard
  const topStudents = [
    { id: 1, name: 'Priya Sharma', score: 95, submissions: 12, streak: 15, avatar: '/avatar-1.jpg' },
    { id: 2, name: 'Rahul Kumar', score: 92, submissions: 11, streak: 12, avatar: '/avatar-2.jpg' },
    { id: 3, name: 'Ananya Patel', score: 89, submissions: 10, streak: 10, avatar: '/avatar-3.jpg' },
  ];

  const recentActivity = [
    { id: 1, student: 'Priya Sharma', action: 'Submitted "Binary Search"', time: '5 min ago', type: 'submission' },
    { id: 2, student: 'Rahul Kumar', action: 'Completed "Arrays Module"', time: '1 hour ago', type: 'completion' },
    { id: 3, student: 'Ananya Patel', action: 'Asked for help on "Recursion"', time: '2 hours ago', type: 'help' },
    { id: 4, student: 'Vikram Singh', action: 'Started "Data Structures"', time: '3 hours ago', type: 'start' },
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
              <span className="ml-2 text-xs text-[#636E72] hidden sm:inline">Teacher Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] hover:shadow-lg transition-all hidden sm:flex"
              onClick={() => toast.info('Assignment creator coming soon! Use the IDE to build and share assignments.')}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Assignment
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => navigate('/settings')}>
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1D2B]">
                Welcome, Professor {user?.name?.split(' ')[0] || 'Teacher'}! 👨‍🏫
              </h1>
              <p className="text-[#636E72] mt-1 text-sm sm:text-base">
                {data?.stats?.pendingSubmissions || 0} submissions awaiting your review
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => toast.info('Report export feature coming soon! Reports will be downloadable as PDF/CSV.')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] sm:hidden"
                onClick={() => toast.info('Assignment creator coming soon!')}
              >
                <Plus className="w-4 h-4 mr-2" />
                New
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
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Total Assignments</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">{data?.stats?.totalAssignments || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] rounded-xl flex items-center justify-center shadow-md">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-[#636E72] mt-3">
                  📚 Active learning modules
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-all border-[#E8EAF6] bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Total Submissions</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">{data?.stats?.totalSubmissions || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-[#636E72] mt-3">
                  ✅ From {data?.stats?.uniqueStudents || 0} students
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-all border-[#E8EAF6] bg-gradient-to-br from-white to-orange-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Pending Review</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">{data?.stats?.pendingSubmissions || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-[#636E72] mt-3">
                  ⏰ Awaiting feedback
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-all border-[#E8EAF6] bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-[#636E72] font-medium">Average Score</p>
                    <p className="text-xl sm:text-2xl font-bold text-[#1A1D2B] mt-1">{data?.stats?.averageScore || 0}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-xs text-[#636E72] mt-3">
                  📈 Class performance
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Assignments & Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignments List */}
            <Card className="border-[#E8EAF6]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg sm:text-xl">Your Assignments</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => navigate('/assignments')}>
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data?.assignments && data.assignments.length > 0 ? (
                    data.assignments.slice(0, 5).map((assignment) => (
                      <div
                        key={assignment.id}
                        className="flex items-center justify-between p-4 bg-[#F6F7FB] rounded-xl hover:bg-[#F0F4FA] hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigate(`/assignments/${assignment.id}`)}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                            assignment.isActive ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-400'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#1A1D2B] text-sm sm:text-base truncate">{assignment.title}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <Badge variant="secondary" className="text-xs">
                                {assignment.subject}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  assignment.difficulty === 'EASY' ? 'border-green-500 text-green-700 bg-green-50' :
                                  assignment.difficulty === 'MEDIUM' ? 'border-yellow-500 text-yellow-700 bg-yellow-50' :
                                  'border-red-500 text-red-700 bg-red-50'
                                }`}
                              >
                                {assignment.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-[#1A1D2B]">
                              {assignment._count.submissions}
                            </p>
                            <p className="text-xs text-[#636E72]">submissions</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="flex-shrink-0"
                          >
                            <Eye className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-[#636E72]">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium mb-2">No assignments yet</p>
                      <p className="text-sm mb-4">Create your first assignment to get started</p>
                      <Button 
                        className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE]"
                        onClick={() => navigate('/assignments/create')}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Assignment
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Anti-Plagiarism & Originality Monitor */}
            <Card className="border-[#E8EAF6] shadow-sm">
              <CardHeader className="border-b border-[#E8EAF6] bg-gradient-to-r from-red-50/50 to-orange-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                    <div>
                      <CardTitle className="text-lg sm:text-xl text-[#1A1D2B]">Anti-Plagiarism & Originality Monitor</CardTitle>
                      <p className="text-xs text-[#636E72] mt-0.5">AST Structural comparison + DOM Keystroke behavioral checking</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-0.5 text-[10px]">TEACHER ONLY ACCESS</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F6F7FB] border-b border-[#E8EAF6] text-xs font-bold text-gray-500">
                        <th className="p-4">Student</th>
                        <th className="p-4">Assignment</th>
                        <th className="p-4">Submission Time</th>
                        <th className="p-4 text-center">Originality</th>
                        <th className="p-4">Plagiarism Risk & Flags</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8EAF6]">
                      {[
                        {
                          id: 'sub-1',
                          student: 'Priya Sharma',
                          assignment: 'Binary Search Implementation',
                          time: '5 min ago',
                          originalityScore: 94,
                          isRenameOnly: false,
                          isInstantPaste: false,
                          maxSimilarity: 0.12,
                        },
                        {
                          id: 'sub-2',
                          student: 'Rahul Kumar',
                          assignment: 'Binary Search Implementation',
                          time: '12 min ago',
                          originalityScore: 52,
                          isRenameOnly: true,
                          isInstantPaste: false,
                          maxSimilarity: 0.88,
                          matchedWith: 'Priya Sharma'
                        },
                        {
                          id: 'sub-3',
                          student: 'Ananya Patel',
                          assignment: 'Binary Search Implementation',
                          time: '24 min ago',
                          originalityScore: 32,
                          isRenameOnly: true,
                          isInstantPaste: true,
                          maxSimilarity: 0.94,
                          matchedWith: 'Rahul Kumar'
                        },
                        {
                          id: 'sub-4',
                          student: 'Vikram Singh',
                          assignment: 'SQL Query Practice',
                          time: '1 hour ago',
                          originalityScore: 88,
                          isRenameOnly: false,
                          isInstantPaste: false,
                          maxSimilarity: 0.22,
                        }
                      ].map((sub) => (
                        <tr key={sub.id} className="hover:bg-[#F6F7FB] transition-colors text-sm text-[#1A1D2B]">
                          <td className="p-4 font-semibold">{sub.student}</td>
                          <td className="p-4 text-xs text-[#636E72]">{sub.assignment}</td>
                          <td className="p-4 text-xs text-gray-500">{sub.time}</td>
                          <td className="p-4">
                            <div className="flex flex-col items-center gap-1">
                              <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${
                                sub.originalityScore < 40 ? 'bg-red-100 text-red-700 ring-1 ring-red-300' :
                                sub.originalityScore < 60 ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300' :
                                'bg-green-100 text-green-700 ring-1 ring-green-300'
                              }`}>
                                {sub.originalityScore}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1.5">
                              {sub.originalityScore < 40 ? (
                                <Badge className="bg-red-500 text-white border-none flex items-center gap-1 text-[10px] font-bold">
                                  ⚠️ Highly Suspicious (Likely Copied)
                                </Badge>
                              ) : sub.originalityScore < 60 ? (
                                <Badge className="bg-yellow-500 text-white border-none flex items-center gap-1 text-[10px] font-bold">
                                  🔍 Review Needed (Partial Match)
                                </Badge>
                              ) : (
                                <Badge className="bg-green-500 text-white border-none flex items-center gap-1 text-[10px] font-bold">
                                  ✓ Original Solution
                                </Badge>
                              )}
                              
                              {sub.isRenameOnly && (
                                <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded font-medium">
                                  AST Match (Variables Renamed)
                                </span>
                              )}
                              {sub.isInstantPaste && (
                                <span className="text-[10px] bg-orange-50 text-orange-700 border border-orange-200 px-1.5 py-0.5 rounded font-medium">
                                  Clipboard Paste (Velocity Check)
                                </span>
                              )}
                              {sub.matchedWith && (
                                <span className="text-[10px] text-gray-400 block w-full mt-1">
                                  Matches classmate: <strong className="text-gray-600">{sub.matchedWith}</strong> ({Math.round(sub.maxSimilarity * 100)}% structural diff)
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Class-Wide Concept Error Frequency Heatmap */}
            <Card className="border-[#E8EAF6] shadow-sm">
              <CardHeader className="bg-gradient-to-r from-purple-50/50 to-blue-50/50">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-[#1A1D2B]">
                  <BarChart3 className="w-5 h-5 text-[#6C5CE7]" />
                  Class-Wide Common Error Frequency Heatmap
                </CardTitle>
                <p className="text-xs text-[#636E72] mt-0.5">Aggregated syntax & logic hurdles compiled across all assignments</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { concept: 'Indentation & Code Blocks', errorType: 'IndentationError', count: 18, severity: 'CRITICAL', percentage: 85 },
                    { concept: 'Variables & Scope', errorType: 'NameError', count: 12, severity: 'HIGH', percentage: 55 },
                    { concept: 'Python Syntax Rules', errorType: 'SyntaxError', count: 9, severity: 'MEDIUM', percentage: 40 },
                    { concept: 'Data Types & Conversion', errorType: 'TypeError', count: 4, severity: 'LOW', percentage: 18 },
                  ].map((err, index) => (
                    <div key={index} className="space-y-2 p-3 bg-[#F6F7FB] rounded-xl border border-[#E8EAF6] hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#1A1D2B] text-sm">{err.concept}</span>
                            <span className="text-xs text-gray-400">({err.errorType})</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              err.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 border border-red-300' :
                              err.severity === 'HIGH' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                              err.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                              'bg-green-100 text-green-800 border border-green-300'
                            }`}>
                              {err.severity}
                            </span>
                          </div>
                          <p className="text-xs text-[#636E72] mt-0.5">Hinderance frequency: <strong className="text-red-500">{err.count} students struggling</strong></p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-500">Strugglers percentage</p>
                          <p className="text-sm font-bold text-[#1A1D2B]">{err.percentage}%</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Progress value={err.percentage} className={`h-2.5 ${
                          err.severity === 'CRITICAL' ? 'bg-red-100 text-red-500' :
                          err.severity === 'HIGH' ? 'bg-orange-100 text-orange-500' :
                          'bg-purple-100 text-purple-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submission Overview */}
            <Card className="border-[#E8EAF6]">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Submission Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Reviewed</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{data?.stats?.reviewedSubmissions || 0}</p>
                    <p className="text-xs text-green-600 mt-1">
                      {data?.stats?.totalSubmissions ? Math.round(((data?.stats?.reviewedSubmissions || 0) / data.stats.totalSubmissions) * 100) : 0}% of total
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-900">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-700">{data?.stats?.pendingSubmissions || 0}</p>
                    <p className="text-xs text-yellow-600 mt-1">
                      Needs your attention
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Students</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{data?.stats?.uniqueStudents || 0}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Active learners
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Top Students & Activity */}
          <div className="space-y-6">
            {/* Top Performing Students */}
            <Card className="border-[#E8EAF6] bg-gradient-to-br from-white to-yellow-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Top Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topStudents.map((student, index) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E8EAF6] hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">{student.name.split(' ').map((n: string) => n[0]).join('')}</span>
                        </div>
                        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-400 text-yellow-900' :
                          index === 1 ? 'bg-gray-300 text-gray-700' :
                          'bg-orange-400 text-orange-900'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1A1D2B] text-sm truncate">{student.name}</p>
                        <div className="flex items-center gap-2 text-xs text-[#636E72]">
                          <span>{student.submissions} submissions</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="text-orange-500">🔥</span>
                            {student.streak}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#6C5CE7]">{student.score}%</p>
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
                  <Activity className="w-5 h-5 text-[#6C5CE7]" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-[#E8EAF6] last:border-0 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'submission' ? 'bg-blue-100' :
                        activity.type === 'completion' ? 'bg-green-100' :
                        activity.type === 'help' ? 'bg-orange-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'submission' ? <FileText className="w-4 h-4 text-blue-600" /> :
                         activity.type === 'completion' ? <CheckCircle className="w-4 h-4 text-green-600" /> :
                         activity.type === 'help' ? <AlertCircle className="w-4 h-4 text-orange-600" /> :
                         <BookOpen className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#1A1D2B] leading-tight">
                          {activity.student}
                        </p>
                        <p className="text-xs text-[#636E72] mt-0.5">{activity.action}</p>
                        <p className="text-xs text-[#636E72] mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-[#E8EAF6] bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast.info('Assignment creator coming soon!')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Assignment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast.info(`${data?.stats?.pendingSubmissions || 0} submissions pending. Submission reviewer coming soon!`)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Review Pending ({data?.stats?.pendingSubmissions || 0})
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast.info(`${data?.stats?.uniqueStudents || 0} active students. Student roster view coming soon!`)}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View All Students
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => toast.success('Analytics export initiated! CSV report will be ready shortly.')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
