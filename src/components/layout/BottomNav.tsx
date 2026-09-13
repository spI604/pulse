'use client';

import React from 'react';
import { useHealth, ActiveTab } from '@/context/HealthContext';
import {
  LayoutDashboard,
  CheckCircle,
  PenLine,
  SearchCode,
  User,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useHealth();

  const mobileTabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'check-in', label: 'Check-In', icon: CheckCircle },
    { id: 'journal', label: 'Journal', icon: PenLine },
    { id: 'investigation', label: 'Replay', icon: SearchCode },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E2EAE8] px-2 py-1 pb-[max(0.35rem,env(safe-area-inset-bottom))] shadow-[0_-2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 min-h-[48px] rounded-xl transition-all ${
                isActive ? 'text-[#2F7E79]' : 'text-[#6C7A7A] hover:text-[#1F2A2A]'
              }`}
            >
              <div
                className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-[#EEF3F2]' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#2F7E79]" />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-semibold text-[#2F7E79]' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
