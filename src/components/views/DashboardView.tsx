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
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* 1. Health Summary Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
            {getGreeting()}, {userProfile.name}
          </h1>
          <span className="text-xs text-[#86868B] block mt-0.5">
            Your physiological rhythms are well within your calibrated personal corridor.
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#1D7A74]/10 text-[#1D7A74] px-3 py-1 rounded-full text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D7A74] animate-pulse" />
          <span>94d Calibrated</span>
        </div>
      </div>

      {/* Health Score Ring Hero */}
      <HealthScoreRing
        score={88}
        statusText="Optimal Baseline"
        isCalibrated={baselineStatus.isCalibrated}
      />

      {/* 2. Today's State Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#86868B]">
            Today&apos;s Telemetry
          </span>
          <button
            onClick={() => setActiveTab('twin')}
            className="text-xs font-semibold text-[#1D7A74] hover:text-[#155A55] flex items-center gap-1 group transition-colors"
          >
            <span>Digital Twin</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
        <span className="text-xs font-bold uppercase tracking-wider text-[#86868B] block">
          Intelligence &amp; Biomarkers
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.slice(0, 2).map((insight, idx) => (
            <InsightCard key={insight.id} insight={insight} index={idx} />
          ))}
        </div>
      </div>

      {/* 4. Apple Control Center-style Quick Actions Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <button
          onClick={() => setActiveTab('check-in')}
          className="apple-card p-3.5 text-left group hover:border-[#34C759]/40 hover:shadow-md transition-all duration-300 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1D1D1F] block group-hover:text-[#34C759] transition-colors">
              Daily Check-In
            </span>
            <span className="text-[11px] text-[#86868B]">30-second log</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('journal')}
          className="apple-card p-3.5 text-left group hover:border-[#5856D6]/40 hover:shadow-md transition-all duration-300 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#5856D6]/10 text-[#5856D6] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <PenLine className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1D1D1F] block group-hover:text-[#5856D6] transition-colors">
              Health Journal
            </span>
            <span className="text-[11px] text-[#86868B]">Symptom notes</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('brief')}
          className="apple-card p-3.5 text-left group hover:border-[#1D7A74]/40 hover:shadow-md transition-all duration-300 flex items-center gap-3.5"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1D7A74]/10 text-[#1D7A74] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#1D1D1F] block group-hover:text-[#1D7A74] transition-colors">
              Doctor Brief
            </span>
            <span className="text-[11px] text-[#86868B]">Consultation summary</span>
          </div>
        </button>
      </div>
    </div>
  );
};
