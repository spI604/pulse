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
  ShieldCheck,
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ElementType;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, baselineStatus, userProfile } = useHealth();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'check-in', label: 'Daily Check-In', icon: CheckCircle },
    { id: 'journal', label: 'Health Journal', icon: PenLine },
    { id: 'twin', label: 'Digital Twin', icon: Activity },
    { id: 'investigation', label: 'Health Replay™', icon: SearchCode },
    { id: 'insights', label: 'Health Insights', icon: Sparkles },
    { id: 'records', label: 'Health Records', icon: FolderHeart },
    { id: 'brief', label: 'Doctor Brief', icon: FileText },
    { id: 'profile', label: 'Profile & Settings', icon: UserCog },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 bg-[#F5F5F7]/70 backdrop-blur-2xl border-r border-[#E5E5EA] h-[calc(100vh-53px)] sticky top-[53px] p-3 justify-between select-none">
      {/* Navigation */}
      <div className="space-y-4">
        <div className="px-3 pt-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#86868B]">
            Intelligence
          </span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1D7A74] text-white font-medium shadow-[0_2px_8px_rgba(29,122,116,0.22)]'
                    : 'text-[#48484A] hover:text-[#1D1D1F] hover:bg-black/[0.04]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-[#86868B]'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Discrete Bottom Profile & Calibration Card */}
      <div className="pt-3 border-t border-[#E5E5EA]/80 px-1">
        <div className="bg-white/80 border border-black/[0.04] rounded-2xl p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#1D7A74]/10 text-[#1D7A74] font-bold text-xs flex items-center justify-center shrink-0">
              KS
            </div>
            <div className="text-left leading-tight">
              <span className="text-xs font-semibold text-[#1D1D1F] block truncate max-w-[95px]">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-[#86868B]">
                B+ • 32y
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-[#34C759]/10 text-[#28A745] px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse" />
            <span>{baselineStatus.daysCalibrated}d</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

