
export enum UserRole {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER'
}

export type QuestionType = 'MCQ' | 'DEFINE' | 'SHORT_ANSWER' | 'LONG_ANSWER' | 'PDF_UPLOAD' | 'FILL_IN_BLANKS' | 'MATCH_THE_FOLLOWING';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  marks: number;
  options?: string[]; // For MCQ
  correctAnswer?: string; // Mocking correct answer for score calculation
  placeholder?: string;
  concept: string; // The academic concept this question tests
  requiredKeywords?: string[]; // Keywords required in typed answers
  topic?: string;
  matchPairs?: { left: string; right: string }[]; // For Match the Following
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  chapters: string[];
  type: 'Single Chapter' | 'Multi-Chapter';
  dueDate: string;
  status: 'Pending' | 'Completed';
  totalMarks: number;
  score?: number;
  questions: Question[];
  submittedPdfUrl?: string; 
  submissionTime?: string;
  isSundayAIQuiz?: boolean;
  doubtsBasisCount?: number; 
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Submitted' | 'Graded';
  totalMarks: number;
  score?: number;
  questions: Question[];
  submittedPdfUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade?: string;
  board?: 'CBSE' | 'ICSE';
  streak: number;
  badges: string[];
}

export interface Batch {
  id: string;
  code: string;
  name: string;
  subject: string;
  board: string;
  grade: string;
  teacher: {
    name: string;
    avatar: string;
    experience: string;
  };
  schedule: string[];
  time: string;
  attendance: number;
  rank: string;
  nextClass: string;
  syllabus: { chapter: string; status: 'Completed' | 'In Progress' | 'Upcoming' }[];
}

export interface PeerReply {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  isTeacher: boolean;
  isVerified?: boolean;
}

export interface PeerPost {
  id: string;
  author: string;
  avatar: string;
  subject: string;
  question: string;
  timestamp: string;
  upvotes: number;
  replies: number;
  status: 'Unanswered' | 'Answered' | 'Verified';
  bestAnswer?: boolean;
  repliesList?: PeerReply[];
}

export interface RevisionNote {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  type: 'PDF' | 'Video' | 'Worksheet' | 'MindMap';
  size?: string;
  duration?: string;
}

export interface PerformanceData {
  date: string;
  score: number;
  average: number;
}
