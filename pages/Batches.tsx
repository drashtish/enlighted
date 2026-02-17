
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Clock, Trophy, MoreVertical, Bell, Search, Filter } from 'lucide-react';
import { Batch } from '../types';

const BATCHES_DATA: Batch[] = [
  {
    id: '1',
    code: 'A1',
    name: 'Mathematics Mastery',
    subject: 'Mathematics',
    board: 'CBSE',
    grade: 'Class 9',
    teacher: {
      name: 'Mr. Rajesh Kumar',
      avatar: 'https://i.pravatar.cc/150?u=rajesh',
      experience: '12 years'
    },
    schedule: ['Mon', 'Wed', 'Fri'],
    time: '4:00 PM - 5:30 PM',
    attendance: 95,
    rank: '12/38',
    nextClass: 'Tomorrow, 4:00 PM',
    syllabus: [
      { chapter: 'Number Systems', status: 'Completed' },
      { chapter: 'Polynomials', status: 'Completed' },
      { chapter: 'Coordinate Geometry', status: 'In Progress' }
    ]
  },
  {
    id: '2',
    code: 'S2',
    name: 'Advanced Science',
    subject: 'Science',
    board: 'CBSE',
    grade: 'Class 9',
    teacher: {
      name: 'Dr. S. Mehra',
      avatar: 'https://i.pravatar.cc/150?u=mehra',
      experience: '15 years'
    },
    schedule: ['Tue', 'Thu', 'Sat'],
    time: '6:00 PM - 7:30 PM',
    attendance: 88,
    rank: '5/42',
    nextClass: 'Today, 6:00 PM',
    syllabus: [
      { chapter: 'Chemical Reactions', status: 'Completed' },
      { chapter: 'Acids, Bases and Salts', status: 'In Progress' },
      { chapter: 'Metals and Non-metals', status: 'Upcoming' }
    ]
  }
];

const Batches: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBatches = BATCHES_DATA.filter(batch => 
    batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    batch.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#22819A] dark:text-[#90C2E7]">Batch Management</h1>
          <p className="text-[#6B7280] dark:text-slate-400">Manage your enrolled classes and track student progress</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 md:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-slate-500" />
            <input 
              type="text" 
              placeholder="Search batches..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#22819A] dark:text-slate-200"
            />
          </div>
          <button className="p-2 bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-xl text-[#6B7280] dark:text-slate-400 hover:text-[#22819A]">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBatches.map((batch) => (
          <div key={batch.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-[#CDD4DD] dark:border-slate-700 shadow-custom hover:shadow-lg transition-all p-6 group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FEF7F8] dark:bg-slate-900 rounded-2xl flex items-center justify-center text-[#22819A] dark:text-[#90C2E7] font-bold text-2xl border border-[#90C2E7]/30">
                  {batch.code}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-[#90C2E7]/20 dark:bg-[#90C2E7]/10 text-[#22819A] dark:text-[#90C2E7] px-2 py-0.5 rounded uppercase">
                      {batch.subject}
                    </span>
                    <span className="text-[10px] font-bold bg-[#FEF7F8] dark:bg-slate-900 text-[#6B7280] dark:text-slate-500 px-2 py-0.5 rounded uppercase border border-[#CDD4DD] dark:border-slate-700">
                      {batch.board}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3E50] dark:text-slate-100">{batch.name}</h3>
                </div>
              </div>
              <button className="text-[#6B7280] dark:text-slate-400 hover:text-[#22819A] p-1 rounded-lg hover:bg-[#FEF7F8] dark:hover:bg-slate-700">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <img src={batch.teacher.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
                <div>
                  <p className="text-xs font-bold text-[#2C3E50] dark:text-slate-100">{batch.teacher.name}</p>
                  <p className="text-[10px] text-[#6B7280] dark:text-slate-500">{batch.teacher.experience} Exp.</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#6B7280] dark:text-slate-500">
                  <span>ATTENDANCE</span>
                  <span>{batch.attendance}%</span>
                </div>
                <div className="h-1.5 bg-[#FEF7F8] dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#22819A] dark:bg-[#90C2E7]" style={{ width: `${batch.attendance}%` }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#FEF7F8] dark:bg-slate-900 rounded-xl mb-6">
              <div className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400">
                <Clock size={16} />
                <div className="text-xs">
                  <p className="font-bold text-[#2C3E50] dark:text-slate-200">{batch.schedule.join(', ')}</p>
                  <p>{batch.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400">
                <Trophy size={16} className="text-yellow-500" />
                <div className="text-xs">
                  <p className="font-bold text-[#2C3E50] dark:text-slate-200">{batch.rank}</p>
                  <p>Batch Rank</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate(`/batches/${batch.id}`)}
                className="flex-1 bg-[#22819A] dark:bg-[#22819A] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-opacity"
              >
                View Batch Details
              </button>
              <button className="p-3 text-[#22819A] dark:text-[#90C2E7] bg-[#90C2E7]/20 dark:bg-slate-700 rounded-xl hover:bg-[#90C2E7]/30 transition-all">
                <Bell size={20} />
              </button>
            </div>
          </div>
        ))}

        {filteredBatches.length === 0 && (
          <div className="lg:col-span-2 text-center py-20 bg-white dark:bg-slate-800 border-2 border-dashed border-[#CDD4DD] dark:border-slate-700 rounded-3xl">
            <Search size={40} className="mx-auto text-[#CDD4DD] dark:text-slate-700 mb-4" />
            <h3 className="font-bold text-[#2C3E50] dark:text-slate-200">No batches found matching "{searchQuery}"</h3>
            <p className="text-sm text-[#6B7280] dark:text-slate-500">Try a different search term or subject name.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batches;
