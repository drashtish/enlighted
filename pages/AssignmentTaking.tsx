
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Upload, 
  AlertTriangle,
  Trophy,
  BarChart3,
  PenTool,
  FileText,
  AlertCircle,
  Notebook as NotebookIcon,
  Sparkles,
  Link2,
  Timer,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  ClipboardList,
  Camera,
  BrainCircuit,
  Zap,
  Target,
  ShieldAlert
} from 'lucide-react';
import { Question } from '../types';

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    type: 'MCQ',
    text: 'If α and β are the zeros of the quadratic polynomial f(x) = x² - px + q, then find the value of α² + β².',
    options: ['p² - 2q', 'p² + 2q', 'q² - 2p', 'p² - q'],
    correctAnswer: 'p² - 2q',
    marks: 2,
    topic: 'Polynomials',
    concept: 'Polynomial Roots'
  },
  {
    id: 'q2',
    type: 'FILL_IN_BLANKS',
    text: 'A polynomial of degree 3 is called a __________ polynomial.',
    correctAnswer: 'Cubic',
    marks: 1,
    topic: 'Polynomials',
    concept: 'Polynomial Degrees'
  },
  {
    id: 'q3',
    type: 'MATCH_THE_FOLLOWING',
    text: 'Match the Chemical Compounds with their common names:',
    matchPairs: [
      { left: 'NaHCO₃', right: 'Baking Soda' },
      { left: 'Na₂CO₃·10H₂O', right: 'Washing Soda' },
      { left: 'CaOCl₂', right: 'Bleaching Powder' }
    ],
    marks: 3,
    topic: 'Chemistry',
    concept: 'Chemical Formulas'
  },
  {
    id: 'q4',
    type: 'DEFINE',
    text: 'Define "Corrosion" and list two methods to prevent the rusting of iron.',
    marks: 5,
    placeholder: 'Write neatly or type key points.',
    topic: 'Chemical Reactions',
    concept: 'Redox Reactions',
    requiredKeywords: ['oxidation', 'protection', 'layer', 'galvanization']
  },
  {
    id: 'q5',
    type: 'LONG_ANSWER',
    text: 'Explain the "Completing the Square" derivation for the quadratic formula.',
    marks: 10,
    placeholder: 'Type the key logical steps here.',
    topic: 'Quadratic Equations',
    concept: 'Quadratic Derivations',
    requiredKeywords: ['constant', 'coefficient', 'square', 'root']
  }
];

const AssignmentTaking: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isSundayQuiz = id === 'sunday-ai-quiz';
  
  const [hasReadInstructions, setHasReadInstructions] = useState(false);
  const [instructionChecked, setInstructionChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isFinishedAcademic, setIsFinishedAcademic] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Scoring state
  const [weakConcepts, setWeakConcepts] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [finalTime, setFinalTime] = useState<number | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (hasReadInstructions && !isFinishedAcademic && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasReadInstructions, isFinishedAcademic, isSubmitted]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (val: any) => {
    setAnswers(prev => ({ ...prev, [MOCK_QUESTIONS[currentStep].id]: val }));
  };

  const evaluateQuiz = () => {
    let calculatedScore = 0;
    let maxScore = 0;
    let failed: string[] = [];

    MOCK_QUESTIONS.forEach(q => {
      maxScore += q.marks;
      const studentAnswer = (answers[q.id] || '').toString().toLowerCase();
      let isCorrect = false;

      if (q.type === 'MCQ' || q.type === 'FILL_IN_BLANKS') {
        if (studentAnswer === q.correctAnswer?.toLowerCase()) {
          isCorrect = true;
          calculatedScore += q.marks;
        }
      } else if (['DEFINE', 'SHORT_ANSWER', 'LONG_ANSWER'].includes(q.type) && q.requiredKeywords) {
        // Check if all/most keywords are present
        const keywordsPresent = q.requiredKeywords.filter(k => studentAnswer.includes(k.toLowerCase()));
        if (keywordsPresent.length >= q.requiredKeywords.length / 2) {
          isCorrect = true;
          // Weighted score based on keyword coverage
          const weight = keywordsPresent.length / q.requiredKeywords.length;
          calculatedScore += Math.round(q.marks * weight);
        }
      } else {
        // PDF tasks are manually graded, assume neutral in this simulation
        isCorrect = true;
      }

      if (!isCorrect) {
        if (!failed.includes(q.concept)) failed.push(q.concept);
      }
    });

    setScore(calculatedScore);
    setTotalMarks(maxScore);
    setWeakConcepts(failed);
    setIsFinishedAcademic(true);
    setFinalTime(seconds);
  };

  const handleNext = () => {
    if (currentStep < MOCK_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      evaluateQuiz();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setPdfUploaded(true);
      setIsUploading(false);
    }, 2000);
  };

  const currentQuestion = MOCK_QUESTIONS[currentStep];

  // 1. INSTRUCTIONS PHASE
  if (!hasReadInstructions) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-[#CDD4DD] dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className={`${isSundayQuiz ? 'bg-gradient-to-r from-[#22819A] to-[#90C2E7]' : 'bg-[#22819A]'} p-12 text-white relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              {isSundayQuiz ? <BrainCircuit size={160} /> : <ClipboardList size={160} />}
            </div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-md">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isSundayQuiz ? 'AI Adaptive Mode' : 'Standard Protocol'}</span>
                </div>
                <AlertCircle size={20} className="text-secondary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                {isSundayQuiz ? 'Sunday Mastery Quiz' : 'Assignment Guidelines'}
              </h1>
              <p className="text-white/80 font-medium max-w-xl">
                {isSundayQuiz 
                  ? 'This test targets your specific conceptual gaps from this week. Concept-level tracking is active.'
                  : 'Please review the academic integrity rules. Note: Concepts are tracked but hidden during the session.'}
              </p>
            </div>
          </div>
          
          <div className="p-10 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InstructionBox 
                icon={<Target size={20} />} 
                title="Concept Mapping"
                desc="Every answer helps the AI map your mastery levels. Be precise with your terminology."
                color="blue"
              />
              <InstructionBox 
                icon={<Zap size={20} />} 
                title="Smart Grading"
                desc="Typed answers are scanned for key pedagogical terms defined by the teacher."
                color="amber"
              />
              <InstructionBox 
                icon={<ShieldCheck size={20} />} 
                title="Integrity Watch"
                desc="Browser locking and tab monitoring are active. Focus on your paper."
                color="red"
              />
              <InstructionBox 
                icon={<FileText size={20} />} 
                title="Recovery Analysis"
                desc="At the end, your 'Weak Concepts' will be identified for next week's recovery plan."
                color="green"
              />
            </div>

            <div className="bg-[#FEF7F8] dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-primary/20 space-y-8">
              <div className="flex items-start gap-4">
                <input 
                  type="checkbox" 
                  id="accept-rules" 
                  className="w-6 h-6 rounded-lg border-primary text-primary focus:ring-primary cursor-pointer mt-1"
                  checked={instructionChecked}
                  onChange={(e) => setInstructionChecked(e.target.checked)}
                />
                <label htmlFor="accept-rules" className="text-base font-bold text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer">
                   I understand that my responses will be evaluated against concept benchmarks and keyword criteria. I am ready to start.
                </label>
              </div>

              <button 
                onClick={() => setHasReadInstructions(true)}
                disabled={!instructionChecked}
                className={`
                  w-full py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all transform flex items-center justify-center gap-3
                  ${instructionChecked 
                    ? 'bg-[#22819A] text-white hover:scale-[1.02] active:scale-95' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}
                `}
              >
                Launch Assessment <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACADEMIC TESTING PHASE
  if (!isFinishedAcademic && !isSubmitted) {
    const isNotebookTask = ['DEFINE', 'SHORT_ANSWER', 'LONG_ANSWER'].includes(currentQuestion.type);
    
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-in slide-in-from-bottom-6 duration-500">
        <div className="sticky top-4 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 rounded-[2.5rem] border border-[#CDD4DD] dark:border-slate-800 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shadow-inner border border-primary/10 ${isSundayQuiz ? 'bg-primary text-white' : 'bg-[#FEF7F8] dark:bg-slate-800 text-primary'}`}>
              {isSundayQuiz ? <BrainCircuit size={30} /> : <BookOpen size={30} />}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Question {currentStep + 1} of {MOCK_QUESTIONS.length}</p>
              <div className="flex items-center gap-4 mt-1">
                <div className="w-40 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-700" style={{ width: `${((currentStep + 1) / MOCK_QUESTIONS.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-[#FEF7F8] dark:bg-slate-800 px-8 py-3 rounded-2xl border border-primary/10 shadow-sm">
            <Timer size={20} className="text-primary" />
            <span className="text-2xl font-black text-slate-800 dark:text-white font-mono">{formatTime(seconds)}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] border border-[#CDD4DD] dark:border-slate-800 shadow-custom p-10 md:p-14 space-y-12 relative overflow-hidden transition-all min-h-[550px]">
          <div className="flex items-center justify-between">
             <div className="flex gap-2">
               <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                 {currentQuestion.type.replace(/_/g, ' ')}
               </span>
               <span className="bg-primary/5 text-primary px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/10">
                 {currentQuestion.topic}
               </span>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-xs font-black text-slate-400">VALUE:</span>
               <span className="text-lg font-black text-primary">{currentQuestion.marks} Marks</span>
             </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white leading-[1.25]">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="pt-6">
            {currentQuestion.type === 'MCQ' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentQuestion.options?.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerChange(opt)}
                    className={`
                      p-8 rounded-[2rem] border-3 text-left transition-all flex items-center gap-6 group relative overflow-hidden
                      ${answers[currentQuestion.id] === opt 
                        ? 'border-primary bg-primary/5 text-primary shadow-lg ring-4 ring-primary/5' 
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:border-primary/40'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg border-2 transition-colors ${answers[currentQuestion.id] === opt ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="font-bold text-lg">{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {(currentQuestion.type === 'FILL_IN_BLANKS' || currentQuestion.type === 'DEFINE' || currentQuestion.type === 'SHORT_ANSWER' || currentQuestion.type === 'LONG_ANSWER') && (
              <div className="max-w-3xl">
                <textarea 
                  rows={currentQuestion.type === 'LONG_ANSWER' ? 8 : 3}
                  placeholder={currentQuestion.placeholder}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-3 border-slate-100 dark:border-slate-700 rounded-[2rem] p-8 text-xl font-medium text-slate-800 dark:text-white outline-none focus:border-primary focus:bg-white transition-all shadow-inner leading-relaxed"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                />
                {['DEFINE', 'SHORT_ANSWER', 'LONG_ANSWER'].includes(currentQuestion.type) && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">
                    <ShieldAlert size={12} className="text-secondary" /> Smart Grading Active • Check Keywords
                  </div>
                )}
              </div>
            )}

            {currentQuestion.type === 'MATCH_THE_FOLLOWING' && (
              <div className="space-y-4 bg-[#FEF7F8] dark:bg-slate-800/50 p-8 rounded-[3rem] border-2 border-primary/10">
                {currentQuestion.matchPairs?.map((pair, i) => (
                  <div key={i} className="flex items-center gap-8 p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex-1 font-black text-primary text-lg">{pair.left}</div>
                    <Link2 size={24} className="text-slate-300 animate-pulse" />
                    <div className="flex-1 font-bold text-slate-700 dark:text-slate-300 text-lg">{pair.right}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <button 
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-black transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-[#CDD4DD] dark:border-slate-800 uppercase tracking-widest text-xs'}`}
          >
            <ArrowLeft size={18} /> Previous
          </button>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-4 bg-primary text-white px-16 py-6 rounded-[2rem] font-black text-lg shadow-xl hover:opacity-90 active:scale-95 transition-all transform hover:-translate-y-1"
          >
            {currentStep === MOCK_QUESTIONS.length - 1 ? 'Finish & Stop Timer' : 'Next Challenge'}
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
    );
  }

  // 3. SUCCESS / FEEDBACK PHASE
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 animate-in zoom-in-95 duration-700">
      <div className="bg-white dark:bg-slate-900 p-16 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary to-secondary" />
        <div className="w-28 h-28 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner rotate-3">
          <Trophy size={64} />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Challenge Complete!</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">Evaluation engine has mapped your mastery levels across {MOCK_QUESTIONS.length} tasks.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-100 dark:border-slate-800">
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Calculated Score</p>
            <p className="text-3xl font-black text-primary">{score} / {totalMarks}</p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Time Logged</p>
            <p className="text-3xl font-black text-primary font-mono">{formatTime(finalTime || 0)}</p>
          </div>
        </div>

        {/* KNOWLEDGE GAP ANALYSIS */}
        <div className="bg-orange-50 dark:bg-orange-950/20 p-8 rounded-[3rem] border border-orange-100 dark:border-orange-900/40 space-y-4">
           <div className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400">
              <ShieldAlert size={20} />
              <h3 className="font-black text-sm uppercase tracking-widest">Knowledge Gap Analysis</h3>
           </div>
           
           <div className="space-y-3">
             {weakConcepts.length > 0 ? (
                weakConcepts.map((concept, i) => (
                  <div key={i} className="flex items-center justify-between bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-orange-200 dark:border-orange-800">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{concept}</span>
                    <span className="text-[10px] font-black text-orange-500 bg-orange-50 dark:bg-orange-950 px-2 py-0.5 rounded-full uppercase">Weak Spot</span>
                  </div>
                ))
             ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-bold">Concept-level mastery is consistent!</span>
                </div>
             )}
           </div>
           
           <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
             {weakConcepts.length > 0 
                ? "These concepts will be prioritized in your next Adaptive Sunday Quiz."
                : "Excellent grasp of keywords and logic across all tested categories."}
           </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/assignments')}
            className="w-full bg-primary text-white py-5 rounded-[2rem] font-black shadow-2xl hover:opacity-90 active:scale-95 transition-all text-lg"
          >
            Back to Coursework
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-5 rounded-[2rem] font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all uppercase tracking-widest text-xs"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const InstructionBox: React.FC<{ icon: any, title: string, desc: string, color: 'blue' | 'amber' | 'green' | 'red' }> = ({ icon, title, desc, color }) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800',
    amber: 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800',
    green: 'bg-green-100 text-green-600 border-green-200 dark:bg-green-950/30 dark:border-green-800',
    red: 'bg-red-100 text-red-600 border-red-200 dark:bg-red-950/30 dark:border-red-800'
  };

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-[#CDD4DD] dark:border-slate-800 rounded-[2.5rem] flex gap-5 transition-all hover:shadow-xl hover:border-primary/30 group">
      <div className={`w-14 h-14 rounded-3xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <h4 className="font-black text-slate-800 dark:text-white text-base">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium mt-1">{desc}</p>
      </div>
    </div>
  );
};

export default AssignmentTaking;
