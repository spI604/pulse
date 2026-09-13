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
    <header className="sticky top-0 z-30 bg-[#F8FAF9]/80 backdrop-blur-md border-b border-[#EAEFEF] px-4 md:px-8 py-2.5 flex items-center justify-between gap-4">
      {/* Left: Clean Brand */}
      <div
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center gap-2 cursor-pointer select-none group"
      >
        <div className="w-7 h-7 rounded-lg bg-[#2F7E79] flex items-center justify-center text-white transition-transform group-hover:scale-105">
          <HeartPulse className="w-4 h-4" />
        </div>
        <span className="text-sm font-bold tracking-tight text-[#162020]">
          PULSE
        </span>
      </div>

      {/* Middle: Clean Minimal Search */}
      <div className="hidden md:flex flex-1 max-w-sm mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-3.5 h-3.5 text-[#8FA0A0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vitals, symptoms, or records..."
            className="w-full bg-white border border-[#EAEFEF] focus:border-[#2F7E79] rounded-full pl-8 pr-3 py-1.5 text-xs text-[#162020] placeholder-[#8FA0A0] focus:outline-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          />
        </form>
      </div>

      {/* Right: Minimal Actions */}
      <div className="flex items-center gap-2">
        {/* Discrete Segmented Demo Mode Switcher */}
        <div className="flex items-center bg-white border border-[#EAEFEF] rounded-full p-0.5 text-[11px] font-medium text-[#708080]">
          <button
            onClick={() => setDemoMode('calibrated')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              demoMode === 'calibrated'
                ? 'bg-[#2F7E79] text-white font-semibold shadow-xs'
                : 'hover:text-[#162020]'
            }`}
          >
            94d Calibrated
          </button>
          <button
            onClick={() => setDemoMode('empty')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              demoMode === 'empty'
                ? 'bg-[#2F7E79] text-white font-semibold shadow-xs'
                : 'hover:text-[#162020]'
            }`}
          >
            Fresh (0d)
          </button>
        </div>

        {/* Emergency Trigger */}
        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="touch-target inline-flex items-center gap-1.5 bg-[#FFF2F2] hover:bg-[#FFE6E6] border border-[#D97A7A]/30 text-[#D97A7A] px-3 py-1 rounded-full text-xs font-bold transition-colors"
          title="Emergency Medical Card"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Emergency</span>
        </button>

        {/* User Profile Avatar */}
        <button
          onClick={() => setActiveTab('profile')}
          className="w-7 h-7 rounded-full bg-[#EEF5F4] border border-[#8FB5AF]/50 text-[#2F7E79] flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-[#2F7E79]/20 transition-all"
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
