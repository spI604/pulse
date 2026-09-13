'use client';

import React from 'react';
import { useHealth } from '@/context/HealthContext';
import { HealthScoreRing } from '@/components/ui/HealthScoreRing';
import { MetricCard } from '@/components/ui/MetricCard';
import { InsightCard } from '@/components/ui/InsightCard';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  CheckCircle,
  PenLine,
  FileText,
  Compass,
  ArrowRight,
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
      <div className="space-y-6 max-w-4xl mx-auto py-4">
        <h1 className="text-xl font-bold text-[#1F2A2A]">
          {getGreeting()}, {userProfile.name}
        </h1>

        <EmptyState
          icon={Compass}
          title="Getting Started"
          message="Complete your first check-in to begin building your personal baseline."
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
    <div className="space-y-5 max-w-4xl mx-auto pb-12">
      {/* 1. Health Summary Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#162020] tracking-tight">
            {getGreeting()}, {userProfile.name}
          </h1>
          <span className="text-xs text-[#708080]">
            Physiological rhythm is steady today
          </span>
        </div>

        <span className="text-xs font-semibold text-[#2F7E79] bg-[#EEF5F4] px-2.5 py-0.5 rounded-full">
          94d Calibrated
        </span>
      </div>

      {/* Health Score Ring Hero */}
      <HealthScoreRing
        score={88}
        statusText="Optimal Baseline"
        isCalibrated={baselineStatus.isCalibrated}
      />

      {/* 2. Today's State Cards */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#162020]">Today&apos;s Vitals</span>
          <button
            onClick={() => setActiveTab('twin')}
            className="text-[#2F7E79] font-medium hover:underline flex items-center gap-0.5"
          >
            <span>Digital Twin</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#162020] block">
          AI Insights
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {aiInsights.slice(0, 2).map((insight, idx) => (
            <InsightCard key={insight.id} insight={insight} index={idx} />
          ))}
        </div>
      </div>

      {/* 4. Sleek Quick Actions Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <button
          onClick={() => setActiveTab('check-in')}
          className="touch-target group bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-3 text-left shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EEF5F4] group-hover:bg-[#2F7E79] text-[#2F7E79] group-hover:text-white flex items-center justify-center transition-colors">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#162020] block group-hover:text-[#2F7E79]">
              Daily Check-In
            </span>
            <span className="text-[10px] text-[#8FA0A0]">30-second log</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className="touch-target group bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-3 text-left shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EEF5F4] group-hover:bg-[#2F7E79] text-[#2F7E79] group-hover:text-white flex items-center justify-center transition-colors">
            <PenLine className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#162020] block group-hover:text-[#2F7E79]">
              Health Journal
            </span>
            <span className="text-[10px] text-[#8FA0A0]">Text signal extraction</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('brief')}
          className="touch-target group bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-3 text-left shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EEF5F4] group-hover:bg-[#2F7E79] text-[#2F7E79] group-hover:text-white flex items-center justify-center transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#162020] block group-hover:text-[#2F7E79]">
              Doctor Brief
            </span>
            <span className="text-[10px] text-[#8FA0A0]">Consultation report</span>
          </div>
        </button>
      </div>
    </div>
  );
};
