
import React, { useState, useRef, useEffect } from 'react';
import { 
  BrainCircuit, 
  Send, 
  Image as ImageIcon, 
  Mic, 
  History, 
  ChevronRight,
  MessageSquare,
  Sparkles,
  Zap,
  Clock,
  Target,
  ArrowRight,
  RotateCcw,
  FileSearch,
  CheckCircle2,
  X,
  TrendingUp,
  BarChart3,
  Award,
  FileText,
  MicOff
} from 'lucide-react';
import { solveDoubt } from '../services/geminiService';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Doubts: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('Math');
  const [loading, setLoading] = useState(false);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedReviewQuiz, setSelectedReviewQuiz] = useState<any>(null);
  
  // Voice Recording State
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [history, setHistory] = useState<any[]>([
    { id: '1', question: 'How to solve x^2 + 5x + 6 = 0?', subject: 'Math', timestamp: '2 hours ago', status: 'Resolved' },
    { id: '2', question: 'What is the structure of an atom?', subject: 'Science', timestamp: '1 day ago', status: 'Resolved' },
  ]);
  const [activeDoubt, setActiveDoubt] = useState<any>(null);

  const pastAiQuizzes = [
    { 
      id: 'pa1', 
      date: 'Oct 20, 2024', 
      score: '38/40', 
      topics: 'Probability, Tenses',
      breakdown: [
        { topic: 'Probability', status: 'Mastered', correct: 18, total: 20 },
        { topic: 'Tenses', status: 'Mastered', correct: 20, total: 20 }
      ]
    },
    { 
      id: 'pa2', 
      date: 'Oct 13, 2024', 
      score: '22/40', 
      topics: 'Circles, Chemical Reactions',
      breakdown: [
        { topic: 'Circles', status: 'Critical', correct: 8, total: 20 },
        { topic: 'Chemical Reactions', status: 'Steady', correct: 14, total: 20 }
      ]
    },
  ];

  const archiveTrendData = [
    { date: 'Oct 06', score: 65 },
    { date: 'Oct 13', score: 55 },
    { date: 'Oct 20', score: 95 },
    { date: 'Oct 27', score: 84 },
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setQuestion(prev => (prev + ' ' + event.results[i][0].transcript).trim());
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    if (isRecording) {
      recognitionRef.current.stop();
    }
    setLoading(true);
    const answer = await solveDoubt(question, subject);
    const newDoubt = { id: Date.now().toString(), question, subject, answer, timestamp: 'Just now', status: 'Resolved' };
    setHistory([newDoubt, ...history]);
    setActiveDoubt(newDoubt);
    setQuestion('');
    setLoading(false);
  };

  const handleStartSundayQuiz = () => {
    setIsGeneratingQuiz(true);
    setTimeout(() => {
      setIsGeneratingQuiz(false);
      navigate('/assignment-taking/sunday-ai-quiz');
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full animate-in slide-in-from-bottom-4 duration-500 pb-12 relative">
      
      {/* MODAL: ANALYSIS ARCHIVE */}
      {showArchive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[3rem] border border-[#CDD4DD] dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95">
            <div className="bg-[#22819A] p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl"><TrendingUp size={24} /></div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">AI Mastery Archive</h3>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Growth progression across Sunday assessments</p>
                </div>
              </div>
              <button onClick={() => setShowArchive(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={32} /></button>
            </div>
            <div className="p-10 overflow-y-auto space-y-10 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ArchiveStat icon={<Award className="text-yellow-500" />} label="Average Mastery" value="82%" />
                <ArchiveStat icon={<CheckCircle2 className="text-green-500" />} label="Quizzes Completed" value="14" />
                <ArchiveStat icon={<BrainCircuit className="text-primary" />} label="Concepts Recovered" value="48" />
              </div>

              <div className="bg-[#FEF7F8] dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-primary/10">
                <h4 className="font-bold text-[#2C3E50] dark:text-slate-200 mb-6 flex items-center gap-2">
                  <BarChart3 size={20} className="text-primary" /> Performance Trend
                </h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={archiveTrendData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} />
                      <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}} />
                      <Line type="monotone" dataKey="score" stroke="#22819A" strokeWidth={4} dot={{ r: 6, fill: '#22819A', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: QUIZ REVIEW */}
      {selectedReviewQuiz && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] p-8 border border-primary/20 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-800 dark:text-white">Quiz Review: {selectedReviewQuiz.date}</h3>
                 <button onClick={() => setSelectedReviewQuiz(null)}><X size={24} className="text-slate-400" /></button>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-3xl border border-primary/10">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final Grade</p>
                     <p className="text-3xl font-black text-primary">{selectedReviewQuiz.score}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                     <p className="text-lg font-bold text-green-500">EXCELLENT</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Concept Breakdown</p>
                   {selectedReviewQuiz.breakdown.map((b: any, i: number) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full ${b.status === 'Mastered' ? 'bg-green-500' : 'bg-red-500'}`} />
                           <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{b.topic}</span>
                        </div>
                        <span className="text-xs font-black text-slate-500">{b.correct}/{b.total}</span>
                     </div>
                   ))}
                </div>
                <button 
                  onClick={() => navigate(`/assignment-taking/${selectedReviewQuiz.id}?reattempt=true`)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl hover:opacity-90 active:scale-95 transition-all mt-4"
                >
                  Reattempt Incorrect Questions
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Main Column */}
      <div className="lg:col-span-3 space-y-6 flex flex-col h-full">
        
        {/* Sunday AI Quiz Card */}
        <div className="bg-gradient-to-br from-[#90C2E7] to-[#22819A] rounded-[2.5rem] p-1 shadow-lg">
          <div className="bg-white dark:bg-slate-900 rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <Zap size={150} className="absolute -right-8 -top-8 text-[#90C2E7]/10" />
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-[#FEF7F8] dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-[#22819A] dark:text-secondary shadow-inner border border-primary/10">
                <BrainCircuit size={40} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse shadow-sm">SUNDAY MASTERY</span>
                  <span className="text-[10px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-widest">Adaptive Assessment</span>
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Weekly AI Recovery Quiz</h2>
                <p className="text-sm text-[#6B7280] dark:text-slate-500 font-medium">Generated from your <b className="text-primary">15 doubts</b> asked this week</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400">
                  <Target size={16} className="text-primary" />
                  <span className="text-xs font-bold">10 Specialized Questions</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400">
                  <Clock size={16} className="text-orange-500" />
                  <span className="text-xs font-bold">Ends Sunday, 11:59 PM</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleStartSundayQuiz}
                  disabled={isGeneratingQuiz}
                  className={`
                    px-10 py-4 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95
                    ${isGeneratingQuiz ? 'bg-slate-200 text-slate-400' : 'bg-primary text-white hover:opacity-90'}
                  `}
                >
                  {isGeneratingQuiz ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                      Analyzing Doubts...
                    </>
                  ) : (
                    <>Start Adaptive Quiz <ArrowRight size={18} /></>
                  )}
                </button>
                <button className="text-[10px] font-black text-primary hover:underline flex items-center justify-center gap-1 uppercase tracking-widest">
                  <FileSearch size={12} /> Detailed Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ask Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-custom p-8 border border-[#CDD4DD] dark:border-slate-800">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl border border-primary/20">
              <MessageSquare size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-primary tracking-tight">Ask Your Doubt</h2>
              <p className="text-xs font-bold text-[#6B7280] dark:text-slate-500 uppercase tracking-widest">Get step-by-step AI solutions instantly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <select 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-[#FEF7F8] dark:bg-slate-800 border-2 border-[#CDD4DD] dark:border-slate-700 rounded-2xl px-6 py-3 text-sm font-bold text-[#2C3E50] dark:text-slate-200 focus:ring-2 focus:ring-primary outline-none cursor-pointer"
              >
                <option>Math</option>
                <option>Science</option>
                <option>English</option>
                <option>History</option>
              </select>
            </div>
            
            <div className="relative">
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={isRecording ? "Listening carefully... Speak your doubt now." : "Type your question here or use the microphone..."}
                className={`w-full h-48 bg-[#FEF7F8] dark:bg-slate-800 border-2 border-[#CDD4DD] dark:border-slate-700 rounded-[2.5rem] p-8 text-base font-medium resize-none focus:ring-2 focus:ring-primary outline-none dark:text-slate-200 transition-all ${isRecording ? 'border-primary ring-4 ring-primary/5' : ''}`}
              />
              <div className="absolute bottom-6 right-8 flex gap-3">
                <button type="button" className="p-3 bg-white dark:bg-slate-900 text-[#6B7280] hover:text-primary rounded-2xl border border-[#CDD4DD] dark:border-slate-700 shadow-sm transition-all" title="Upload Image"><ImageIcon size={22} /></button>
                <button 
                  type="button" 
                  onClick={toggleRecording}
                  className={`p-3 rounded-2xl border shadow-sm transition-all flex items-center justify-center ${isRecording ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'bg-white dark:bg-slate-900 text-[#6B7280] hover:text-primary border-[#CDD4DD] dark:border-slate-700'}`} 
                  title={isRecording ? "Stop Recording" : "Voice Input"}
                >
                  {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className={`
                w-full py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl transition-all transform active:scale-95
                ${loading ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-primary text-white hover:opacity-90'}
              `}
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating Solution...
                </>
              ) : (
                <>
                  <Sparkles size={24} /> Get Step-by-Step Solution
                </>
              )}
            </button>
          </form>
        </div>

        {/* Active Solution Area */}
        {activeDoubt && (
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 md:p-10 border-2 border-primary/30 overflow-y-auto min-h-[400px] animate-in slide-in-from-top-6">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
              <h3 className="text-xl font-black text-primary uppercase tracking-tight">{activeDoubt.subject} AI Solution</h3>
              <span className="text-[10px] font-black text-[#6B7280] dark:text-slate-500 bg-[#FEF7F8] dark:bg-slate-800 px-3 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">
                Doubt ID: #{activeDoubt.id.slice(-5)}
              </span>
            </div>
            <div className="space-y-10">
              <div className="bg-[#FEF7F8] dark:bg-slate-800/50 p-8 rounded-[2rem] border border-primary/10">
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-3">Target Problem</p>
                <p className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-relaxed">{activeDoubt.question}</p>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                {activeDoubt.answer}
              </div>
              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Useful?</span>
                  <div className="flex gap-2">
                    <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-green-500 transition-colors">👍</button>
                    <button className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-red-500 transition-colors">👎</button>
                  </div>
                </div>
                <button className="text-sm font-black text-primary hover:underline flex items-center gap-2 uppercase tracking-widest">
                   <RotateCcw size={18} /> Clarify Further
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar - History & Past Quizzes */}
      <div className="space-y-6 flex flex-col max-h-[calc(100vh-12rem)]">
        
        {/* Past Doubts History */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-custom p-8 border border-[#CDD4DD] dark:border-slate-800 flex flex-col flex-1 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-primary flex items-center gap-3 tracking-tight">
              <History size={22} /> Past Doubts
            </h2>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
            {history.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveDoubt(item)}
                className={`
                  w-full p-6 rounded-[2rem] border-2 text-left transition-all group
                  ${activeDoubt?.id === item.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-slate-50 dark:border-slate-800 hover:border-primary/30'}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                    {item.subject}
                  </span>
                  <span className="text-[10px] font-bold text-[#6B7280]">{item.timestamp}</span>
                </div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">{item.question}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Past AI Quizzes Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-custom p-8 border border-[#CDD4DD] dark:border-slate-800">
          <h3 className="text-lg font-black text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <Award size={22} className="text-primary" /> Past AI Tests
          </h3>
          <div className="space-y-4">
            {pastAiQuizzes.map((quiz) => (
              <div key={quiz.id} className="p-5 bg-[#FEF7F8] dark:bg-slate-800/50 rounded-[2rem] border border-transparent hover:border-primary transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{quiz.date}</p>
                  <p className="text-sm font-black text-primary">{quiz.score}</p>
                </div>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 line-clamp-1 mb-4">{quiz.topics}</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => navigate(`/assignment-taking/sunday-ai-quiz?reattempt=true`)}
                    className="flex-1 py-2 bg-white dark:bg-slate-800 border-2 border-primary/20 rounded-xl text-[10px] font-black text-primary hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                  >
                    Reattempt
                  </button>
                  <button 
                    onClick={() => setSelectedReviewQuiz(quiz)}
                    className="flex-1 py-2 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black text-[#6B7280] hover:bg-slate-100 transition-all uppercase tracking-widest"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowArchive(true)}
            className="w-full mt-6 text-[10px] font-black text-primary hover:underline uppercase tracking-[0.2em] text-center"
          >
            View Analysis Archive
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CDD4DD; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22819A; }
      `}</style>
    </div>
  );
};

const ArchiveStat: React.FC<{ icon: any, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 text-center space-y-2 group hover:translate-y-[-4px] transition-all">
    <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2">{label}</p>
    <p className="text-3xl font-black text-slate-800 dark:text-white">{value}</p>
  </div>
);

export default Doubts;
