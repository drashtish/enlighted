
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ThumbsUp, 
  MessageCircle, 
  ShieldCheck, 
  Trash2, 
  Send, 
  CheckCircle2, 
  User,
  MoreVertical,
  Flag,
  Share2
} from 'lucide-react';
import { UserRole, PeerPost, PeerReply } from '../types';

interface PeerDiscussionDetailProps {
  userRole?: UserRole;
}

const PeerDiscussionDetail: React.FC<PeerDiscussionDetailProps> = ({ userRole = UserRole.STUDENT }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isTeacher = userRole === UserRole.TEACHER;

  // Mock fetching logic based on ID
  const [post, setPost] = useState<PeerPost>({
    id: '1',
    author: 'Priya S.',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    subject: 'Mathematics',
    question: 'Can someone explain why we use the discriminant method in quadratic equations? Is it faster than factorization?',
    timestamp: '2 hours ago',
    upvotes: 12,
    replies: 4,
    status: 'Verified',
    bestAnswer: true,
    repliesList: [
      {
        id: 'r1',
        author: 'Arjun M.',
        avatar: 'https://i.pravatar.cc/150?u=arjun',
        text: 'Factorization only works if the roots are rational and easy to spot. The discriminant helps you know if roots even exist (Real vs Imaginary) before you waste time!',
        timestamp: '1 hour ago',
        isTeacher: false
      },
      {
        id: 'r2',
        author: 'Mr. Rajesh Kumar',
        avatar: 'https://i.pravatar.cc/150?u=teacher',
        text: 'Exactly as Arjun mentioned. The Discriminant (D = b² - 4ac) is the gatekeeper. If D < 0, you stop right there for real numbers. It is a universal method that works even when factorization is impossible.',
        timestamp: '30 mins ago',
        isTeacher: true,
        isVerified: true
      }
    ]
  });

  const [newReply, setNewReply] = useState('');

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    const reply: PeerReply = {
      id: Math.random().toString(),
      author: isTeacher ? 'Mr. Rajesh Kumar' : 'Rahul K.',
      avatar: isTeacher ? 'https://i.pravatar.cc/150?u=teacher' : 'https://picsum.photos/40/40',
      text: newReply,
      timestamp: 'Just now',
      isTeacher: isTeacher,
      isVerified: false
    };

    setPost(prev => ({
      ...prev,
      repliesList: [...(prev.repliesList || []), reply],
      replies: prev.replies + 1
    }));
    setNewReply('');
  };

  const handleDeleteReply = (replyId: string) => {
    if (window.confirm('Delete this message? Students will be notified of the moderation action.')) {
      setPost(prev => ({
        ...prev,
        repliesList: prev.repliesList?.filter(r => r.id !== replyId),
        replies: prev.replies - 1
      }));
    }
  };

  const handleVerifyReply = (replyId: string) => {
    setPost(prev => ({
      ...prev,
      repliesList: prev.repliesList?.map(r => 
        r.id === replyId ? { ...r, isVerified: !r.isVerified } : r
      )
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/peer')}
          className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400 font-bold text-sm hover:text-[#22819A] dark:hover:text-[#90C2E7] transition-colors"
        >
          <ArrowLeft size={20} /> Back to Peer Learning
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#6B7280] dark:text-slate-400 hover:bg-white dark:hover:bg-white/5 rounded-xl border border-transparent hover:border-[#CDD4DD] dark:hover:border-white/10">
            <Share2 size={18} />
          </button>
          <button className="p-2 text-[#6B7280] dark:text-slate-400 hover:bg-white dark:hover:bg-white/5 rounded-xl border border-transparent hover:border-[#CDD4DD] dark:hover:border-white/10">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Original Question Card */}
      <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl border border-[#CDD4DD] dark:border-white/10 shadow-custom p-8 md:p-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={post.avatar} alt="" className="w-12 h-12 rounded-2xl border-2 border-[#FEF7F8] dark:border-white/10 shadow-sm" />
            <div>
              <h1 className="text-xl font-bold text-[#2C3E50] dark:text-slate-100">{post.author}</h1>
              <p className="text-xs text-[#6B7280] dark:text-slate-500 font-medium uppercase tracking-widest">{post.timestamp} • {post.subject}</p>
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-2 ${post.status === 'Verified' ? 'bg-green-100 dark:bg-green-950/20 text-green-600 dark:text-green-400' : 'bg-gray-100 dark:bg-white/5 text-[#6B7280] dark:text-slate-400'}`}>
            {post.status === 'Verified' ? <ShieldCheck size={14} /> : <CheckCircle2 size={14} />}
            {post.status.toUpperCase()}
          </div>
        </div>

        <p className="text-xl font-medium text-[#2C3E50] dark:text-slate-200 leading-relaxed">
          {post.question}
        </p>

        <div className="flex items-center gap-6 pt-4 border-t border-[#FEF7F8] dark:border-white/10">
          <button className="flex items-center gap-2 text-[#22819A] dark:text-[#90C2E7] font-bold text-sm">
            <ThumbsUp size={18} /> {post.upvotes} Helpful
          </button>
          <div className="flex items-center gap-2 text-[#6B7280] dark:text-slate-400 font-bold text-sm">
            <MessageCircle size={18} /> {post.replies} Responses
          </div>
        </div>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#2C3E50] dark:text-slate-200 px-2 flex items-center gap-2">
          Discussion Thread <div className="h-0.5 flex-1 bg-[#CDD4DD]/30 dark:bg-white/10"></div>
        </h3>

        <div className="space-y-4">
          {post.repliesList?.map((reply) => (
            <div 
              key={reply.id} 
              className={`
                p-6 rounded-3xl border animate-in slide-in-from-left-2 transition-all relative group
                ${reply.isTeacher 
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-100 dark:border-emerald-900/40 ml-4 md:ml-12' 
                  : 'bg-white dark:bg-[#0a0a0a] border-[#CDD4DD] dark:border-white/10'}
                ${reply.isVerified ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/10 dark:ring-emerald-500/5' : ''}
              `}
            >
              {reply.isVerified && (
                <div className="absolute -top-3 right-6 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <ShieldCheck size={12} /> VERIFIED EXPERT SOLUTION
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img src={reply.avatar} alt="" className="w-8 h-8 rounded-xl" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#2C3E50] dark:text-slate-100">{reply.author}</span>
                      {reply.isTeacher && (
                        <span className="bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">Educator</span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#6B7280] dark:text-slate-500">{reply.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {isTeacher && (
                    <>
                      <button 
                        onClick={() => handleVerifyReply(reply.id)}
                        className={`p-2 rounded-lg transition-colors ${reply.isVerified ? 'text-emerald-500 bg-emerald-100 dark:bg-emerald-950/30' : 'text-[#6B7280] dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-white/5 hover:text-emerald-500'}`}
                        title="Mark as Verified Solution"
                      >
                        <ShieldCheck size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteReply(reply.id)}
                        className="p-2 text-red-400 dark:text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                        title="Delete this reply"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                  {!isTeacher && !reply.isTeacher && (
                    <button className="p-2 text-[#6B7280] dark:text-slate-400 hover:text-[#22819A] dark:hover:text-[#90C2E7]">
                      <Flag size={18} />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#2C3E50] dark:text-slate-300 leading-relaxed font-medium">
                {reply.text}
              </p>

              <div className="mt-3 flex items-center gap-4">
                <button className="text-[10px] font-bold text-[#6B7280] dark:text-slate-500 hover:text-[#22819A] dark:hover:text-[#90C2E7] flex items-center gap-1">
                  <ThumbsUp size={12} /> Helpful
                </button>
                <button className="text-[10px] font-bold text-[#6B7280] dark:text-slate-500 hover:text-[#22819A] dark:hover:text-[#90C2E7]">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reply Input Bar */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white dark:bg-black border-t border-[#CDD4DD] dark:border-white/10 p-4 md:p-6 z-40">
        <form onSubmit={handleSendReply} className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="relative flex-1">
            <textarea 
              rows={1}
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder={isTeacher ? "Post an official expert solution..." : "Contribute to the discussion..."}
              className={`
                w-full bg-[#FEF7F8] dark:bg-white/5 border-2 border-[#CDD4DD] dark:border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm font-medium outline-none transition-all resize-none dark:text-slate-200
                ${isTeacher ? 'focus:border-emerald-500' : 'focus:border-[#22819A]'}
              `}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendReply(e);
                }
              }}
            />
            <button 
              type="submit"
              className={`
                absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-white shadow-md transition-all
                ${isTeacher ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-[#22819A] hover:bg-[#1a6b7f]'}
              `}
            >
              <Send size={18} />
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-white/10 shadow-sm overflow-hidden">
               <img src={isTeacher ? "https://i.pravatar.cc/150?u=teacher" : "https://picsum.photos/40/40"} alt="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PeerDiscussionDetail;
