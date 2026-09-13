'use client';

import React from 'react';
import { useHealth, DemoMode } from '@/context/HealthContext';
import { Sparkles, RefreshCw, Compass } from 'lucide-react';

export const DemoModeToggle: React.FC = () => {
  const { demoMode, setDemoMode, resetToOnboarding } = useHealth();

  return (
    <div className="flex items-center gap-2 bg-white border border-[#E2EAE8] rounded-2xl p-1.5 px-2 shadow-xs">
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6C7A7A] pr-1.5 border-r border-[#E2EAE8]">
        <Sparkles className="w-3.5 h-3.5 text-[#2F7E79]" />
        <span className="font-medium text-[#1F2A2A]">Demo View:</span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setDemoMode('calibrated')}
          className={`touch-target px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            demoMode === 'calibrated'
              ? 'bg-[#2F7E79] text-white shadow-xs'
              : 'text-[#6C7A7A] hover:text-[#1F2A2A] hover:bg-[#EEF3F2]'
          }`}
          title="View application with 94 days of calibrated baseline data"
        >
          Calibrated (94d)
        </button>

        <button
          onClick={() => setDemoMode('empty')}
          className={`touch-target px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
            demoMode === 'empty'
              ? 'bg-[#2F7E79] text-white shadow-xs'
              : 'text-[#6C7A7A] hover:text-[#1F2A2A] hover:bg-[#EEF3F2]'
          }`}
          title="View application empty states for first-time users"
        >
          Fresh (0d)
        </button>
      </div>

      <button
        onClick={resetToOnboarding}
        className="touch-target hidden lg:inline-flex items-center gap-1 text-xs font-medium text-[#5F8F8B] hover:text-[#2F7E79] px-2 py-1 rounded-lg hover:bg-[#EEF3F2] transition-colors ml-1 border-l border-[#E2EAE8] pl-2"
        title="Walk through the 5-step onboarding experience"
      >
        <Compass className="w-3.5 h-3.5" />
        <span>Onboarding</span>
      </button>
    </div>
  );
};
