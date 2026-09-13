'use client';

import React from 'react';
import { useHealth, ActiveTab } from '@/context/HealthContext';
import {
  LayoutDashboard,
  CheckCircle,
  PenLine,
  Activity,
  SearchCode,
  Sparkles,
  FolderHeart,
  FileText,
  UserCog,
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, baselineStatus } = useHealth();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'check-in', label: 'Quick Check-In', icon: CheckCircle },
    { id: 'journal', label: 'Health Journal', icon: PenLine },
    { id: 'twin', label: 'Digital Twin', icon: Activity },
    { id: 'investigation', label: 'Health Replay™', icon: SearchCode },
    { id: 'insights', label: 'Health Insights', icon: Sparkles },
    { id: 'records', label: 'Health Records', icon: FolderHeart },
    { id: 'brief', label: 'Doctor Brief', icon: FileText },
    { id: 'profile', label: 'Profile & Settings', icon: UserCog },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 bg-white/70 backdrop-blur-md border-r border-[#EAEFEF] h-[calc(100vh-49px)] sticky top-[49px] p-3 justify-between select-none">
      {/* Navigation */}
      <nav className="space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#2F7E79]/10 text-[#2F7E79] font-bold'
                  : 'text-[#708080] hover:text-[#162020] hover:bg-black/[0.02]'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-[#2F7E79]' : 'text-[#8FA0A0]'
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Discrete Bottom Status */}
      <div className="pt-3 border-t border-[#EAEFEF] px-2 flex items-center justify-between text-[11px] text-[#708080]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#679E73]" />
          <span>{baselineStatus.daysCalibrated}d Baseline</span>
        </div>
        <span className="font-semibold text-[#2F7E79]">{baselineStatus.confidencePercentage}%</span>
      </div>
    </aside>
  );
};
