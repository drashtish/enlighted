
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Video, 
  FileText,
  AlertCircle,
  Settings,
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ClipboardList,
  Zap
} from 'lucide-react';

const Schedule: React.FC = () => {
  const [view, setView] = useState('Month');
  
  const events = [
    { time: '10:00 AM', title: 'Polynomials Practice Test', type: 'Assignment', color: 'orange' },
    { time: '04:00 PM', title: 'Math: Quadratic Equations', type: 'Live Class', color: 'teal' },
    { time: '06:30 PM', title: 'Science: Atomic Structures', type: 'Live Class', color: 'teal' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#22819A] flex items-center gap-2">
            <CalendarIcon size={24} /> My Schedule
          </h1>
          <p className="text-[#6B7280]">Stay on track with your upcoming activities</p>
        </div>
        <div className="flex bg-white border border-[#CDD4DD] p-1 rounded-xl shadow-sm overflow-x-auto no-scrollbar">
          {['Month', 'Week', 'Day', 'Preferences'].map(v => (
            <button 
              key={v}
              onClick={() => setView(v)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${view === v ? 'bg-[#22819A] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#FEF7F8]'}`}
            >
              {v === 'Preferences' ? <div className="flex items-center gap-2"><Settings size={16} /> {v}</div> : v}
            </button>
          ))}
        </div>
      </div>

      {view !== 'Preferences' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#CDD4DD] shadow-custom overflow-hidden">
            <div className="p-6 border-b border-[#CDD4DD] flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#2C3E50]">October 2026</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-[#CDD4DD] rounded-xl text-[#6B7280] hover:bg-[#FEF7F8]"><ChevronLeft size={20} /></button>
                <button className="p-2 border border-[#CDD4DD] rounded-xl text-[#6B7280] hover:bg-[#FEF7F8]"><ChevronRight size={20} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 border-b border-[#CDD4DD] bg-[#FEF7F8]/50">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-3 text-center text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNum = i - 3; // Adjust for start of month
                const isToday = dayNum === 27;
                return (
                  <div key={i} className={`h-24 p-2 border-b border-r border-[#CDD4DD] relative hover:bg-[#FEF7F8] transition-colors cursor-pointer group ${dayNum <= 0 || dayNum > 31 ? 'opacity-30' : ''}`}>
                    <span className={`text-xs font-bold ${isToday ? 'bg-[#22819A] text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-[#2C3E50]'}`}>
                      {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                    </span>
                    {dayNum === 27 && (
                      <div className="mt-1 space-y-1">
                        <div className="h-1 bg-[#22819A] rounded-full"></div>
                        <div className="h-1 bg-orange-400 rounded-full"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Tasks */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#CDD4DD] p-6 shadow-custom">
              <h3 className="font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                <Clock size={20} className="text-[#22819A]" /> Today's Timeline
              </h3>
              <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[#CDD4DD]">
                {events.map((e, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm shrink-0 z-10 ${e.color === 'teal' ? 'bg-[#22819A]' : 'bg-orange-400'}`}></div>
                    <div className="flex-1 -mt-1">
                      <p className="text-[10px] font-bold text-[#6B7280]">{e.time}</p>
                      <h4 className="font-bold text-[#2C3E50] text-sm">{e.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${e.color === 'teal' ? 'bg-[#FEF7F8] text-[#22819A] border border-[#90C2E7]/30' : 'bg-orange-50 text-orange-600 border border-orange-200'}`}>
                          {e.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <AlertCircle size={20} />
                <h4 className="font-bold text-sm">Action Needed</h4>
              </div>
              <p className="text-xs text-orange-800 mb-4">You have a pending assignment due tonight at 11:59 PM. Don't forget to submit!</p>
              <button className="w-full bg-orange-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors">Start Assignment</button>
            </div>

            <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#2C3E50] mb-4">Sync Calendar</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD] hover:border-[#22819A] transition-all group">
                  <span className="text-xs font-bold text-[#2C3E50] flex items-center gap-2">
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google Calendar
                  </span>
                  <ExternalLink size={14} className="text-[#6B7280] group-hover:text-[#22819A]" />
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-[#FEF7F8] rounded-xl border border-[#CDD4DD] hover:border-[#22819A] transition-all group">
                  <span className="text-xs font-bold text-[#2C3E50] flex items-center gap-2">
                    <img src="https://www.apple.com/favicon.ico" className="w-4 h-4" alt="Apple" /> Apple Calendar
                  </span>
                  <ExternalLink size={14} className="text-[#6B7280] group-hover:text-[#22819A]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Global Timing Preferences */}
            <div className="bg-white rounded-3xl border border-[#CDD4DD] p-8 shadow-custom space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#FEF7F8] rounded-2xl text-[#22819A]">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#2C3E50]">Smart Reminders</h3>
                  <p className="text-xs text-[#6B7280]">Set when you want to be notified</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-4">Default Timing</p>
                  <div className="grid grid-cols-2 gap-3">
                    <TimingButton label="At Event Time" active />
                    <TimingButton label="15 Mins Before" active />
                    <TimingButton label="1 Hour Before" />
                    <TimingButton label="1 Day Before" active />
                  </div>
                </div>

                <hr className="border-[#FEF7F8]" />

                <div>
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-4">Notification Channels</p>
                  <div className="space-y-3">
                    <ChannelToggle icon={<Bell size={18} />} label="In-App Notifications" active />
                    <ChannelToggle icon={<Mail size={18} />} label="Email Alerts" active />
                    <ChannelToggle icon={<Smartphone size={18} />} label="Push Notifications" />
                    <ChannelToggle icon={<MessageSquare size={18} />} label="SMS Updates" />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Specific Overrides */}
            <div className="space-y-6">
              <CategorySettingsCard 
                icon={<Video size={20} />} 
                title="Live Classes" 
                color="teal"
                description="Lectures, Batch Meetings, Mentorships"
              />
              <CategorySettingsCard 
                icon={<ClipboardList size={20} />} 
                title="Assignments" 
                color="orange"
                description="Homework, Projects, PDF Uploads"
              />
              <CategorySettingsCard 
                icon={<Zap size={20} />} 
                title="Tests & Quizzes" 
                color="purple"
                description="Mid-term, Weekly AI Quizzes, Chapter Tests"
              />
              
              <div className="bg-[#22819A] rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
                <div>
                  <h4 className="font-bold flex items-center gap-2">
                    <ShieldCheck size={18} /> Sync Confirmed
                  </h4>
                  <p className="text-[10px] text-white/80">Your preferences are automatically synced across devices.</p>
                </div>
                <button className="bg-white/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/30">
                  Restore Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const TimingButton: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => (
  <button className={`
    p-4 rounded-2xl border-2 text-center text-xs font-bold transition-all
    ${active 
      ? 'border-[#22819A] bg-[#FEF7F8] text-[#22819A] shadow-sm' 
      : 'border-[#CDD4DD] text-[#6B7280] hover:border-[#90C2E7]'}
  `}>
    {label}
  </button>
);

const ChannelToggle: React.FC<{ icon: any, label: string, active?: boolean }> = ({ icon, label, active }) => (
  <div className="flex items-center justify-between p-4 bg-[#FEF7F8] rounded-2xl border border-transparent hover:border-[#CDD4DD] transition-all">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${active ? 'text-[#22819A]' : 'text-[#6B7280]'}`}>
        {icon}
      </div>
      <span className="text-sm font-bold text-[#2C3E50]">{label}</span>
    </div>
    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-[#22819A]' : 'bg-[#CDD4DD]'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </div>
);

const CategorySettingsCard: React.FC<{ icon: any, title: string, description: string, color: string }> = ({ icon, title, description, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colorMap: any = {
    teal: 'bg-[#22819A]',
    orange: 'bg-orange-500',
    purple: 'bg-purple-600'
  };

  return (
    <div className="bg-white rounded-3xl border border-[#CDD4DD] overflow-hidden shadow-sm transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-[#FEF7F8] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl text-white ${colorMap[color]}`}>
            {icon}
          </div>
          <div className="text-left">
            <h4 className="font-bold text-[#2C3E50]">{title}</h4>
            <p className="text-[10px] text-[#6B7280]">{description}</p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-[#CDD4DD] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 pt-2 space-y-4 animate-in fade-in duration-300">
          <div className="p-4 bg-[#FEF7F8] rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#6B7280]">Enable Alerts</span>
              <div className="w-10 h-5 bg-[#22819A] rounded-full relative">
                <div className="absolute top-0.5 left-5.5 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['15m', '1h', '24h'].map(t => (
                <span key={t} className="px-3 py-1 bg-white border border-[#CDD4DD] rounded-full text-[10px] font-bold text-[#22819A]">
                  {t} before
                </span>
              ))}
              <button className="px-3 py-1 bg-[#22819A]/10 text-[#22819A] rounded-full text-[10px] font-bold">
                + Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronDown = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default Schedule;
