
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  Brain, 
  PieChart, 
  Calendar, 
  Users, 
  FileText, 
  Settings,
  ShieldCheck,
  GraduationCap,
  MessageSquare,
  UsersRound,
  ShieldAlert
} from 'lucide-react';

export const COLORS = {
  primary: '#22819A',
  secondary: '#90C2E7',
  background: '#FEF7F8',
  gray: '#CDD4DD',
  text: '#2C3E50',
  caption: '#6B7280'
};

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { id: 'batches', label: 'My Batches', icon: <BookOpen size={20} />, path: '/batches' },
  { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={20} />, path: '/assignments' },
  { id: 'doubts', label: 'AI Doubt Assistant', icon: <Brain size={20} />, path: '/doubts' },
  { id: 'performance', label: 'Performance', icon: <PieChart size={20} />, path: '/performance' },
  { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} />, path: '/schedule' },
  { id: 'peer', label: 'Peer Learning', icon: <Users size={20} />, path: '/peer' },
  { id: 'notes', label: 'Revision Notes', icon: <FileText size={20} />, path: '/notes' },
];

export const PARENT_NAV_ITEMS = [
  { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} />, path: '/' },
  { id: 'monitoring', label: 'Academic Progress', icon: <ShieldCheck size={20} />, path: '/monitoring' },
  { id: 'performance', label: 'Performance Analytics', icon: <PieChart size={20} />, path: '/performance' },
  { id: 'schedule', label: 'Schedule', icon: <Calendar size={20} />, path: '/schedule' },
];

export const TEACHER_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
  { id: 'batches', label: 'Manage Batches', icon: <BookOpen size={20} />, path: '/batches' },
  { id: 'peer', label: 'Peer Learning Moderation', icon: <UsersRound size={20} />, path: '/peer' },
  { id: 'assignments', label: 'Grading & Submissions', icon: <ClipboardList size={20} />, path: '/assignments' },
  { id: 'schedule', label: 'Academic Schedule', icon: <Calendar size={20} />, path: '/schedule' },
  { id: 'doubts', label: 'Resolved Doubts', icon: <MessageSquare size={20} />, path: '/doubts' },
];
