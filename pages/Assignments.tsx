
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Filter, 
  CheckCircle2,
  FileText,
  Plus,
  Target,
  Users,
  Eye,
  Trash2,
  X,
  Sparkles
} from 'lucide-react';
import { Assignment, UserRole } from '../types';

interface AssignmentsProps {
  userRole?: UserRole;
}

const ASSIGNMENTS: Assignment[] = [
  {
    id: 'math-poly-01',
    title: 'Chapter 5: Polynomials - Advanced Application',
    subject: 'Mathematics',
    chapter: 'Polynomials',
    dueDate: 'Oct 28, 2026',
    status: 'Pending',
    totalMarks: 50,
    questions: []
  },
  {
    id: 'sci-atom-02',
    title: 'Atomic Structure: Final Practice Set',
    subject: 'Science',
    chapter: 'Structure of Atom',
    dueDate: 'Oct 30, 2026',
    status: 'In Progress',
    totalMarks: 30,
    questions: []
  },
];

const Assignments: React.FC<AssignmentsProps> = ({ userRole = UserRole.STUDENT }) => {
  const [filter, setFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const isTeacher = userRole === UserRole.TEACHER;

  const filtered = ASSIGNMENTS.filter(a => filter === 'All' || a.status === filter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className={`text-3xl font-black tracking-tight ${isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'}`}>
            {isTeacher ? 'Grading Central' : 'Academic Coursework'}
          </h1>
          <p className="text-[#6B7280] font-medium">
            {isTeacher ? 'Review student submissions and manage curriculum assessments.' : 'Access your active assignments, homework, and weekly projects.'}
          </p>
        </div>
        
        <div className="flex gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-[#CDD4DD] dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
          {isTeacher ? (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-2.5 rounded-xl font-bold shadow-md hover:bg-[#0d9468] transition-all"
            >
              <Plus size={18} /> New Assignment
            </button>
          ) : (
            ['All', 'Pending', 'In Progress', 'Graded'].map((s) => (
              <button 
                key={s} 
                onClick={() => setFilter(s)}
                className={`
                  px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                  ${filter === s ? 'bg-[#22819A] text-white shadow-lg' : 'text-[#6B7280] dark:text-slate-400 hover:bg-[#FEF7F8] dark:hover:bg-slate-800'}
                `}
              >
                {s}
              </button>
            ))
          )}
        </div>
      </div>

      {isTeacher ? (
        /* Teacher Dashboard View */
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-[#CDD4DD] dark:border-slate-800 shadow-custom overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-[#FEF7F8] dark:bg-slate-800/50 text-[10px] font-bold text-[#6B7280] uppercase tracking-widest border-b border-[#CDD4DD] dark:border-slate-800">
                <tr>
                   <th className="px-8 py-5">Assignment & Batch</th>
                   <th className="px-8 py-5">Progress</th>
                   <th className="px-8 py-5">Deadline</th>
                   <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CDD4DD] dark:divide-slate-800">
                 {[
                   { id: 1, title: 'Polynomials Mastery', batch: 'Grade 9-A', submissions: 28, total: 38, deadline: 'Oct 28' },
                   { id: 2, title: 'Atoms & Molecules', batch: 'Grade 9-B', submissions: 35, total: 35, deadline: 'Oct 24' },
                 ].map(ass => (
                   <tr key={ass.id} className="hover:bg-[#FEF7F8] dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-8 py-6">
                         <p className="font-bold text-slate-800 dark:text-slate-100 text-sm group-hover:text-[#10B981] transition-colors">{ass.title}</p>
                         <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-widest mt-0.5">{ass.batch}</p>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <div className="flex-1 min-w-[100px] h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                               <div className={`h-full ${ass.submissions === ass.total ? 'bg-[#10B981]' : 'bg-orange-500'}`} style={{ width: `${(ass.submissions/ass.total)*100}%` }} />
                            </div>
                            <span className={`text-[11px] font-black ${ass.submissions === ass.total ? 'text-[#10B981]' : 'text-orange-500'}`}>
                               {ass.submissions}/{ass.total}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-xs text-[#6B7280] font-bold">{ass.deadline}</td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end gap-3">
                            <button className="p-2.5 text-[#10B981] hover:bg-green-50 dark:hover:bg-green-950/20 rounded-xl" title="Grade Now"><ClipboardCheck size={20} /></button>
                            <button className="p-2.5 text-slate-400 hover:text-[#10B981]" title="View Details"><Eye size={20} /></button>
                            <button className="p-2.5 text-slate-400 hover:text-red-500"><Trash2 size={20} /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      ) : (
        /* Student Card View */
        <div className="grid grid-cols-1 gap-6">
          {filtered.map((assignment) => (
            <div key={assignment.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-[#CDD4DD] dark:border-slate-800 shadow-custom p-8 group hover:border-[#90C2E7] dark:hover:border-[#22819A] transition-all relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex items-center gap-6 flex-1">
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner
                    ${assignment.status === 'Graded' ? 'bg-green-100 dark:bg-green-950 text-green-600' : 'bg-[#FEF7F8] dark:bg-slate-800 text-primary'}
                  `}>
                    {assignment.status === 'Graded' ? <CheckCircle2 size={32} /> : <FileText size={32} />}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold bg-[#FEF7F8] dark:bg-slate-800 text-primary border border-primary/20 px-3 py-1 rounded-lg uppercase tracking-wider">
                        {assignment.subject}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{assignment.chapter}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{assignment.title}</h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 lg:gap-12 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <Clock size={16} className="text-primary" />
                      {assignment.dueDate}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Performance</p>
                    <div className={`text-sm font-black ${assignment.status === 'Graded' ? 'text-green-500' : 'text-primary'}`}>
                      {assignment.status === 'Graded' ? `SCORE: ${assignment.score}/50` : assignment.status.toUpperCase()}
                    </div>
                  </div>

                  <Link 
                    to={`/assignment-taking/${assignment.id}`}
                    className={`
                      w-full lg:w-auto px-10 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95
                      ${assignment.status === 'Graded' 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200' 
                        : 'bg-primary text-white hover:opacity-90'}
                    `}
                  >
                    {assignment.status === 'Graded' ? 'Review Work' : (assignment.status === 'In Progress' ? 'Continue Task' : 'Begin Now')}
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Decorative Sparkles for New/Important tasks */}
              {assignment.status === 'Pending' && (
                <div className="absolute top-4 right-4 text-primary animate-pulse">
                  <Sparkles size={16} />
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-24 bg-white dark:bg-slate-900 border-2 border-dashed border-[#CDD4DD] dark:border-slate-800 rounded-[3rem] space-y-4">
               <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-300">
                 <ClipboardCheck size={40} />
               </div>
               <div>
                 <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">All caught up!</h3>
                 <p className="text-sm text-slate-500 max-w-xs mx-auto">No assignments match your current filter. Keep up the great work!</p>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Assignments;
