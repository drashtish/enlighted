
import React from 'react';
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Eye, 
  Calendar,
  Zap,
  BookOpen,
  BrainCircuit,
  Target,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const ATTENDANCE_DATA = [
  { day: 'Mon', scheduled: 180, attended: 180, doubts: 2 },
  { day: 'Tue', scheduled: 120, attended: 90, doubts: 5 },
  { day: 'Wed', scheduled: 180, attended: 180, doubts: 3 },
  { day: 'Thu', scheduled: 120, attended: 120, doubts: 4 },
  { day: 'Fri', scheduled: 180, attended: 165, doubts: 1 },
  { day: 'Sat', scheduled: 60, attended: 60, doubts: 0 },
];

const SUBJECT_PERFORMANCE = [
  { name: 'Mathematics', score: 92, average: 75, doubts: 8 },
  { name: 'Science', score: 85, average: 78, doubts: 12 },
  { name: 'English', score: 78, average: 82, doubts: 3 },
  { name: 'History', score: 88, average: 74, doubts: 2 },
];

const QUIZ_RECORDS = [
  { id: 'sun-1', title: 'Sunday AI Mastery Quiz', subject: 'Adaptive', score: 42, total: 50, date: 'Oct 27', pdf: true, type: 'AI Sunday', doubtsBasis: 15 },
  { id: '1', title: 'Quadratic Equations', subject: 'Math', score: 18, total: 20, date: 'Oct 24', pdf: true, type: 'Regular' },
  { id: '2', title: 'Periodic Table', subject: 'Science', score: 25, total: 30, date: 'Oct 22', pdf: true, type: 'Regular' },
];

const Monitoring: React.FC = () => {
  const totalScheduled = ATTENDANCE_DATA.reduce((acc, curr) => acc + curr.scheduled, 0);
  const totalAttended = ATTENDANCE_DATA.reduce((acc, curr) => acc + curr.attended, 0);
  const attendancePercentage = Math.round((totalAttended / totalScheduled) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#22819A]">Academic Monitoring</h1>
          <p className="text-[#6B7280]">Full visibility into child's weekly lecture engagement and adaptive testing</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-[#CDD4DD] flex items-center gap-2 shadow-sm">
            <Calendar size={18} className="text-[#22819A]" />
            <span className="text-sm font-bold text-[#2C3E50]">Week of Oct 21 - 27</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#CDD4DD] shadow-custom overflow-hidden">
        <div className="bg-[#22819A] p-6 text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <BrainCircuit size={32} className="text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Sunday AI Mastery Result</h2>
              <p className="text-white/70 text-sm italic">Generated from 15 doubts asked (Mon - Sat)</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-center bg-white/10 px-6 py-2 rounded-2xl border border-white/20">
                <p className="text-[10px] uppercase font-bold text-white/60">Final Score</p>
                <p className="text-2xl font-bold text-yellow-400">42 / 50</p>
             </div>
             <button className="bg-white text-[#22819A] px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-white/90 transition-all flex items-center gap-2">
                <Eye size={18} /> View Child's PDF
             </button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#6B7280] uppercase flex items-center gap-2">
               <Target size={14} className="text-[#22819A]" /> Concept Recovery Tracking
            </h4>
            <div className="space-y-3">
              <ConceptFixItem label="Quadratic Roots" status="Mastered" color="bg-green-500" />
              <ConceptFixItem label="Ionic Bonds" status="Partial" color="bg-yellow-500" />
              <ConceptFixItem label="Sentence Structure" status="Mastered" color="bg-green-500" />
            </div>
          </div>
          <div className="md:col-span-2 bg-[#FEF7F8] rounded-2xl p-4 border border-[#CDD4DD] min-w-0">
             <h4 className="text-xs font-bold text-[#6B7280] uppercase mb-4">Weekly Doubt Frequency Heatmap (Trigger for Sunday Quiz)</h4>
             <div className="h-24 min-h-[96px] w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ATTENDANCE_DATA}>
                    <defs>
                      <linearGradient id="colorDoubts" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#90C2E7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#90C2E7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="doubts" stroke="#22819A" fillOpacity={1} fill="url(#colorDoubts)" />
                    <XAxis dataKey="day" hide />
                    <Tooltip labelClassName="text-xs font-bold" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
             <div className="flex justify-between mt-2 text-[10px] font-bold text-[#6B7280] px-2">
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-custom min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#2C3E50] flex items-center gap-2">
                <Clock size={20} className="text-[#22819A]" /> Weekly Lecture Engagement
              </h2>
              <p className="text-xs text-[#6B7280]">Actual time spent in live sessions</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#90C2E7] rounded-sm"></div> Scheduled</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#22819A] rounded-sm"></div> Attended</div>
            </div>
          </div>
          <div className="h-[280px] min-h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ATTENDANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip cursor={{fill: '#FEF7F8'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="scheduled" name="Scheduled Minutes" fill="#90C2E7" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="attended" name="Attended Minutes" fill="#22819A" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-custom flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#2C3E50] mb-6">Weekly Time Analytics</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-[#6B7280] font-bold uppercase mb-1">Total Attended</p>
                  <p className="text-4xl font-bold text-[#22819A] tracking-tight">{totalAttended} <span className="text-sm font-normal text-[#6B7280]">mins</span></p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#6B7280] font-bold uppercase mb-1">Scheduled</p>
                  <p className="text-xl font-bold text-[#2C3E50]">{totalScheduled} <span className="text-xs font-normal">mins</span></p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#2C3E50]">
                  <span>Attendance Consistency</span>
                  <span>{attendancePercentage}%</span>
                </div>
                <div className="h-4 bg-[#FEF7F8] rounded-full overflow-hidden border border-[#CDD4DD]/30">
                  <div 
                    className="h-full bg-gradient-to-r from-[#90C2E7] to-[#22819A] transition-all duration-1000" 
                    style={{ width: `${attendancePercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#CDD4DD] mt-6">
            <h4 className="text-[10px] font-bold text-[#6B7280] uppercase mb-3">Gap Alert</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-orange-600 bg-orange-50 p-3 rounded-xl border border-orange-100">
                <AlertCircle size={14} className="shrink-0" />
                <span>Missed: 30 mins in Science (Tuesday). Recap video assigned.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-custom min-w-0">
          <h2 className="text-lg font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-[#22819A]" /> Mastery Index by Subject
          </h2>
          <div className="h-[300px] min-h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUBJECT_PERFORMANCE} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#2C3E50', fontSize: 11, fontWeight: 600}} width={100} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
                <Legend iconType="circle" />
                <Bar dataKey="score" name="Child mastery %" fill="#22819A" radius={[0, 4, 4, 0]} barSize={12} />
                <Bar dataKey="average" name="Batch average" fill="#90C2E7" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-custom min-w-0">
          <h2 className="text-lg font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#22819A]" /> Mastery Distribution
          </h2>
          <div className="h-[300px] min-h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Completed Topics', value: 68 },
                    { name: 'In Progress', value: 22 },
                    { name: 'Upcoming', value: 10 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#22819A" />
                  <Cell fill="#90C2E7" />
                  <Cell fill="#CDD4DD" />
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConceptFixItem = ({ label, status, color }: { label: string, status: string, color: string }) => (
  <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-[#CDD4DD] shadow-sm">
    <span className="text-xs font-bold text-[#2C3E50]">{label}</span>
    <div className="flex items-center gap-2">
       <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{status}</span>
       <div className={`w-2 h-2 rounded-full ${color}`} />
    </div>
  </div>
);

export default Monitoring;
