
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Bell, 
  Flame, 
  ChevronDown, 
  User, 
  LogOut, 
  Search, 
  GraduationCap, 
  ShieldCheck,
  RefreshCw,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NAV_ITEMS, PARENT_NAV_ITEMS, TEACHER_NAV_ITEMS } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  onLogout: () => void;
  onChangeRole: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, onLogout, onChangeRole }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Check if user previously collapsed the sidebar
    const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    setIsCollapsed(collapsed);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const toggleSidebarCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  const getNavItems = () => {
    switch (userRole) {
      case UserRole.PARENT: return PARENT_NAV_ITEMS;
      case UserRole.TEACHER: return TEACHER_NAV_ITEMS;
      default: return NAV_ITEMS;
    }
  };

  const currentNav = getNavItems();

  const getRoleLabel = () => {
    switch (userRole) {
      case UserRole.PARENT: return 'Parent Portal';
      case UserRole.TEACHER: return 'Teacher Portal';
      default: return 'Student Portal';
    }
  };

  const handleToggleMode = () => {
    if (userRole === UserRole.STUDENT) {
      onChangeRole(UserRole.PARENT);
      navigate('/');
    } else if (userRole === UserRole.PARENT) {
      onChangeRole(UserRole.STUDENT);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#FEF7F8] dark:bg-slate-950 transition-colors duration-300 font-['Poppins']">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-[#CDD4DD] dark:border-slate-800 transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
        ${!isSidebarOpen && isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className={`p-6 flex items-center justify-between ${isCollapsed && !isSidebarOpen ? 'flex-col gap-4' : ''}`}>
            <Link to="/" className="text-2xl font-bold text-[#22819A] dark:text-[#90C2E7] flex items-center gap-2">
              <div className="w-8 h-8 bg-primary dark:bg-secondary rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-black shrink-0">E</div>
              <span className={`transition-all duration-300 overflow-hidden ${isCollapsed && !isSidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                EnlightEd
              </span>
            </Link>
            
            <div className="flex items-center">
               <button 
                  className="hidden md:flex p-1.5 rounded-lg hover:bg-[#FEF7F8] dark:hover:bg-slate-800 text-[#6B7280] dark:text-slate-400"
                  onClick={toggleSidebarCollapse}
                  title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
                <button className="md:hidden dark:text-slate-400" onClick={() => setSidebarOpen(false)}>
                  <X size={24} />
                </button>
            </div>
          </div>

          <nav className="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
            <div className={`mb-4 px-2 py-1 text-[10px] font-bold text-[#6B7280] dark:text-slate-500 uppercase tracking-widest transition-opacity duration-300 ${isCollapsed && !isSidebarOpen ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              {getRoleLabel()}
            </div>
            {currentNav.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                title={isCollapsed && !isSidebarOpen ? item.label : undefined}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all group
                  ${location.pathname === item.path 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-[#6B7280] dark:text-slate-400 hover:bg-[#FEF7F8] dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-[#90C2E7]'}
                  ${isCollapsed && !isSidebarOpen ? 'justify-center px-0' : ''}
                `}
              >
                <div className={`shrink-0 transition-transform group-hover:scale-110`}>
                   {item.icon}
                </div>
                <span className={`font-semibold text-sm transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed && !isSidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-[#CDD4DD] dark:border-slate-800 space-y-3">
            {(userRole === UserRole.STUDENT || userRole === UserRole.PARENT) && (
              <button 
                onClick={handleToggleMode}
                title={isCollapsed && !isSidebarOpen ? (userRole === UserRole.STUDENT ? 'Switch to Parents' : 'Switch to Student') : undefined}
                className={`
                  w-full flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all group relative overflow-hidden
                  ${userRole === UserRole.STUDENT 
                    ? 'bg-white dark:bg-slate-900 border-primary text-primary dark:text-[#90C2E7] hover:bg-primary/5' 
                    : 'bg-white dark:bg-slate-900 border-secondary text-primary dark:text-[#90C2E7] hover:bg-secondary/5'}
                  ${isCollapsed && !isSidebarOpen ? 'p-2' : ''}
                `}
              >
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-tight">
                  {userRole === UserRole.STUDENT ? <ShieldCheck size={16} /> : <GraduationCap size={16} />}
                  <span className={`transition-all duration-300 overflow-hidden ${isCollapsed && !isSidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    {userRole === UserRole.STUDENT ? 'Switch to Parents' : 'Switch to Student'}
                  </span>
                </div>
                <div className={`text-[9px] font-medium opacity-60 flex items-center gap-1 transition-all duration-300 ${isCollapsed && !isSidebarOpen ? 'h-0 opacity-0' : ''}`}>
                  <RefreshCw size={10} className="group-hover:rotate-180 transition-transform duration-500" />
                  Toggle Dashboard
                </div>
              </button>
            )}

            <button 
              onClick={onLogout}
              title={isCollapsed && !isSidebarOpen ? "Logout" : undefined}
              className={`
                w-full flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 rounded-xl font-bold hover:bg-red-100 transition-all
                ${isCollapsed && !isSidebarOpen ? 'p-3' : ''}
              `}
            >
              <LogOut size={18} /> 
              <span className={`transition-all duration-300 overflow-hidden ${isCollapsed && !isSidebarOpen ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-1'}`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-[#CDD4DD] dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-30 shadow-sm transition-all duration-300">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden dark:text-slate-400" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-[#FEF7F8] dark:bg-slate-950 px-4 py-2 rounded-full w-full max-w-md border border-[#CDD4DD] dark:border-slate-800 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search size={18} className="text-[#6B7280] dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search resources, students, or batches..." 
                className="bg-transparent border-none outline-none w-full text-sm dark:text-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={toggleDarkMode}
              className="p-2.5 bg-[#FEF7F8] dark:bg-slate-950 rounded-xl text-slate-600 dark:text-slate-400 border border-[#CDD4DD] dark:border-slate-800 hover:text-primary transition-all shadow-sm"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {userRole === UserRole.STUDENT && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-full shadow-sm">
                <Flame size={18} fill="currentColor" />
                <span className="font-bold text-sm">7</span>
              </div>
            )}

            <div className="relative">
              <button 
                className="flex items-center gap-2 hover:opacity-80 transition-opacity bg-[#FEF7F8] dark:bg-slate-950 p-1 pr-3 rounded-2xl border border-[#CDD4DD] dark:border-slate-800"
                onClick={() => setProfileOpen(!isProfileOpen)}
              >
                <img 
                  src={userRole === UserRole.TEACHER ? "https://i.pravatar.cc/150?u=teacher" : "https://picsum.photos/40/40"} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-xl border-2 border-primary dark:border-secondary shadow-sm"
                />
                <ChevronDown size={16} className="text-[#6B7280] dark:text-slate-500" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-[#CDD4DD] dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-[#CDD4DD] dark:border-slate-800 mb-2">
                    <p className="text-sm font-semibold truncate dark:text-slate-200">Rahul Kumar</p>
                    <p className="text-xs text-[#6B7280] dark:text-slate-500">{getRoleLabel()}</p>
                  </div>
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-[#2C3E50] dark:text-slate-300 hover:bg-[#FEF7F8] dark:hover:bg-slate-800" onClick={() => setProfileOpen(false)}>
                    <User size={16} /> Profile
                  </Link>
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Layout;
