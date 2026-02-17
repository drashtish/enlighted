
import React, { useState } from 'react';
import { FileText, Play, Download, Search, Book, ChevronRight, Bookmark } from 'lucide-react';
import { RevisionNote } from '../types';

const NOTES: RevisionNote[] = [
  { id: '1', title: 'Quadratic Equations Summary', subject: 'Mathematics', chapter: 'Chapter 4', type: 'PDF', size: '2.4 MB' },
  { id: '2', title: 'Atomic Structure Visualized', subject: 'Science', chapter: 'Chapter 2', type: 'Video', duration: '12:45' },
  { id: '3', title: 'Valence & Chemical Reactivity', subject: 'Science', chapter: 'Chapter 2', type: 'MindMap', size: '1.8 MB' },
  { id: '4', title: 'English Grammar Master Guide', subject: 'English', chapter: 'Unit 1', type: 'Worksheet', size: '3.1 MB' }
];

const RevisionNotes: React.FC = () => {
  const [activeSubject, setActiveSubject] = useState('Science');

  return (
    <div className="flex flex-col md:flex-row gap-8 animate-in fade-in duration-500">
      {/* Subject Navigation */}
      <aside className="md:w-64 space-y-6">
        <div className="bg-white border border-[#CDD4DD] rounded-2xl p-4 shadow-custom">
          <h3 className="font-bold text-[#22819A] mb-4 px-2">Subjects</h3>
          <nav className="space-y-1">
            {['Mathematics', 'Science', 'English', 'History', 'Geography'].map((subj) => (
              <button
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${subj === activeSubject ? 'bg-[#22819A] text-white shadow-md' : 'text-[#6B7280] hover:bg-[#FEF7F8]'}`}
              >
                <div className="flex items-center gap-3">
                  <Book size={18} />
                  {subj}
                </div>
                <ChevronRight size={14} />
              </button>
            ))}
          </nav>
        </div>
        
        <div className="bg-gradient-to-br from-[#90C2E7] to-[#22819A] rounded-2xl p-6 text-white">
          <Bookmark className="mb-2" />
          <h4 className="font-bold text-sm">Bookmarks</h4>
          <p className="text-[10px] text-white/80 mb-4">Quickly access your saved notes</p>
          <button className="w-full py-2 bg-white/20 rounded-lg text-xs font-bold hover:bg-white/30">View All</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input 
              type="text" 
              placeholder={`Search ${activeSubject} notes...`}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#CDD4DD] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#22819A]"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'PDF', 'Video', 'Worksheet'].map((type) => (
              <button key={type} className="px-4 py-2 bg-white border border-[#CDD4DD] rounded-xl text-xs font-bold text-[#6B7280] hover:border-[#22819A] transition-colors">
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {NOTES.filter(n => n.subject === activeSubject || activeSubject === 'All').map((note) => (
            <div key={note.id} className="bg-white border border-[#CDD4DD] rounded-2xl p-5 shadow-custom group hover:border-[#22819A] transition-all flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${note.type === 'Video' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                  {note.type === 'Video' ? <Play size={20} /> : <FileText size={20} />}
                </div>
                <button className="text-[#CDD4DD] hover:text-[#22819A]">
                  <Bookmark size={20} />
                </button>
              </div>
              <h4 className="font-bold text-[#2C3E50] mb-1 group-hover:text-[#22819A] transition-colors">{note.title}</h4>
              <p className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wider mb-6">{note.chapter}</p>
              
              <div className="mt-auto pt-4 border-t border-[#FEF7F8] flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#6B7280]">
                  {note.type === 'Video' ? note.duration : note.size}
                </span>
                <button className="flex items-center gap-1 text-[#22819A] text-xs font-bold hover:underline">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Other Subjects */}
        {NOTES.filter(n => n.subject === activeSubject).length === 0 && (
          <div className="text-center py-20 bg-white border border-dashed border-[#CDD4DD] rounded-3xl">
            <div className="w-16 h-16 bg-[#FEF7F8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#CDD4DD]">
              <FileText size={32} />
            </div>
            <h3 className="font-bold text-[#2C3E50]">No notes available yet</h3>
            <p className="text-sm text-[#6B7280]">We're adding new materials for {activeSubject} soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevisionNotes;
