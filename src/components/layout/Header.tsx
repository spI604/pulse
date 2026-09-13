'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { Search, ShieldAlert, HeartPulse } from 'lucide-react';

export const Header: React.FC = () => {
  const { userProfile, demoMode, setDemoMode, setIsEmergencyModalOpen, setActiveTab } =
    useHealth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('records');
    }
  };

  return (
    <header className="sticky top-0 z-30 apple-glass px-4 md:px-8 py-2.5 flex items-center justify-between gap-4 select-none">
      {/* Left: Clean Brand */}
      <div
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center gap-2.5 cursor-pointer select-none group"
      >
        <div className="w-7 h-7 rounded-xl bg-[#1D7A74] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
          <HeartPulse className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold tracking-tight text-[#1D1D1F]">
          PULSE
        </span>
      </div>

      {/* Middle: Clean Minimal Search */}
      <div className="hidden md:flex flex-1 max-w-sm mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-3.5 h-3.5 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, vitals, records..."
            className="w-full bg-black/[0.04] hover:bg-black/[0.06] focus:bg-white border border-transparent focus:border-[#1D7A74]/30 rounded-full pl-8 pr-3 py-1.5 text-xs text-[#1D1D1F] placeholder-[#86868B] focus:outline-hidden transition-all shadow-2xs"
          />
        </form>
      </div>

      {/* Right: Minimal Actions */}
      <div className="flex items-center gap-2">
        {/* Apple Segmented Demo Mode Switcher */}
        <div className="flex items-center bg-black/[0.05] p-0.5 rounded-full text-[11px] font-medium text-[#86868B]">
          <button
            onClick={() => setDemoMode('calibrated')}
            className={`px-3 py-1 rounded-full transition-all ${
              demoMode === 'calibrated'
                ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                : 'hover:text-[#1D1D1F]'
            }`}
          >
            94d Calibrated
          </button>
          <button
            onClick={() => setDemoMode('empty')}
            className={`px-3 py-1 rounded-full transition-all ${
              demoMode === 'empty'
                ? 'bg-white text-[#1D1D1F] font-semibold shadow-xs'
                : 'hover:text-[#1D1D1F]'
            }`}
          >
            Fresh (0d)
          </button>
        </div>

        {/* Emergency SOS Trigger with Pulsing Beacon */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="touch-target inline-flex items-center gap-1.5 bg-[#FFF2F2] hover:bg-[#FFE5E5] border border-[#FF3B30]/30 text-[#FF3B30] px-3.5 py-1 rounded-full text-xs font-bold transition-all shadow-xs"
          title="Emergency Medical Card & Accident Info"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B30] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3B30]"></span>
          </span>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Emergency ID</span>
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => setActiveTab('profile')}
          className="w-7 h-7 rounded-full bg-[#EBEBED] text-[#1D7A74] flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-[#1D7A74]/30 transition-all"
          title={`${userProfile.name} - Profile & Settings`}
        >
          {userProfile.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </button>
      </div>
    </header>
  );
};
