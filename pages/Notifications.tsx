
import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Brain, 
  BookOpen, 
  Zap, 
  Trophy, 
  MessageSquare,
  Search,
  Filter,
  ChevronRight,
  Trash2,
  MoreVertical
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'assignment' | 'doubt' | 'class' | 'grade' | 'rank' | 'badge' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isUnread: boolean;
  link?: string;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'class',
    title: 'Class Starting Soon',
    description: 'Your Mathematics: Quadratic Equations session starts in 15 minutes. Get your notes ready!',
    timestamp: '10:45 AM',
    isUnread: true,
    link: '/batches/1'
  },
  {
    id: 'n2',
    type: 'doubt',
    title: 'Doubt Resolved',
    description: 'Mr. Rajesh Kumar has provided a video solution for your doubt on "Factorization of Polynomials".',
    timestamp: '09:20 AM',
    isUnread: true,
    link: '/doubts'
  },
  {
    id: 'n3',
    type: 'grade',
    title: 'Assignment Graded',
    description: 'Your submission for "Atoms & Molecules: Practice Set 1" has been graded. You scored 25/30.',
    timestamp: 'Yesterday',
    isUnread: false,
    link: '/assignments'
  },
  {
    id: 'n4',
    type: 'rank',
    title: 'Rank Improved!',
    description: 'Great job! You moved up 3 ranks in Mathematics this week. You are now at rank 12/38.',
    timestamp: 'Yesterday',
    isUnread: false,
    link: '/performance'
  },
  {
    id: 'n5',
    type: 'badge',
    title: 'New Badge Earned',
    description: 'Congratulations! You earned the "Doubt Solver Bronze" badge for answering 10 peer doubts.',
    timestamp: '2 days ago',
    isUnread: false,
    link: '/profile'
  },
  {
    id: 'n6',
    type: 'assignment',
    title: 'Assignment Deadline Reminder',
    description: 'The "Number Systems Final Quiz" is due tonight at 11:59 PM. You haven\'t started yet.',
    timestamp: '2 days ago',
    isUnread: false,
    link: '/assignments'
  }
];

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filtered = notifications.filter(n => filter === 'All' || n.type === filter.toLowerCase());

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment': return <BookOpen className="text-orange-500" size={20} />;
      case 'doubt': return <Brain className="text-[#22819A]" size={20} />;
      case 'class': return <Zap className="text-yellow-500" size={20} />;
      case 'grade': return <CheckCircle2 className="text-green-500" size={20} />;
      case 'rank': return <Trophy className="text-[#22819A]" size={20} />;
      case 'badge': return <Trophy className="text-purple-500" size={20} />;
      default: return <Bell className="text-[#6B7280]" size={20} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#22819A] flex items-center gap-2">
            <Bell size={24} /> Notifications
          </h1>
          <p className="text-[#6B7280]">Stay updated with your academic journey</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={markAllRead}
            className="px-4 py-2 bg-white border border-[#CDD4DD] rounded-xl text-xs font-bold text-[#22819A] hover:bg-[#FEF7F8] transition-colors"
          >
            Mark all as read
          </button>
          <button className="p-2 bg-white border border-[#CDD4DD] rounded-xl text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-3 p-2 bg-white border border-[#CDD4DD] rounded-2xl overflow-x-auto no-scrollbar">
        {['All', 'Class', 'Doubt', 'Grade', 'Assignment', 'Rank'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`
              px-6 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all
              ${filter === tab 
                ? 'bg-[#22819A] text-white shadow-md' 
                : 'text-[#6B7280] hover:bg-[#FEF7F8] hover:text-[#22819A]'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((n) => (
            <div 
              key={n.id}
              className={`
                group bg-white rounded-2xl border transition-all p-5 flex gap-4 relative overflow-hidden
                ${n.isUnread ? 'border-[#22819A] shadow-md' : 'border-[#CDD4DD] shadow-sm hover:border-[#90C2E7]'}
              `}
            >
              {n.isUnread && (
                <div className="absolute top-0 left-0 w-1 h-full bg-[#22819A]" />
              )}
              
              <div className={`
                w-12 h-12 rounded-xl shrink-0 flex items-center justify-center
                ${n.isUnread ? 'bg-[#FEF7F8]' : 'bg-gray-50'}
              `}>
                {getIcon(n.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-bold ${n.isUnread ? 'text-[#2C3E50]' : 'text-[#6B7280]'}`}>
                    {n.title}
                  </h3>
                  <span className="text-[10px] font-bold text-[#6B7280] flex items-center gap-1">
                    <Clock size={10} /> {n.timestamp}
                  </span>
                </div>
                <p className="text-sm text-[#2C3E50] leading-relaxed">
                  {n.description}
                </p>
                
                <div className="pt-2 flex items-center gap-4">
                  {n.link && (
                    <button className="text-xs font-bold text-[#22819A] hover:underline flex items-center gap-1">
                      View Details <ChevronRight size={14} />
                    </button>
                  )}
                  {!n.isUnread && (
                    <span className="text-[10px] font-bold text-[#6B7280] flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-green-500" /> Read
                    </span>
                  )}
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-[#6B7280] hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-[#CDD4DD] rounded-3xl">
            <div className="w-16 h-16 bg-[#FEF7F8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#CDD4DD]">
              <Bell size={32} />
            </div>
            <h3 className="font-bold text-[#2C3E50]">All caught up!</h3>
            <p className="text-sm text-[#6B7280]">No notifications found for this category.</p>
          </div>
        )}
      </div>

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

export default Notifications;
