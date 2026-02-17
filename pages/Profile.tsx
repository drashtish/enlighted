
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  School, 
  BookOpen, 
  Award, 
  Flame, 
  Bell, 
  Shield, 
  Monitor, 
  LogOut, 
  Camera, 
  CheckCircle2, 
  Settings,
  ChevronRight,
  Plus,
  Clock,
  MessageSquare,
  HelpCircle,
  FileText
} from 'lucide-react';
import { UserRole } from '../types';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'achievements' | 'settings'>('info');

  const badges = [
    { name: '10 Doubts Solved', icon: <MessageSquare size={20} />, color: 'bg-blue-100 text-blue-600', earned: true },
    { name: '7 Day Streak', icon: <Flame size={20} />, color: 'bg-orange-100 text-orange-600', earned: true },
    { name: 'Top Performer', icon: <Award size={20} />, color: 'bg-yellow-100 text-yellow-600', earned: true },
    { name: 'Assignment Master', icon: <FileText size={20} />, color: 'bg-green-100 text-green-600', earned: true },
    { name: 'Quick Learner', icon: <ZapIcon size={20} />, color: 'bg-purple-100 text-purple-600', earned: false },
    { name: 'Peer Mentor', icon: <User size={20} />, color: 'bg-pink-100 text-pink-600', earned: false },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-[#CDD4DD] shadow-custom overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#22819A] to-[#90C2E7]"></div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row md:items-end gap-6 -mt-12">
            <div className="relative group">
              <img 
                src="https://picsum.photos/150/150" 
                alt="Profile" 
                className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg object-cover"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-[#22819A] text-white rounded-xl shadow-md hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-1">
              <h1 className="text-3xl font-bold text-[#2C3E50]">Rahul Kumar</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1 font-semibold text-[#22819A]"><School size={16} /> Class 9 • CBSE</span>
                <span className="hidden md:block">•</span>
                <span>ABC Public School, New Delhi</span>
              </div>
            </div>
            <button className="bg-white border-2 border-[#22819A] text-[#22819A] px-6 py-2.5 rounded-xl font-bold hover:bg-[#FEF7F8] transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Stats & Navigation */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-custom space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <Flame size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase">Current Streak</p>
                  <p className="text-lg font-bold text-[#2C3E50]">7 Days</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase">Total Badges</p>
                  <p className="text-lg font-bold text-[#2C3E50]">12 Earned</p>
                </div>
              </div>
            </div>

            <hr className="border-[#CDD4DD]" />

            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('info')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'info' ? 'bg-[#22819A] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#FEF7F8]'}`}
              >
                <User size={18} /> Personal & Academic
              </button>
              <button 
                onClick={() => setActiveTab('achievements')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'achievements' ? 'bg-[#22819A] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#FEF7F8]'}`}
              >
                <Award size={18} /> Achievements
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'settings' ? 'bg-[#22819A] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#FEF7F8]'}`}
              >
                <Settings size={18} /> Preferences
              </button>
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all">
              <LogOut size={18} /> Sign Out
            </button>
          </div>

          <div className="bg-[#FEF7F8] rounded-2xl border border-[#CDD4DD] p-6 space-y-4">
            <h4 className="font-bold text-sm text-[#22819A] flex items-center gap-2">
              <HelpCircle size={16} /> Support & Help
            </h4>
            <div className="space-y-3">
              <button className="w-full text-left text-xs font-semibold text-[#6B7280] hover:text-[#22819A] transition-colors">Frequently Asked Questions</button>
              <button className="w-full text-left text-xs font-semibold text-[#6B7280] hover:text-[#22819A] transition-colors">Video User Guide</button>
              <button className="w-full text-left text-xs font-semibold text-[#6B7280] hover:text-[#22819A] transition-colors">Contact Support Team</button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'info' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="bg-white rounded-2xl border border-[#CDD4DD] p-8 shadow-custom">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                  <User size={22} className="text-[#22819A]" /> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoItem icon={<User size={18} />} label="Full Name" value="Rahul Kumar" />
                  <InfoItem icon={<Calendar size={18} />} label="Date of Birth" value="12 May 2011" />
                  <InfoItem icon={<Mail size={18} />} label="Email Address" value="rahul.k@example.com" />
                  <InfoItem icon={<Phone size={18} />} label="Phone Number" value="+91 98765 43210" />
                  <InfoItem icon={<MapPin size={18} />} label="Residential Address" value="45, Green Park Extension, New Delhi" />
                  <div className="p-4 bg-[#FEF7F8] rounded-2xl border border-dashed border-[#CDD4DD]">
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-1">Parent Information</p>
                    <p className="text-sm font-bold text-[#2C3E50]">Mr. Suresh Kumar (Father)</p>
                    <p className="text-xs text-[#6B7280]">+91 99887 76655 • suresh.k@work.com</p>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-[#CDD4DD] p-8 shadow-custom">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#2C3E50] flex items-center gap-2">
                    <BookOpen size={22} className="text-[#22819A]" /> Academic Details
                  </h3>
                  <button className="text-xs font-bold text-[#22819A] hover:underline flex items-center gap-1">
                    Update Details <Plus size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoItem icon={<School size={18} />} label="Current School" value="ABC Public School, New Delhi" />
                  <InfoItem icon={<FileText size={18} />} label="Education Board" value="CBSE (Central Board of Secondary Education)" />
                  <div className="md:col-span-2">
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-3">Enrolled Batches</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <BatchBadge code="A1" name="Mathematics Mastery" />
                      <BatchBadge code="S2" name="Advanced Science" />
                      <BatchBadge code="E1" name="English Grammar Pro" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-[#CDD4DD] p-8 shadow-custom">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                  <TrendingUpIcon size={22} className="text-[#22819A]" /> Activity Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ActivityStat label="Login Days" value="145" subtext="Total days active" />
                  <ActivityStat label="Study Hours" value="250" subtext="In-app learning" />
                  <ActivityStat label="Assignments" value="88" subtext="Completed" />
                  <ActivityStat label="Doubts" value="67" subtext="Questions asked" />
                </div>
              </section>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="bg-white rounded-2xl border border-[#CDD4DD] p-8 shadow-custom">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50]">Badge Wall</h3>
                    <p className="text-xs text-[#6B7280]">Showcase your academic milestones</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#22819A]">12 / 50</p>
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase">Badges Collected</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {badges.map((badge, idx) => (
                    <div 
                      key={idx} 
                      className={`
                        flex flex-col items-center p-6 rounded-2xl border transition-all hover:scale-105 group cursor-pointer
                        ${badge.earned ? 'bg-white border-[#CDD4DD] shadow-sm' : 'bg-[#FEF7F8] border-transparent opacity-50 grayscale'}
                      `}
                    >
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-4 shadow-inner ${badge.color}`}>
                        {badge.icon}
                      </div>
                      <p className="text-xs font-bold text-[#2C3E50] text-center mb-1">{badge.name}</p>
                      {badge.earned ? (
                        <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                          <CheckCircle2 size={10} /> Earned
                        </p>
                      ) : (
                        <p className="text-[10px] text-[#6B7280] font-bold">Locked</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-[#22819A] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <TrophyIcon size={180} className="absolute -right-8 -bottom-8 opacity-10" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="p-6 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                    <TrophyIcon size={48} className="text-yellow-400" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Weekly Top Performer</h3>
                    <p className="text-white/80 leading-relaxed max-w-lg mb-6">
                      You've maintained your position in the **top 10%** of Class 9 Mathematics for 3 consecutive weeks! Keep it up to earn the "Consistent Genius" badge.
                    </p>
                    <button className="bg-white text-[#22819A] px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-white/90 transition-all">
                      View Ranking History
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="bg-white rounded-2xl border border-[#CDD4DD] p-8 shadow-custom">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                  <Bell size={22} className="text-[#22819A]" /> Notification Preferences
                </h3>
                <div className="space-y-4">
                  <ToggleItem label="Assignment Deadlines" subtext="Get reminded 24 hours before an assignment is due." active />
                  <ToggleItem label="Live Class Reminders" subtext="Notify 15 minutes before any scheduled class starts." active />
                  <ToggleItem label="Doubt Resolutions" subtext="Receive immediate notification when your doubt is solved." active />
                  <ToggleItem label="Weekly Performance Digest" subtext="Receive a summary report every Monday morning." />
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-[#CDD4DD] p-8 shadow-custom">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                  <Shield size={22} className="text-[#22819A]" /> Privacy & Security
                </h3>
                <div className="space-y-4">
                  <ToggleItem label="Profile Visibility" subtext="Allow peers to see your profile and badges." active />
                  <ToggleItem label="Leaderboard Standing" subtext="Show my name on the batch leaderboard." active />
                  <div className="pt-4 flex items-center justify-between border-t border-[#FEF7F8]">
                    <div>
                      <p className="text-sm font-bold text-[#2C3E50]">Change Password</p>
                      <p className="text-xs text-[#6B7280]">Last changed 3 months ago</p>
                    </div>
                    <button className="text-sm font-bold text-[#22819A] hover:underline">Update</button>
                  </div>
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-[#CDD4DD] p-8 shadow-custom">
                <h3 className="text-xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
                  <Monitor size={22} className="text-[#22819A]" /> App Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase block mb-2">Platform Theme</label>
                    <div className="flex gap-4">
                      <ThemeOption label="Light" active />
                      <ThemeOption label="Dark" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase block mb-2">Language</label>
                    <select className="w-full bg-[#FEF7F8] border border-[#CDD4DD] rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#22819A]">
                      <option>English (UK)</option>
                      <option>Hindi</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ icon: any, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 bg-[#FEF7F8] text-[#22819A] rounded-xl flex items-center justify-center shrink-0 border border-[#CDD4DD]/30">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-bold text-[#2C3E50]">{value}</p>
    </div>
  </div>
);

const BatchBadge: React.FC<{ code: string, name: string }> = ({ code, name }) => (
  <div className="flex items-center gap-3 p-3 bg-white border border-[#CDD4DD] rounded-xl shadow-sm hover:border-[#22819A] transition-colors cursor-pointer group">
    <div className="w-10 h-10 bg-[#FEF7F8] text-[#22819A] rounded-lg flex items-center justify-center font-bold text-sm border border-[#90C2E7]/20 group-hover:bg-[#22819A] group-hover:text-white transition-colors">
      {code}
    </div>
    <span className="text-xs font-bold text-[#2C3E50]">{name}</span>
  </div>
);

const ActivityStat: React.FC<{ label: string, value: string, subtext: string }> = ({ label, value, subtext }) => (
  <div className="p-4 bg-white border border-[#CDD4DD] rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-1">{label}</p>
    <p className="text-2xl font-bold text-[#22819A]">{value}</p>
    <p className="text-[10px] text-[#6B7280] mt-1">{subtext}</p>
  </div>
);

const ToggleItem: React.FC<{ label: string, subtext: string, active?: boolean }> = ({ label, subtext, active }) => (
  <div className="flex items-center justify-between gap-4 p-4 rounded-2xl hover:bg-[#FEF7F8] transition-colors group">
    <div className="flex-1">
      <p className="text-sm font-bold text-[#2C3E50]">{label}</p>
      <p className="text-xs text-[#6B7280]">{subtext}</p>
    </div>
    <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${active ? 'bg-[#22819A]' : 'bg-[#CDD4DD]'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </div>
);

const ThemeOption: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => (
  <button className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm border-2 transition-all ${active ? 'border-[#22819A] bg-[#FEF7F8] text-[#22819A]' : 'border-[#CDD4DD] text-[#6B7280] hover:border-[#90C2E7]'}`}>
    {label}
  </button>
);

const ZapIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const TrendingUpIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrophyIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default Profile;
