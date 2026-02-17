
import React, { useEffect, useState } from 'react';
// Added missing Link import from react-router-dom
import { Link } from 'react-router-dom';
import { 
  Flame, 
  HelpCircle, 
  ClipboardCheck, 
  Trophy, 
  Calendar, 
  Play, 
  BrainCircuit,
  ArrowUpRight,
  ChevronRight,
  Zap,
  BarChart3,
  TrendingUp,
  Award,
  FileText,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  Target,
  Users,
  Plus,
  BookOpen,
  RefreshCw,
  Monitor
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { getAIInsights } from '../services/geminiService';
import { UserRole, Quiz } from '../types';

interface DashboardProps {
  userRole: UserRole;
}

const PERFORMANCE_DATA = [
  { name: 'Mon', score: 65, avg: 60 },
  { name: 'Tue', score: 78, avg: 62 },
  { name: 'Wed', score: 72, avg: 65 },
  { name: 'Thu', score: 85, avg: 64 },
  { name: 'Fri', score: 92, avg: 68 },
  { name: 'Sat', score: 88, avg: 70 },
  { name: 'Sun', score: 95, avg: 72 },
];

const BATCH_PERFORMANCE = [
  { name: 'Grade 9-A', score: 82, target: 85 },
  { name: 'Grade 9-B', score: 75, target: 85 },
  { name: 'Grade 10-C', score: 91, target: 90 },
  { name: 'Grade 8-D', score: 68, target: 80 },
];

const CONCEPT_MASTERY = [
  { concept: 'Algebra', level: 95, subject: 'Math' },
  { concept: 'Quadratic Eq', level: 42, subject: 'Math' },
  { concept: 'Atomic Structure', level: 88, subject: 'Science' },
  { concept: 'Thermodynamics', level: 65, subject: 'Science' },
  { concept: 'Tenses', level: 78, subject: 'English' },
  { concept: 'Grammar', level: 85, subject: 'English' },
];

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    fetchData();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  const fetchData = async () => {
    setLoadingInsights(true);
    setIsRefreshing(true);
    try {
      const insights = await getAIInsights("Student performance monitoring. Current Week: Oct 21-27.");
      setAiInsights(insights);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingInsights(false);
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const isParent = userRole === UserRole.PARENT;
  const isTeacher = userRole === UserRole.TEACHER;

  const chartTheme = {
    text: isDark ? '#94A3B8' : '#6B7280',
    grid: isDark ? '#334155' : '#f0f0f0',
    tooltipBg: isDark ? '#1E293B' : '#FFFFFF',
    tooltipText: isDark ? '#F8FAFC' : '#2C3E50'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl md:text-3xl font-bold ${isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'} dark:text-[#90C2E7]`}>
            {isTeacher ? 'Teacher Overview' : isParent ? "Rahul's Progress" : "Student Dashboard 👋"}
          </h1>
          <p className="text-[#6B7280] dark:text-slate-400">
            {isTeacher ? "Manage batches and review grading queues." : "Empowering exceptional minds today."}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-xl shadow-sm mr-2">
            <Monitor size={16} className="text-[#22819A]" />
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Multi-Device Sync: Active</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <button 
            onClick={fetchData}
            className={`p-2.5 bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-xl text-[#22819A] dark:text-[#90C2E7] hover:bg-[#FEF7F8] dark:hover:bg-slate-700 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
            title="Refresh Data"
          >
            <RefreshCw size={20} />
          </button>

          {isTeacher && (
            <button className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#0d9468] transition-all">
              <Plus size={18} /> New Assignment
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<Flame className="text-orange-500" />} 
          label={isParent ? "Weekly Engagement" : "Learning Streak"} 
          value={isParent ? "94%" : "7 Days"} 
          subtext={isParent ? "825 mins logged" : "Next goal: 10 Days"} 
          progress={isParent ? 94 : 70}
        />
        <StatCard 
          icon={<Trophy className="text-yellow-500" />} 
          label="Current Standing" 
          value="12th / 38" 
          subtext="Mathematics Mastery Batch" 
          trend="up"
        />
        <StatCard 
          icon={<Zap className="text-[#22819A] dark:text-[#90C2E7]" />} 
          label="Quiz Score Avg" 
          value="24.5 / 30" 
          subtext="Last 5 Assessments" 
          trend="up"
        />
        <StatCard 
          icon={<Award className="text-purple-500" />} 
          label="Mastery Index" 
          value="84%" 
          subtext="Across all chapters" 
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-custom p-6 border border-[#CDD4DD] dark:border-slate-700 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#2C3E50] dark:text-slate-200 flex items-center gap-2">
                <BarChart3 size={20} className="text-[#22819A]" /> {isTeacher ? 'Batch Analytics' : 'Score Progression'}
              </h2>
            </div>
            {/* Wrap in min-h and min-w-0 to prevent Recharts -1 width warning */}
            <div className="h-[300px] min-h-[300px] w-full min-w-0 overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                {isTeacher ? (
                   <BarChart data={BATCH_PERFORMANCE}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.grid} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartTheme.text, fontSize: 11}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: chartTheme.text, fontSize: 11}} />
                    <Tooltip contentStyle={{backgroundColor: chartTheme.tooltipBg, borderRadius: '12px', border: 'none', color: chartTheme.tooltipText}} />
                    <Bar dataKey="score" fill="#10B981" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                ) : (
                  <AreaChart data={PERFORMANCE_DATA}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22819A" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#22819A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartTheme.grid} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: chartTheme.text, fontSize: 11}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: chartTheme.text, fontSize: 11}} />
                    <Tooltip contentStyle={{backgroundColor: chartTheme.tooltipBg, borderRadius: '12px', border: 'none', color: chartTheme.tooltipText}} />
                    <Area type="monotone" dataKey="score" stroke="#22819A" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-custom p-6 border border-[#CDD4DD] dark:border-slate-700">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#2C3E50] dark:text-slate-200">Upcoming Live Sessions</h2>
                <Link to="/schedule" className="text-xs font-bold text-[#22819A] hover:underline">View Calendar</Link>
             </div>
             <div className="space-y-4">
               {[
                 { time: '04:00 PM', title: 'Quadratic Equations Final Recap', batch: 'Math 9A', room: 'Live Room 1' },
                 { time: '06:00 PM', title: 'Atomic Structures - Advanced', batch: 'Science 9B', room: 'Live Room 2' },
               ].map((c, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-[#FEF7F8] dark:bg-slate-900/50 rounded-2xl border border-transparent hover:border-[#90C2E7]/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[60px] p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                        <p className="text-xs font-bold text-[#22819A]">{c.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2C3E50] dark:text-slate-100">{c.title}</p>
                        <p className="text-[10px] text-[#6B7280] dark:text-slate-500 uppercase tracking-widest">{c.batch} • {c.room}</p>
                      </div>
                    </div>
                    <button className="p-3 bg-white dark:bg-slate-800 text-[#22819A] dark:text-[#90C2E7] rounded-xl border border-[#CDD4DD] dark:border-slate-700 hover:bg-[#22819A] hover:text-white transition-all">
                      <Play size={16} fill="currentColor" />
                    </button>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#22819A] to-[#1a6b7f] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            <BrainCircuit size={100} className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 space-y-4">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Zap size={20} className="text-yellow-300" /> AI Growth Insights
              </h2>
              {loadingInsights ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-3 bg-white/20 rounded w-full"></div>
                  <div className="h-3 bg-white/20 rounded w-5/6"></div>
                  <div className="h-3 bg-white/20 rounded w-4/6"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-white/90 leading-relaxed italic">
                    "{aiInsights?.recommendation || "Focus on active recall for your Science chapters this week."}"
                  </p>
                  <div className="pt-2">
                    <button className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30">
                      View Detailed Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-custom p-6 border border-[#CDD4DD] dark:border-slate-700">
            <h2 className="text-lg font-bold text-[#2C3E50] dark:text-slate-200 mb-6 flex items-center gap-2">
              <Target size={18} className="text-[#22819A]" /> Concept Mastery
            </h2>
            <div className="space-y-5">
              {CONCEPT_MASTERY.slice(0, 4).map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                    <span>{item.concept}</span>
                    <span className={item.level < 50 ? 'text-red-500' : 'text-[#22819A]'}>{item.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-1000 ${item.level < 50 ? 'bg-orange-400' : 'bg-[#22819A]'}`} style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-[#CDD4DD] dark:border-slate-700 rounded-xl text-[10px] font-bold text-[#6B7280] dark:text-slate-400 hover:text-[#22819A] transition-all">
               VIEW FULL TOPIC ANALYSIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: any, label: string, value: string, subtext: string, progress?: number, trend?: 'up' | 'down' }> = 
  ({ icon, label, value, subtext, progress, trend }) => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-custom border border-[#CDD4DD] dark:border-slate-700 transition-all hover:shadow-lg group">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2.5 bg-[#FEF7F8] dark:bg-slate-900/50 rounded-xl border border-[#CDD4DD]/20 dark:border-slate-700 transition-colors group-hover:border-[#22819A]/40">
        {icon}
      </div>
      {trend && (
        <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center gap-1">
          <ArrowUpRight size={10} /> +12%
        </div>
      )}
    </div>
    <p className="text-[10px] text-[#6B7280] dark:text-slate-500 font-bold uppercase tracking-widest">{label}</p>
    <p className="text-2xl font-bold text-[#2C3E50] dark:text-slate-100 mt-1">{value}</p>
    <p className="text-[10px] text-[#6B7280] dark:text-slate-400 mt-1 font-medium">{subtext}</p>
    {progress !== undefined && (
      <div className="mt-4 h-1.5 bg-[#FEF7F8] dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
        <div className="h-full bg-[#22819A] rounded-full transition-all duration-1000" style={{width: `${progress}%`}}></div>
      </div>
    )}
  </div>
);

export default Dashboard;
