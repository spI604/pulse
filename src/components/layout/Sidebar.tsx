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
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, baselineStatus, demoMode } = useHealth();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'check-in', label: 'Quick Check-In', icon: CheckCircle, badge: '30s' },
    { id: 'journal', label: 'AI Health Journal', icon: PenLine },
    { id: 'twin', label: 'Digital Twin', icon: Activity },
    {
      id: 'investigation',
      label: 'Investigation',
      icon: SearchCode,
      badge: 'Replay™',
      badgeColor: 'bg-[#EEF3F2] text-[#2F7E79]',
    },
    { id: 'insights', label: 'Health Insights', icon: Sparkles },
    { id: 'records', label: 'Health Records', icon: FolderHeart },
    { id: 'brief', label: 'Doctor Brief', icon: FileText },
    { id: 'profile', label: 'Profile & Settings', icon: UserCog },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E2EAE8] h-[calc(100vh-57px)] sticky top-[57px] p-4 justify-between select-none">
      {/* Navigation list */}
      <nav className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#6C7A7A]">
          Health Intelligence
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full touch-target flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#EEF3F2] text-[#2F7E79] font-semibold shadow-xs'
                  : 'text-[#6C7A7A] hover:text-[#1F2A2A] hover:bg-[#F7F8F7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#2F7E79]' : 'text-[#6C7A7A]'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.badgeColor || (isActive ? 'bg-[#2F7E79] text-white' : 'bg-[#EEF3F2] text-[#5F8F8B]')
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Reassuring Baseline Health Status Pill */}
      <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-2xl p-3.5 mt-4">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldCheck className="w-4 h-4 text-[#2F7E79]" />
          <span className="text-xs font-semibold text-[#1F2A2A]">Personal Baseline</span>
        </div>

        <div className="flex items-baseline justify-between text-xs text-[#6C7A7A] mb-1">
          <span>{baselineStatus.isCalibrated ? `${baselineStatus.daysCalibrated} Days Calibrated` : 'Baseline Forming'}</span>
          <span className="font-semibold text-[#2F7E79]">{baselineStatus.confidencePercentage}%</span>
        </div>

        <div className="w-full bg-[#EEF3F2] h-1.5 rounded-full overflow-hidden mb-2">
          <div
            className="bg-[#2F7E79] h-full rounded-full transition-all duration-500"
            style={{ width: `${baselineStatus.confidencePercentage}%` }}
          />
        </div>

        <p className="text-[11px] text-[#6C7A7A] leading-relaxed italic">
          &quot;A quiet companion watching over you.&quot;
        </p>
      </div>
    </aside>
  );
};
