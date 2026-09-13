'use client';

import React from 'react';
import { useHealth } from '@/context/HealthContext';
import { HealthScoreRing } from '@/components/ui/HealthScoreRing';
import { MetricCard } from '@/components/ui/MetricCard';
import { InsightCard } from '@/components/ui/InsightCard';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  Sparkles,
  CheckCircle,
  PenLine,
  FileText,
  Activity,
  Compass,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { userProfile, baselineStatus, vitals, aiInsights, demoMode, setActiveTab } =
    useHealth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (demoMode === 'empty') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-4">
        <h1 className="text-2xl font-semibold text-[#1F2A2A]">
          {getGreeting()}, {userProfile.name}
        </h1>

        <EmptyState
          icon={Compass}
          title="Getting Started"
          message="Complete your first check-in to start building your personal baseline."
          actionLabel="Start First Check-In"
          onAction={() => setActiveTab('check-in')}
          secondaryActionLabel="Log Journal"
          onSecondaryAction={() => setActiveTab('journal')}
          showConstructionAnimation={true}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 1. Health Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2A2A] tracking-tight">
            {getGreeting()}, {userProfile.name}
          </h1>
          <p className="text-xs text-[#6C7A7A] mt-0.5">
            Physiological rhythm is steady today.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#2F7E79] bg-[#EEF3F2] px-3 py-1 rounded-full font-medium">
          <span className="w-2 h-2 rounded-full bg-[#74A57F] animate-pulse" />
          <span>94d Calibrated</span>
        </div>
      </div>

      {/* Health Score Ring */}
      <HealthScoreRing
        score={88}
        statusText="Optimal Baseline"
        isCalibrated={baselineStatus.isCalibrated}
      />

      {/* 2. Today's State Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1F2A2A]">
            <Activity className="w-4 h-4 text-[#2F7E79]" />
            <span>Today&apos;s Vitals</span>
          </div>
          <button
            onClick={() => setActiveTab('twin')}
            className="text-xs text-[#5F8F8B] hover:text-[#2F7E79]"
          >
            Digital Twin →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {vitals.map((metric, idx) => (
            <MetricCard
              key={metric.id}
              metric={metric}
              index={idx}
              onClick={() => setActiveTab('twin')}
            />
          ))}
        </div>
      </div>

      {/* 3. AI Insights */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1F2A2A]">
          <Sparkles className="w-4 h-4 text-[#2F7E79]" />
          <span>AI Insights</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.slice(0, 2).map((insight, idx) => (
            <InsightCard key={insight.id} insight={insight} index={idx} />
          ))}
        </div>
      </div>

      {/* 4. Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <button
          onClick={() => setActiveTab('check-in')}
          className="touch-target group bg-white border border-[#E2EAE8] hover:border-[#2F7E79] rounded-2xl p-3.5 text-left shadow-xs transition-all flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#EEF3F2] group-hover:bg-[#2F7E79] text-[#2F7E79] group-hover:text-white flex items-center justify-center transition-colors">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1F2A2A] block group-hover:text-[#2F7E79]">
              Daily Check-In
            </span>
            <span className="text-[11px] text-[#6C7A7A]">30-second log</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className="touch-target group bg-white border border-[#E2EAE8] hover:border-[#2F7E79] rounded-2xl p-3.5 text-left shadow-xs transition-all flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#EEF3F2] group-hover:bg-[#2F7E79] text-[#2F7E79] group-hover:text-white flex items-center justify-center transition-colors">
            <PenLine className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1F2A2A] block group-hover:text-[#2F7E79]">
              Health Journal
            </span>
            <span className="text-[11px] text-[#6C7A7A]">Natural text extraction</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('brief')}
          className="touch-target group bg-white border border-[#E2EAE8] hover:border-[#2F7E79] rounded-2xl p-3.5 text-left shadow-xs transition-all flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#EEF3F2] group-hover:bg-[#2F7E79] text-[#2F7E79] group-hover:text-white flex items-center justify-center transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1F2A2A] block group-hover:text-[#2F7E79]">
              Doctor Brief
            </span>
            <span className="text-[11px] text-[#6C7A7A]">Consultation summary</span>
          </div>
        </button>
      </div>
    </div>
  );
};
