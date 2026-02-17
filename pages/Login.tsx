
import React, { useState } from 'react';
import { UserRole } from '../types';
import { 
  GraduationCap, 
  Users, 
  ArrowRight, 
  Sparkles, 
  ArrowLeft, 
  Phone, 
  Mail, 
  Lock, 
  ChevronRight,
  BrainCircuit,
  ShieldCheck,
  Target,
  Zap,
  Globe,
  BookOpen,
  PieChart,
  Calendar,
  Monitor,
  Heart,
  Lightbulb,
  Shield,
  Star,
  UsersRound,
  Rocket,
  CheckCircle2
} from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleBack = () => {
    setSelectedRole(null);
    setFormData({ identifier: '', password: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF7F8] dark:bg-slate-950 flex flex-col relative overflow-hidden transition-colors duration-500 font-['Poppins']">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#22819A]/5 dark:bg-[#22819A]/10 pointer-events-none -skew-x-12 transform origin-top-right transition-all" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#90C2E7]/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP NAVIGATION */}
      <header className="relative z-50 w-full px-8 py-6 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#22819A] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform group-hover:scale-110">E</div>
          <span className="text-2xl font-black text-[#22819A] dark:text-[#90C2E7] tracking-tighter">EnlightEd</span>
        </div>

        <div className="hidden md:block">
           {!selectedRole ? (
             <div className="flex items-center gap-6">
                <nav className="flex items-center gap-6 mr-8">
                  <a href="#features" className="text-sm font-bold text-[#6B7280] dark:text-slate-400 hover:text-[#22819A] transition-colors">Features</a>
                  <a href="#about" className="text-sm font-bold text-[#6B7280] dark:text-slate-400 hover:text-[#22819A] transition-colors">About</a>
                </nav>
                <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-md border border-[#CDD4DD] dark:border-slate-700 p-1.5 rounded-2xl flex items-center shadow-lg">
                   <button 
                     onClick={() => setSelectedRole(UserRole.STUDENT)}
                     className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2C3E50] dark:text-slate-200 hover:bg-[#FEF7F8] dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                   >
                     <GraduationCap size={16} className="text-[#22819A]" /> Student Login
                   </button>
                   <div className="w-px h-6 bg-[#CDD4DD] dark:bg-slate-700 mx-1"></div>
                   <button 
                     onClick={() => setSelectedRole(UserRole.TEACHER)}
                     className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2C3E50] dark:text-slate-200 hover:bg-[#FEF7F8] dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                   >
                     <Users size={16} className="text-[#10B981]" /> Teacher Login
                   </button>
                </div>
             </div>
           ) : (
             <button 
               onClick={handleBack}
               className="px-4 py-2 bg-white dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-xl text-xs font-bold text-[#22819A] dark:text-[#90C2E7] flex items-center gap-2 hover:shadow-md transition-all"
             >
               <ArrowLeft size={14} /> Back to Site
             </button>
           )}
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative z-10 w-full">
        
        {selectedRole ? (
          /* LOGIN FORM MODE */
          <div className="flex items-center justify-center min-h-[80vh] px-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-[2.5rem] border border-[#CDD4DD] dark:border-slate-700 shadow-2xl p-8 lg:p-10 space-y-8 animate-in zoom-in-95 duration-500">
              <div className="text-center space-y-2">
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg ${selectedRole === UserRole.STUDENT ? 'bg-[#22819A]' : 'bg-[#10B981]'}`}>
                    {selectedRole === UserRole.STUDENT ? <GraduationCap size={32} /> : <Users size={32} />}
                  </div>
                  <h2 className="text-2xl font-bold text-[#2C3E50] dark:text-white">
                    Welcome Back!
                  </h2>
                  <p className="text-sm text-[#6B7280] dark:text-slate-400">
                    Signing in to the <span className="font-bold text-[#22819A]">{selectedRole}</span> portal
                  </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#6B7280] dark:text-slate-500 uppercase tracking-widest ml-1">Identifier</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CDD4DD] group-focus-within:text-[#22819A] transition-colors">
                          {selectedRole === UserRole.STUDENT ? <Phone size={18} /> : <Mail size={18} />}
                        </div>
                        <input 
                          type={selectedRole === UserRole.STUDENT ? "tel" : "email"}
                          required
                          placeholder={selectedRole === UserRole.STUDENT ? "Mobile Number" : "Email Address"}
                          className="w-full bg-[#FEF7F8] dark:bg-slate-900 border-2 border-[#CDD4DD] dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-[#2C3E50] dark:text-white focus:border-[#22819A] outline-none transition-all"
                          value={formData.identifier}
                          onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-[#6B7280] dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CDD4DD] group-focus-within:text-[#22819A] transition-colors">
                          <Lock size={18} />
                        </div>
                        <input 
                          type="password"
                          required
                          placeholder="••••••••"
                          className="w-full bg-[#FEF7F8] dark:bg-slate-900 border-2 border-[#CDD4DD] dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-semibold text-[#2C3E50] dark:text-white focus:border-[#22819A] outline-none transition-all"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className={`
                      w-full py-4 rounded-2xl text-white font-bold shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95
                      ${selectedRole === UserRole.STUDENT ? 'bg-[#22819A] hover:bg-[#1a6b7f]' : 'bg-[#10B981] hover:bg-[#0d9468]'}
                    `}
                  >
                    Enter Dashboard
                    <ChevronRight size={18} />
                  </button>
              </form>
            </div>
          </div>
        ) : (
          /* FULL LANDING PAGE MODE */
          <div className="flex flex-col items-center">
            {/* HERO SECTION */}
            <section className="min-h-[85vh] flex flex-col items-center justify-center text-center space-y-16 py-20 px-6 max-w-7xl mx-auto w-full animate-in fade-in duration-1000">
              <div className="space-y-6 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#22819A]/10 dark:bg-white/5 border border-[#22819A]/20 rounded-full mb-2">
                  <Sparkles size={14} className="text-[#22819A]" />
                  <span className="text-[10px] font-bold text-[#22819A] dark:text-[#90C2E7] uppercase tracking-widest">EnlightEd Platform v2.5</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-bold text-[#2C3E50] dark:text-white tracking-tight leading-[1.1]">
                  Empowering exceptional minds today,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22819A] to-[#90C2E7]">shaping a smarter future tomorrow.</span>
                </h1>
                <p className="text-base md:text-xl text-[#6B7280] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  The most advanced AI-powered academic companion for CBSE & ICSE students. Personalized doubt solving, adaptive learning paths, and total visibility for parents.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                   <button onClick={() => setSelectedRole(UserRole.STUDENT)} className="w-full sm:w-auto px-10 py-4 bg-[#22819A] text-white rounded-2xl font-bold shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      Get Started <ArrowRight size={20} />
                   </button>
                   <a href="#about" className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-800 text-[#2C3E50] dark:text-white border border-[#CDD4DD] dark:border-slate-700 rounded-2xl font-bold shadow-sm hover:bg-[#FEF7F8] dark:hover:bg-slate-700 transition-all">
                      Our Vision
                   </a>
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 scroll-mt-24">
                <LandingCard 
                  icon={<BrainCircuit className="text-[#22819A]" />}
                  title="AI Doubt Assistant"
                  desc="Instant, high-quality solutions to any academic problem, available 24/7."
                />
                <LandingCard 
                  icon={<Zap className="text-orange-500" />}
                  title="Sunday AI Quizzes"
                  desc="Personalized assessments generated based on your weekly weak spots."
                />
                <LandingCard 
                  icon={<ShieldCheck className="text-green-500" />}
                  title="Parent Monitoring"
                  desc="Real-time engagement tracking and performance analytics for families."
                />
              </div>
            </section>

            {/* ABOUT SECTION - THE LEGACY & TEAM */}
            <section id="about" className="w-full bg-white dark:bg-slate-900/50 py-24 px-6 border-y border-[#CDD4DD] dark:border-slate-800 scroll-mt-24 relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-100/30 dark:bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
               
               <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center space-y-4 mb-20">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FEF7F8] dark:bg-slate-800 border border-[#CDD4DD] dark:border-slate-700 rounded-full">
                        <Heart size={14} className="text-[#22819A]" />
                        <span className="text-[10px] font-bold text-[#6B7280] dark:text-slate-400 uppercase tracking-widest">About EnlightEd</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-bold text-[#2C3E50] dark:text-white leading-tight">
                        Built by Educators, <br />
                        <span className="text-[#22819A]">Powered by AI.</span>
                     </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                     <div className="space-y-10">
                        <div className="space-y-6">
                           <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">Our Motto</h3>
                           <p className="text-xl md:text-2xl text-[#22819A] font-semibold italic border-l-4 border-[#22819A] pl-6 leading-relaxed">
                              "Empowering exceptional minds today, shaping a smarter future tomorrow."
                           </p>
                           <p className="text-lg text-[#6B7280] dark:text-slate-400 leading-relaxed">
                              EnlightEd isn't just a platform; it's a movement to democratize the quality of education previously reserved for the elite. We believe every student deserves a personalized tutor that understands their cognitive pace.
                           </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                           <div className="p-8 bg-[#FEF7F8] dark:bg-slate-800 rounded-[2.5rem] border border-transparent hover:border-[#22819A]/20 transition-all shadow-sm">
                              <Rocket size={32} className="text-[#22819A] mb-4" />
                              <h4 className="font-bold text-[#2C3E50] dark:text-white mb-2">The Mission</h4>
                              <p className="text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed">Scaling quality pedagogy using the latest in Large Language Models.</p>
                           </div>
                           <div className="p-8 bg-[#FEF7F8] dark:bg-slate-800 rounded-[2.5rem] border border-transparent hover:border-[#90C2E7]/20 transition-all shadow-sm">
                              <UsersRound size={32} className="text-[#90C2E7] mb-4" />
                              <h4 className="font-bold text-[#2C3E50] dark:text-white mb-2">The Community</h4>
                              <p className="text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed">Connecting 15,000+ students with elite mentors from top institutions.</p>
                           </div>
                        </div>
                     </div>

                     <div className="relative">
                        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[3.5rem] border border-[#CDD4DD] dark:border-slate-700 shadow-2xl space-y-10">
                           <div className="text-center space-y-2">
                              <div className="flex justify-center -space-x-4 mb-4">
                                 {['/team-photos/Vaibhav.jpeg', '/team-photos/Drashti.jpeg', '/team-photos/Kavya%20S.jpeg'].map((src, i) => (
                                    <img key={i} src={src} alt="Team" className="w-16 h-16 rounded-2xl border-4 border-white dark:border-slate-800 shadow-xl object-cover" />
                                 ))}
                              </div>
                              <h3 className="text-2xl font-bold text-[#2C3E50] dark:text-white">Meet the Visionaries</h3>
                              <p className="text-xs text-[#6B7280] dark:text-slate-500 uppercase tracking-widest font-bold">The Minds Behind the Code</p>
                           </div>
                           
                           <div className="space-y-8">
                              <TeamMember 
                                 name="Vaibhav Kumar" 
                                 role="Founder" 
                                 desc="4th year BTech CSE student and Foundation Level student at IIT Madras"
                                 img="/team-photos/Vaibhav.jpeg"
                              />
                              <TeamMember 
                                 name="Purnesh Agarwal" 
                                 role="Co-founder" 
                                 desc="Standalone Diploma Level student at IIT Madras"
                                 img="https://i.pravatar.cc/150?u=purnesh"
                              />
                            
                              <TeamMember 
                                 name="Drashti Shah" 
                                 role="Technical Lead" 
                                 desc="Standalone Final Year student at IIT Madras"
                                 img="/team-photos/Drashti.jpeg"
                              />
                              <TeamMember 
                                 name="Kavya S" 
                                 role="Operations Lead" 
                                 desc="Standalone Diploma Level student at IIT Madras"
                                 img="/team-photos/Kavya%20S.jpeg"
                              />
                           </div>

                           <div className="pt-8 border-t border-[#CDD4DD] dark:border-slate-700 flex flex-wrap items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
                              <span className="text-[10px] font-black tracking-tighter">IIT MADRAS FOUNDATION</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* TRUST INDICATORS */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80 px-4 py-20">
               <div className="flex items-center gap-2 text-sm font-bold text-[#2C3E50] dark:text-slate-300 transition-transform hover:scale-110">
                  <BookOpen size={22} className="text-[#22819A]" /> CBSE Curriculum
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-[#2C3E50] dark:text-slate-300 transition-transform hover:scale-110">
                  <PieChart size={22} className="text-[#22819A]" /> ICSE Curriculum
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-[#2C3E50] dark:text-slate-300 transition-transform hover:scale-110">
                  <Calendar size={22} className="text-[#22819A]" /> Daily Schedule
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-[#2C3E50] dark:text-slate-300 transition-transform hover:scale-110">
                  <Monitor size={22} className="text-[#22819A]" /> Multi-device Sync
               </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full px-8 py-10 max-w-7xl mx-auto border-t border-[#CDD4DD] dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img key={i} src={`https://i.pravatar.cc/100?u=student${i}`} alt="" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
            ))}
          </div>
          <p className="text-xs font-medium text-[#6B7280] dark:text-slate-500">
            Join <span className="text-[#22819A] font-bold">15,000+</span> exceptional minds growing with EnlightEd.
          </p>
        </div>
        <div className="text-[10px] font-bold text-[#6B7280] dark:text-slate-600 uppercase tracking-widest">
          &copy; 2024 EnlightEd Ltd. • All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

const LandingCard: React.FC<{ icon: any, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white dark:bg-slate-800/50 p-8 rounded-[3rem] border border-[#CDD4DD] dark:border-slate-700 shadow-custom hover:shadow-xl hover:-translate-y-1 transition-all text-left space-y-4 group">
    <div className="w-14 h-14 bg-[#FEF7F8] dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-[#2C3E50] dark:text-slate-100">{title}</h3>
      <p className="text-sm text-[#6B7280] dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
    <div className="pt-2">
       <button className="text-xs font-bold text-[#22819A] flex items-center gap-1 hover:gap-3 transition-all">
          Explore <ChevronRight size={14} />
       </button>
    </div>
  </div>
);

const TeamMember: React.FC<{ name: string, role: string, desc: string, img: string }> = ({ name, role, desc, img }) => (
  <div className="flex gap-4 p-4 rounded-3xl hover:bg-[#FEF7F8] dark:hover:bg-slate-700/50 transition-all border border-transparent hover:border-[#CDD4DD] dark:hover:border-slate-700">
    <img src={img} alt={name} className="w-12 h-12 rounded-2xl border border-[#CDD4DD] dark:border-slate-600 object-cover" />
    <div>
      <h4 className="font-bold text-sm text-[#2C3E50] dark:text-white">{name}</h4>
      <p className="text-[10px] font-bold text-[#22819A] uppercase tracking-widest mb-1">{role}</p>
      <p className="text-[11px] text-[#6B7280] dark:text-slate-500 leading-snug">{desc}</p>
    </div>
  </div>
);

export default Login;
