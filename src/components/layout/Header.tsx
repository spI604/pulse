'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { DemoModeToggle } from '@/components/ui/DemoModeToggle';
import {
  Search,
  ShieldAlert,
  Bell,
  HeartPulse,
  User,
  CheckCircle2,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { userProfile, baselineStatus, setIsEmergencyModalOpen, setActiveTab } = useHealth();
  const [searchQuery, setSearchQuery] = useState('');

  const todayDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('records');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F7F8F7]/80 backdrop-blur-md border-b border-[#E2EAE8] px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Brand / Contextual Date */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#2F7E79] flex items-center justify-center text-white shadow-xs group-hover:bg-[#266864] transition-colors">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-[#1F2A2A] block leading-none">
              PULSE
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5F8F8B] block mt-0.5">
              Health Intelligence
            </span>
          </div>
        </div>

        <div className="hidden lg:block h-5 w-px bg-[#E2EAE8] mx-2" />

        <span className="hidden lg:block text-xs font-medium text-[#6C7A7A]">
          {todayDate}
        </span>
      </div>

      {/* Middle: Calm Universal Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-2">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 text-[#6C7A7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, vitals, medications, or patterns..."
            className="w-full bg-white border border-[#E2EAE8] hover:border-[#8FB5AF] focus:border-[#2F7E79] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1F2A2A] placeholder-[#6C7A7A] focus:outline-hidden shadow-xs transition-colors"
          />
        </form>
      </div>

      {/* Right Actions: Demo Switcher, Emergency Profile, Avatar */}
      <div className="flex items-center gap-2.5">
        <DemoModeToggle />

        {/* 1-Click Emergency Profile Trigger */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="touch-target inline-flex items-center gap-1.5 bg-[#FFF0F0] hover:bg-[#FDE2E2] border border-[#D97A7A]/30 text-[#D97A7A] hover:text-[#C55F5F] px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all duration-150"
          title="Open One-Click Emergency Medical Card"
        >
          <ShieldAlert className="w-4 h-4" />
          <span className="hidden sm:inline">Emergency</span>
        </button>

        {/* User Status / Avatar */}
        <button
          onClick={() => setActiveTab('profile')}
          className="touch-target flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-white border border-transparent hover:border-[#E2EAE8] transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-[#EEF3F2] border border-[#8FB5AF] text-[#2F7E79] flex items-center justify-center font-medium text-xs">
            {userProfile.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div className="hidden xl:block text-left">
            <span className="text-xs font-medium text-[#1F2A2A] block leading-none">
              {userProfile.name}
            </span>
            <span className="text-[10px] text-[#5F8F8B] block mt-0.5">
              {baselineStatus.isCalibrated ? 'Baseline Active' : 'Calibrating'}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
