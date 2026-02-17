
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ThumbsUp, 
  MessageCircle, 
  ShieldCheck, 
  Search, 
  Plus, 
  Award, 
  Flame, 
  User, 
  CheckCircle, 
  Star,
  Trash2,
  AlertCircle,
  CheckCircle2,
  MoreVertical,
  X
} from 'lucide-react';
import { PeerPost, UserRole } from '../types';

interface PeerLearningProps {
  userRole?: UserRole;
}

const INITIAL_POSTS: PeerPost[] = [
  {
    id: '1',
    author: 'Priya S.',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    subject: 'Mathematics',
    question: 'Can someone explain why we use the discriminant method in quadratic equations? Is it faster than factorization?',
    timestamp: '2 hours ago',
    upvotes: 12,
    replies: 4,
    status: 'Verified',
    bestAnswer: true
  },
  {
    id: '2',
    author: 'Arjun M.',
    avatar: 'https://i.pravatar.cc/150?u=arjun',
    subject: 'Science',
    question: 'How do valence electrons determine the chemical reactivity of an element?',
    timestamp: '5 hours ago',
    upvotes: 8,
    replies: 2,
    status: 'Answered'
  },
  {
    id: '3',
    author: 'Rahul D.',
    avatar: 'https://i.pravatar.cc/150?u=rahul',
    subject: 'Mathematics',
    question: 'Extremely confused about completing the square method. Help needed for the final exam revision!',
    timestamp: '1 hour ago',
    upvotes: 24,
    replies: 0,
    status: 'Unanswered'
  }
];

const PeerLearning: React.FC<PeerLearningProps> = ({ userRole = UserRole.STUDENT }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<PeerPost[]>(INITIAL_POSTS);
  const isTeacher = userRole === UserRole.TEACHER;

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to remove this post? This action is permanent and will notify the student.')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleVerifyPost = (id: string) => {
    setPosts(posts.map(p => 
      p.id === id ? { ...p, status: 'Verified' as const } : p
    ));
  };

  const filteredPosts = posts.filter(p => {
    const matchesTab = activeTab === 'All' || p.subject === activeTab;
    const matchesSearch = p.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-500 pb-20">
      <div className="lg:col-span-3 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${isTeacher ? 'text-[#10B981] dark:text-[#34D399]' : 'text-[#22819A] dark:text-[#90C2E7]'}`}>
              {isTeacher ? 'Community Moderation' : 'Peer Learning'}
            </h1>
            <p className="text-[#6B7280] dark:text-slate-400">
              {isTeacher ? 'Manage community discussions and resolve complex student doubts.' : 'Learn together, solve doubts, and earn badges'}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search forum..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#22819A] dark:text-slate-200"
              />
            </div>
            {!isTeacher ? (
              <button className="flex items-center gap-2 bg-[#22819A] text-white px-6 py-2 rounded-xl font-bold shadow-md hover:opacity-90 transition-opacity">
                <Plus size={20} /> Ask
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <ShieldCheck size={18} className="text-[#10B981] dark:text-[#34D399]" />
                <span className="text-xs font-bold text-[#10B981] dark:text-[#34D399] uppercase tracking-wider">Moderator</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 p-2 bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-xl overflow-x-auto no-scrollbar">
          {['All', 'Mathematics', 'Science', 'English', 'History'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${cat === activeTab ? (isTeacher ? 'bg-[#10B981] text-white' : 'bg-[#22819A] text-white') : 'text-[#6B7280] dark:text-slate-400 hover:bg-[#FEF7F8] dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isTeacher && filteredPosts.some(p => p.status === 'Unanswered' && p.upvotes > 15) && (
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4 flex items-start gap-4">
            <AlertCircle className="text-orange-500 dark:text-orange-400 shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-orange-800 dark:text-orange-300">Critical Doubts Detected</p>
              <p className="text-xs text-orange-700 dark:text-orange-400">There are students struggling with complex topics in your current filters.</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-2xl p-6 shadow-custom hover:border-[#90C2E7] dark:hover:border-[#22819A] transition-all relative overflow-hidden group">
              {post.bestAnswer && (
                <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl flex items-center gap-1 shadow-sm z-10">
                  <Star size={10} fill="white" /> {post.status === 'Verified' ? 'EXPERT SOLUTION' : 'BEST ANSWER'}
                </div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
                  <div>
                    <h4 className="font-bold text-[#2C3E50] dark:text-slate-100">{post.author}</h4>
                    <p className="text-[10px] text-[#6B7280] dark:text-slate-500 uppercase tracking-wider">{post.timestamp} • {post.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${post.status === 'Verified' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : post.status === 'Answered' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500'}`}>
                    {post.status === 'Verified' ? <ShieldCheck size={12} /> : <CheckCircle size={12} />}
                    {post.status}
                  </div>
                  
                  {isTeacher && (
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-red-400 dark:text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
              
              <p className="text-[#2C3E50] dark:text-slate-300 font-medium mb-6 leading-relaxed">
                {post.question}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4 border-t border-[#FEF7F8] dark:border-slate-700">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400 hover:text-[#22819A] dark:hover:text-[#90C2E7] font-bold text-xs group/btn">
                    <ThumbsUp size={16} className="group-hover/btn:scale-125 transition-transform" /> {post.upvotes} Upvotes
                  </button>
                  <button className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400 hover:text-[#22819A] dark:hover:text-[#90C2E7] font-bold text-xs group/btn">
                    <MessageCircle size={16} className="group-hover/btn:scale-125 transition-transform" /> {post.replies} Replies
                  </button>
                </div>
                
                <div className="sm:ml-auto flex gap-3">
                  {isTeacher && post.status !== 'Verified' && (
                    <button 
                      onClick={() => handleVerifyPost(post.id)}
                      className="flex items-center gap-1 text-[#10B981] dark:text-[#34D399] font-bold text-xs hover:bg-[#10B981] hover:text-white px-3 py-1.5 rounded-lg border border-[#10B981] dark:border-[#34D399] transition-all"
                    >
                      <CheckCircle2 size={14} /> Resolve
                    </button>
                  )}
                  <Link 
                    to={`/peer/${post.id}`}
                    className={`font-bold text-xs hover:underline ${isTeacher ? 'text-[#10B981] dark:text-[#34D399]' : 'text-[#22819A] dark:text-[#90C2E7]'}`}
                  >
                    Join Discussion
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-2xl p-6 shadow-custom">
          <h3 className={`font-bold mb-4 flex items-center gap-2 ${isTeacher ? 'text-[#10B981] dark:text-[#34D399]' : 'text-[#22819A] dark:text-[#90C2E7]'}`}>
            <Award size={20} /> {isTeacher ? 'Moderation Impact' : 'My Stats'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#FEF7F8] dark:bg-slate-900/50 rounded-xl text-center">
              <p className={`text-2xl font-bold ${isTeacher ? 'text-[#10B981] dark:text-[#34D399]' : 'text-[#22819A] dark:text-[#90C2E7]'}`}>
                {isTeacher ? '124' : '47'}
              </p>
              <p className="text-[10px] font-bold text-[#6B7280] dark:text-slate-500 uppercase">{isTeacher ? 'Resolved' : 'Solved'}</p>
            </div>
            <div className="p-4 bg-[#FEF7F8] dark:bg-slate-900/50 rounded-xl text-center">
              <p className={`text-2xl font-bold ${isTeacher ? 'text-[#10B981] dark:text-[#34D399]' : 'text-[#22819A] dark:text-[#90C2E7]'}`}>
                {isTeacher ? '8.2k' : '152'}
              </p>
              <p className="text-[10px] font-bold text-[#6B7280] dark:text-slate-500 uppercase">{isTeacher ? 'Reach' : 'Helpful'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerLearning;
