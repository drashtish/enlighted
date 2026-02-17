
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Info, 
  Video, 
  Trophy, 
  Brain, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  Download,
  Clock,
  User,
  Star,
  Award,
  HelpCircle,
  MessageSquare,
  Zap,
  Bell,
  Calendar as CalendarIcon,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  FileText,
  X,
  PlusCircle,
  ListOrdered,
  FileQuestion,
  Tag,
  KeyRound
} from 'lucide-react';
import { UserRole, QuestionType, Question, Quiz } from '../types';

interface BatchDetailProps {
  userRole?: UserRole;
}

const BatchDetail: React.FC<BatchDetailProps> = ({ userRole = UserRole.STUDENT }) => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAddClass, setShowAddClass] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  
  const isTeacher = userRole === UserRole.TEACHER;

  // Mock data for a single batch
  const batch = {
    id: '1',
    name: 'Mathematics Mastery - Class 9 CBSE',
    teacher: 'Mr. Rajesh Kumar',
    attendance: 95,
    rank: '12/38',
    syllabus: [
      { chapter: 'Number Systems', status: 'Completed', notesUrl: '#' },
      { chapter: 'Polynomials', status: 'Completed', notesUrl: '#' },
      { chapter: 'Coordinate Geometry', status: 'In Progress' },
      { chapter: 'Linear Equations', status: 'Upcoming' },
    ]
  };

  const [quizzes, setQuizzes] = useState<any[]>([
    { id: 'q1', title: 'Polynomials - Final Chapter Mastery', chapters: ['Polynomials'], type: 'Single Chapter', dueDate: 'Oct 30', difficulty: 'Intermediate' },
    { id: 'q2', title: 'Term 1 Mid-Series Challenge', chapters: ['Number Systems', 'Polynomials'], type: 'Multi-Chapter', dueDate: 'Nov 02', difficulty: 'Advanced' }
  ]);

  const [upcomingClasses, setUpcomingClasses] = useState([
    { id: 'u1', date: 'Monday, Oct 28', time: '4:00 PM - 5:30 PM', topic: 'Advanced Factorization Techniques', chapter: 'Polynomials', countdown: 'Starts in 23 hours' },
    { id: 'u2', date: 'Wednesday, Oct 30', time: '4:00 PM - 5:30 PM', topic: 'Coordinate Geometry Basics', chapter: 'Coordinate Geometry', countdown: '3 days away' },
    { id: 'u3', date: 'Friday, Nov 01', time: '4:00 PM - 5:30 PM', topic: 'Section Formula & Midpoint', chapter: 'Coordinate Geometry', countdown: '5 days away' },
  ]);

  // Quiz Creator State
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    dueDate: '',
    difficulty: 'Intermediate',
    questions: [] as any[]
  });

  const handleAddQuestion = () => {
    const q: any = {
      id: Math.random().toString(),
      type: 'MCQ',
      text: '',
      concept: '',
      marks: 1,
      options: ['', '', '', ''],
      requiredKeywords: []
    };
    setNewQuiz({ ...newQuiz, questions: [...newQuiz.questions, q] });
  };

  const handleRemoveQuestion = (idx: number) => {
    const qs = [...newQuiz.questions];
    qs.splice(idx, 1);
    setNewQuiz({ ...newQuiz, questions: qs });
  };

  const handleUpdateQuestion = (idx: number, field: string, value: any) => {
    const qs = [...newQuiz.questions];
    qs[idx] = { ...qs[idx], [field]: value };
    setNewQuiz({ ...newQuiz, questions: qs });
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const createdQuiz = {
      ...newQuiz,
      id: Math.random().toString(),
      chapters: ['Mixed'],
      type: newQuiz.questions.length > 5 ? 'Multi-Chapter' : 'Single Chapter'
    };
    setQuizzes([createdQuiz, ...quizzes]);
    setShowQuizModal(false);
    // Reset form
    setNewQuiz({ title: '', dueDate: '', difficulty: 'Intermediate', questions: [] });
  };

  const handleRemoveClass = (classId: string) => {
    setUpcomingClasses(prev => prev.filter(c => c.id !== classId));
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass = {
      id: Math.random().toString(),
      date: 'Next Available',
      time: 'TBD',
      topic: 'Extra Doubt Session',
      chapter: 'General',
      countdown: 'Upcoming'
    };
    setUpcomingClasses([newClass, ...upcomingClasses]);
    setShowAddClass(false);
  };

  const tabs = [
    { name: 'Overview', icon: <Info size={18} /> },
    { name: 'Live Classes', icon: <Video size={18} /> },
    { name: 'Quizzes', icon: <Zap size={18} /> },
    { name: 'Ranking', icon: <Trophy size={18} /> },
    { name: 'Doubts', icon: <Brain size={18} /> },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Quiz Creator Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] border border-[#CDD4DD] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95">
             <div className="bg-[#10B981] p-6 text-white flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl"><PlusCircle size={24} /></div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">Create New Batch Quiz</h3>
                </div>
                <button onClick={() => setShowQuizModal(false)} className="hover:rotate-90 transition-transform"><X size={28} /></button>
             </div>
             
             <form onSubmit={handleSaveQuiz} className="overflow-y-auto p-8 md:p-10 space-y-10">
                {/* Meta Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#CDD4DD]">
                  <div className="md:col-span-1 space-y-1">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest ml-1">Quiz Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Quadratic Eq. Final Test" 
                      className="w-full bg-[#FEF7F8] border-2 border-[#CDD4DD] rounded-2xl p-4 font-bold text-[#2C3E50] focus:border-[#10B981] outline-none transition-all"
                      value={newQuiz.title}
                      onChange={(e) => setNewQuiz({...newQuiz, title: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest ml-1">Deadline Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-[#FEF7F8] border-2 border-[#CDD4DD] rounded-2xl p-4 font-bold text-[#2C3E50] focus:border-[#10B981] outline-none transition-all"
                      value={newQuiz.dueDate}
                      onChange={(e) => setNewQuiz({...newQuiz, dueDate: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest ml-1">Difficulty</label>
                    <select 
                      className="w-full bg-[#FEF7F8] border-2 border-[#CDD4DD] rounded-2xl p-4 font-bold text-[#2C3E50] focus:border-[#10B981] outline-none transition-all"
                      value={newQuiz.difficulty}
                      onChange={(e) => setNewQuiz({...newQuiz, difficulty: e.target.value})}
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Questions Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg text-[#2C3E50] flex items-center gap-2">
                      <ListOrdered size={20} className="text-[#10B981]" /> Question Bank Builder
                    </h4>
                    <span className="text-[10px] font-bold text-[#6B7280] bg-[#FEF7F8] px-3 py-1 rounded-full border border-[#CDD4DD]">
                      {newQuiz.questions.length} QUESTIONS ADDED
                    </span>
                  </div>

                  <div className="space-y-8">
                    {newQuiz.questions.map((q, idx) => (
                      <div key={q.id} className="relative bg-[#FEF7F8] rounded-3xl border border-[#CDD4DD] p-6 space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <button 
                          type="button" 
                          onClick={() => handleRemoveQuestion(idx)}
                          className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-red-100 rounded-full flex items-center justify-center text-red-500 shadow-md hover:bg-red-500 hover:text-white transition-all"
                        >
                          <X size={16} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="md:col-span-3">
                            <label className="text-[10px] font-bold text-[#6B7280] uppercase mb-1 ml-1 flex items-center gap-1">
                              <FileQuestion size={12} /> Question {idx + 1}
                            </label>
                            <input 
                              type="text" 
                              placeholder="Enter the question text..." 
                              className="w-full bg-white border-2 border-[#CDD4DD] rounded-xl p-3 text-sm font-semibold focus:border-[#10B981] outline-none"
                              value={q.text}
                              onChange={(e) => handleUpdateQuestion(idx, 'text', e.target.value)}
                              required 
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-[#6B7280] uppercase mb-1 ml-1">Type</label>
                            <select 
                              className="w-full bg-white border-2 border-[#CDD4DD] rounded-xl p-3 text-sm font-semibold focus:border-[#10B981] outline-none"
                              value={q.type}
                              onChange={(e) => handleUpdateQuestion(idx, 'type', e.target.value)}
                            >
                              <option value="MCQ">MCQ</option>
                              <option value="DEFINE">Define</option>
                              <option value="SHORT_ANSWER">Short Answer</option>
                              <option value="LONG_ANSWER">Long Answer</option>
                              <option value="PDF_UPLOAD">Handwritten PDF</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="text-[10px] font-bold text-[#6B7280] uppercase mb-1 ml-1 flex items-center gap-1">
                              <Tag size={12} /> Concept Mastery Tag
                            </label>
                            <input 
                              type="text" 
                              placeholder="e.g. Factorization, Trigonometry Basics" 
                              className="w-full bg-white border-2 border-[#CDD4DD] rounded-xl p-3 text-sm font-semibold focus:border-[#10B981] outline-none"
                              value={q.concept}
                              onChange={(e) => handleUpdateQuestion(idx, 'concept', e.target.value)}
                              required 
                            />
                            <p className="text-[9px] text-slate-400 mt-1 ml-1 italic">Used for student knowledge gap analysis.</p>
                          </div>

                          {['DEFINE', 'SHORT_ANSWER', 'LONG_ANSWER'].includes(q.type) && (
                            <div>
                              <label className="text-[10px] font-bold text-[#6B7280] uppercase mb-1 ml-1 flex items-center gap-1">
                                <KeyRound size={12} /> Mandatory Keywords (Comma separated)
                              </label>
                              <input 
                                type="text" 
                                placeholder="e.g. discriminant, roots, quadratic" 
                                className="w-full bg-white border-2 border-[#CDD4DD] rounded-xl p-3 text-sm font-semibold focus:border-[#10B981] outline-none"
                                value={q.requiredKeywords?.join(', ') || ''}
                                onChange={(e) => handleUpdateQuestion(idx, 'requiredKeywords', e.target.value.split(',').map(s => s.trim()))}
                              />
                              <p className="text-[9px] text-slate-400 mt-1 ml-1 italic">Answer will be marked correct if keywords are present.</p>
                            </div>
                          )}
                        </div>

                        {q.type === 'MCQ' && (
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            {q.options.map((opt: string, optIdx: number) => (
                              <input 
                                key={optIdx}
                                type="text" 
                                placeholder={`Option ${optIdx + 1}`} 
                                className="bg-white border border-[#CDD4DD] rounded-lg p-2 text-xs"
                                value={opt}
                                onChange={(e) => {
                                  const newOpts = [...q.options];
                                  newOpts[optIdx] = e.target.value;
                                  handleUpdateQuestion(idx, 'options', newOpts);
                                }}
                                required
                              />
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                           <div className="flex items-center gap-2">
                             <label className="text-[10px] font-bold text-[#6B7280] uppercase">Marks:</label>
                             <input 
                               type="number" 
                               className="w-16 bg-white border border-[#CDD4DD] rounded-lg p-1 text-center text-sm font-bold"
                               value={q.marks}
                               onChange={(e) => handleUpdateQuestion(idx, 'marks', parseInt(e.target.value))}
                             />
                           </div>
                           <div className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                             <CheckCircle2 size={12} /> Live Draft Validation
                           </div>
                        </div>
                      </div>
                    ))}

                    <button 
                      type="button" 
                      onClick={handleAddQuestion}
                      className="w-full py-6 border-2 border-dashed border-[#10B981] rounded-3xl text-[#10B981] font-bold flex flex-col items-center justify-center gap-2 hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white border border-[#10B981] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                      </div>
                      <span className="text-sm">Add New Question Challenge</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 pt-10 sticky bottom-0 bg-white pb-2 z-10">
                   <button 
                    type="button" 
                    onClick={() => setShowQuizModal(false)} 
                    className="flex-1 py-4 border-2 border-[#CDD4DD] rounded-2xl font-bold text-[#6B7280] hover:bg-gray-50"
                   >
                    Cancel
                   </button>
                   <button 
                    type="submit" 
                    className="flex-1 py-4 bg-[#10B981] text-white rounded-2xl font-bold shadow-xl hover:bg-[#0d9468] transition-all"
                   >
                    Publish Quiz to Batch
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-custom ${isTeacher ? 'border-l-4 border-l-[#10B981]' : ''}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white ${isTeacher ? 'bg-[#10B981]' : 'bg-[#22819A]'}`}>M</div>
            <div>
              <h1 className={`text-2xl font-bold ${isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'}`}>{batch.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-[#6B7280]">
                <span className="flex items-center gap-1"><User size={14} /> {batch.teacher}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> Mon, Wed, Fri • 4:00 PM</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-4 border-r border-[#CDD4DD]">
              <p className="text-xs text-[#6B7280] font-bold uppercase">{isTeacher ? 'Total Students' : 'Rank'}</p>
              <p className={`text-xl font-bold ${isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'}`}>{isTeacher ? '38' : batch.rank}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs text-[#6B7280] font-bold uppercase">Avg. Attendance</p>
              <p className="text-xl font-bold text-[#10B981]">{batch.attendance}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#CDD4DD] overflow-x-auto gap-8 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`
              flex items-center gap-2 py-4 px-2 font-bold text-sm border-b-2 transition-all whitespace-nowrap
              ${activeTab === tab.name 
                ? `${isTeacher ? 'border-[#10B981] text-[#10B981]' : 'border-[#22819A] text-[#22819A]'}` 
                : 'border-transparent text-[#6B7280] hover:text-[#10B981]'}
            `}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-custom">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-[#2C3E50]">Syllabus Progress</h3>
                  {isTeacher && (
                    <button className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1">
                      <Plus size={14} /> Add Chapter
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {batch.syllabus.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#FEF7F8] transition-colors group">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${item.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
                      `}>
                        {item.status === 'Completed' ? <CheckCircle2 size={18} /> : (idx + 1)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${item.status === 'Upcoming' ? 'text-[#6B7280]' : 'text-[#2C3E50]'}`}>
                          {item.chapter}
                        </p>
                        <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{item.status}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {item.status === 'Completed' && (
                          <button className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${isTeacher ? 'text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white' : 'text-[#22819A] border-[#22819A] hover:bg-[#22819A] hover:text-white'}`}>
                            <Download size={12} /> {isTeacher ? 'Re-upload Notes' : 'Notes PDF'}
                          </button>
                        )}
                        {isTeacher && item.status === 'In Progress' && (
                          <button className="flex items-center gap-1 text-[10px] font-bold bg-[#10B981] text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all">
                            <Upload size={12} /> Upload Lecture Notes
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className={`rounded-2xl p-6 border ${isTeacher ? 'bg-[#ECFDF5] border-[#10B981]/30' : 'bg-[#FEF7F8] border-[#90C2E7]/30'}`}>
                <h3 className={`font-bold mb-2 ${isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'}`}>
                  {isTeacher ? 'Quick Actions' : 'Next Chapter Quiz'}
                </h3>
                {isTeacher ? (
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-white rounded-xl border border-transparent hover:border-[#10B981] text-xs font-bold text-[#2C3E50] flex items-center justify-between">
                      Take Attendance <ChevronRight size={14} />
                    </button>
                    <button className="w-full text-left p-3 bg-white rounded-xl border border-transparent hover:border-[#10B981] text-xs font-bold text-[#2C3E50] flex items-center justify-between">
                      Send Batch Notification <ChevronRight size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#2C3E50] mb-4">Complete your current chapter to unlock the 'Coordinate Geometry' Mastery Quiz.</p>
                    <Link to="/notes" className="text-xs font-bold text-[#22819A] flex items-center gap-1 hover:underline">
                      Review Notes <ChevronRight size={14} />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Live Classes' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-2">
             {/* Current Live Session */}
             <div className={`${isTeacher ? 'bg-[#10B981]' : 'bg-[#22819A]'} text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl`}>
               <div className="flex items-center gap-4">
                 <div className="relative">
                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                     <Video size={24} className="text-white" />
                   </div>
                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#10B981]"></div>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Live Session</p>
                   <h3 className="text-xl font-bold mt-1">Quadratic Equations Advanced</h3>
                   <p className="text-sm text-white/80">Active Now • Joined by 32 students</p>
                 </div>
               </div>
               <button className="bg-white text-[#10B981] px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-[#FEF7F8] transition-all transform hover:scale-105">
                 {isTeacher ? 'Enter Classroom' : 'Join Class Now'}
               </button>
             </div>

             {/* Upcoming Sessions */}
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <h4 className="font-bold text-[#2C3E50] flex items-center gap-2">
                   <CalendarIcon size={20} className={isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'} /> Scheduled Classes
                 </h4>
                 {isTeacher && (
                   <button 
                    onClick={() => setShowAddClass(true)}
                    className="bg-[#10B981] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all"
                   >
                     + Schedule Extra Class
                   </button>
                 )}
               </div>

               {showAddClass && (
                 <div className="bg-[#ECFDF5] border-2 border-[#10B981] rounded-2xl p-6 animate-in zoom-in-95">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-bold text-[#10B981]">Schedule New Class</h5>
                      <button onClick={() => setShowAddClass(false)}><X size={20} className="text-[#6B7280]" /></button>
                    </div>
                    <form onSubmit={handleAddClass} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <input type="text" placeholder="Topic Title" className="bg-white p-3 rounded-xl text-sm border border-[#CDD4DD] outline-none" required />
                       <input type="datetime-local" className="bg-white p-3 rounded-xl text-sm border border-[#CDD4DD] outline-none" required />
                       <button className="bg-[#10B981] text-white rounded-xl font-bold text-sm">Create Class</button>
                    </form>
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {upcomingClasses.map((u) => (
                   <div key={u.id} className="bg-white border border-[#CDD4DD] rounded-2xl p-5 shadow-sm hover:border-[#10B981] transition-all flex flex-col justify-between group">
                     <div>
                       <div className="flex items-center justify-between mb-3">
                         <span className={`text-[10px] font-bold ${isTeacher ? 'text-[#10B981] bg-green-50' : 'text-[#22819A] bg-[#FEF7F8]'} border border-current/30 px-2 py-0.5 rounded uppercase`}>
                           {u.date}
                         </span>
                         {isTeacher && (
                           <button onClick={() => handleRemoveClass(u.id)} className="text-red-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <Trash2 size={16} />
                           </button>
                         )}
                         {!isTeacher && (
                           <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1">
                             <Clock size={12} /> {u.countdown}
                           </span>
                         )}
                       </div>
                       <h5 className="font-bold text-[#2C3E50] text-sm mb-1 leading-snug">{u.topic}</h5>
                       <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">{u.chapter}</p>
                       <p className="text-xs text-[#6B7280] mt-2 flex items-center gap-1">
                         <Clock size={12} /> {u.time}
                       </p>
                     </div>
                     <div className="flex gap-2 mt-4">
                       <button className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-bold transition-colors ${isTeacher ? 'bg-[#10B981] text-white hover:opacity-90' : 'bg-[#FEF7F8] text-[#22819A] border border-[#90C2E7]/20 hover:bg-[#90C2E7]/10'}`}>
                         {isTeacher ? 'Update Link' : <><Bell size={12} /> Remind Me</>}
                       </button>
                       <button className="p-2 bg-white border border-[#CDD4DD] text-[#6B7280] rounded-lg hover:text-[#10B981] hover:border-[#10B981] transition-colors">
                         <CalendarIcon size={14} />
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
             </div>

             {/* Past Sessions */}
             <div className="bg-white rounded-2xl border border-[#CDD4DD] p-6 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                 <h4 className="font-bold text-[#2C3E50] flex items-center gap-2">
                   <Clock size={20} className={isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'} /> Lecture Archive
                 </h4>
                 <div className="flex items-center gap-2">
                   <button className="text-[10px] font-bold text-[#6B7280] hover:text-[#10B981]">View All Recordings</button>
                 </div>
               </div>
               <div className="space-y-3">
                 {[
                   { date: 'Oct 24', title: 'Polynomials: Recap & Doubt Solving', duration: '1h 20m', attendees: 35 },
                   { date: 'Oct 22', title: 'Introduction to Number Systems', duration: '1h 15m', attendees: 38 },
                 ].map((lecture, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-transparent hover:border-[#CDD4DD] hover:bg-[#FEF7F8] transition-all group">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isTeacher ? 'bg-green-100 text-[#10B981] group-hover:bg-[#10B981] group-hover:text-white' : 'bg-orange-100 text-orange-600 group-hover:bg-[#22819A] group-hover:text-white'}`}>
                       <Play size={24} fill="currentColor" />
                     </div>
                     <div className="flex-1">
                       <p className="text-sm font-bold text-[#2C3E50]">{lecture.title}</p>
                       <div className="flex items-center gap-3 mt-0.5">
                         <span className="text-[10px] text-[#6B7280] font-bold uppercase">{lecture.date}</span>
                         <span className="text-[10px] text-[#6B7280]">• {lecture.duration}</span>
                         <span className="text-[10px] text-[#6B7280]">• {lecture.attendees} Attended</span>
                       </div>
                     </div>
                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className={`p-2 rounded-lg shadow-sm border border-transparent hover:border-[#CDD4DD] bg-white ${isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'}`}>
                         <Download size={20} />
                       </button>
                       {isTeacher && (
                         <button className="p-2 text-red-400 hover:text-red-600 bg-white border border-transparent hover:border-red-100 rounded-lg shadow-sm">
                           <Trash2 size={20} />
                         </button>
                       )}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        )}

        {/* Existing Quiz/Ranking/Doubts Tabs with Role awareness if needed */}
        {activeTab === 'Quizzes' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-4">
               <h4 className="font-bold text-[#2C3E50]">Available Assessments</h4>
               {isTeacher && (
                 <button 
                  onClick={() => setShowQuizModal(true)}
                  className="bg-[#10B981] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center gap-2"
                 >
                   <PlusCircle size={16} /> Create New Quiz
                 </button>
               )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-custom transition-all ${isTeacher ? 'hover:border-[#10B981]' : 'hover:border-[#22819A]'}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${quiz.type === 'Multi-Chapter' ? 'bg-purple-50 text-purple-600 border-purple-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                        {quiz.type.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-orange-500">Due {quiz.dueDate}</span>
                    </div>
                    <h4 className="font-bold text-[#2C3E50] text-lg mb-2">{quiz.title}</h4>
                    {quiz.questions && (
                      <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{quiz.questions.length} Questions</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-bold text-[#6B7280]">{quiz.difficulty}</span>
                    <button className={`${isTeacher ? 'bg-[#10B981]' : 'bg-[#22819A]'} text-white px-6 py-2 rounded-xl text-center font-bold hover:opacity-90 transition-opacity`}>
                      {isTeacher ? 'Edit Questions' : 'Take Quiz'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Ranking' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
             <div className={`${isTeacher ? 'bg-[#10B981]' : 'bg-[#22819A]'} rounded-2xl p-8 text-white text-center shadow-xl`}>
              <p className="text-xs font-bold text-white/60 uppercase">Batch Performance Index</p>
              <h2 className="text-5xl font-bold my-2">82.4%</h2>
              <p className="text-sm text-white/80">Total 38 students • 12 Performing above average</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#CDD4DD] overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-[#FEF7F8] text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Attendance</th>
                    <th className="px-6 py-4">Mastery %</th>
                    {isTeacher && <th className="px-6 py-4 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CDD4DD]">
                  {[
                    { rank: 1, name: 'Priya Sharma', attendance: '98%', mastery: '95%' },
                    { rank: 2, name: 'Rahul Dev', attendance: '94%', mastery: '93%' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FEF7F8] transition-colors">
                      <td className="px-6 py-4 text-sm font-bold">{row.rank}</td>
                      <td className="px-6 py-4 text-sm flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#CDD4DD] flex items-center justify-center text-[10px] text-white">
                          {row.name.charAt(0)}
                        </div>
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-sm">{row.attendance}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#10B981]">{row.mastery}</td>
                      {isTeacher && (
                        <td className="px-6 py-4 text-right">
                          <button className="text-[10px] font-bold text-[#10B981] hover:underline">Full Analytics</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Doubts' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[#2C3E50]">Batch Specific Doubts</h3>
              {isTeacher && (
                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">12 Pending Doubts</span>
              )}
            </div>
            {[
              { id: '1', title: 'Quadratic Formula Derivation', date: 'Oct 24', status: 'Resolved', student: 'Rahul K.' },
              { id: '2', title: 'Completing the square vs Formula', date: 'Oct 22', status: 'Pending', student: 'Sara A.' },
            ].map((d, i) => (
              <div key={i} className={`bg-white rounded-2xl border p-5 shadow-sm transition-all group ${d.status === 'Pending' ? 'border-orange-300' : 'border-[#CDD4DD] hover:border-[#10B981]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle size={18} className={isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'} />
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase">{d.date} • {d.student}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${d.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {d.status}
                  </span>
                </div>
                <h4 className="font-bold text-[#2C3E50]">{d.title}</h4>
                <div className="mt-4 flex items-center gap-4">
                  <button className={`text-xs font-bold flex items-center gap-1 ${isTeacher ? 'text-[#10B981]' : 'text-[#22819A]'}`}>
                    <MessageSquare size={14} /> {isTeacher && d.status === 'Pending' ? 'Provide Solution' : 'View Thread'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDetail;
