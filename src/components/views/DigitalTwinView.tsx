'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import { mockBaselineMetrics } from '@/data/mockHealthData';
import { EmptyState } from '@/components/ui/EmptyState';
import { Layers } from 'lucide-react';

export const DigitalTwinView: React.FC = () => {
  const { demoMode, baselineStatus, setActiveTab } = useHealth();

  if (demoMode === 'empty') {
    return (
      <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
        <h1 className="text-2xl font-semibold text-[#1F2A2A]">
          Digital Health Twin
        </h1>

        <EmptyState
          icon={Layers}
          title="Baseline Forming"
          message="Complete a few check-ins to calibrate your personal baseline corridors."
          actionLabel="Complete Daily Check-In"
          onAction={() => setActiveTab('check-in')}
          showConstructionAnimation={true}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-6 pb-16">
      {/* Clean Minimal Header */}
      <div className="flex items-center justify-between border-b border-[#E2EAE8] pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2A2A]">
            Digital Twin
          </h1>
          <span className="text-xs text-[#5F8F8B] font-medium">
            {baselineStatus.daysCalibrated} Days Calibrated • {baselineStatus.confidencePercentage}% Confidence
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-[#EEF3F2] text-[#2F7E79] font-medium">
            5 In Range
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#FFF8EE] text-[#D8B26E] font-medium">
            1 Deviation
          </span>
        </div>
      </div>

      {/* Clean Baseline Corridor Comparison Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {mockBaselineMetrics.map((m, idx) => {
          const isDip = m.status === 'Slight Dip';
          const isOptimal = m.status === 'Optimal';

          return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="bg-white border border-[#E2EAE8] hover:border-[#8FB5AF] rounded-2xl p-4 shadow-xs transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#1F2A2A]">
                  {m.name}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                    isDip
                      ? 'bg-[#FFF8EE] text-[#D8B26E] border-[#F3E7D3]'
                      : isOptimal
                      ? 'bg-[#EEF3F2] text-[#2F7E79] border-[#D1E2E0]'
                      : 'bg-[#F7F8F7] text-[#5F8F8B] border-[#E2EAE8]'
                  }`}
                >
                  {m.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-2 text-xs">
                <div>
                  <span className="text-xs text-[#6C7A7A]">Today: </span>
                  <span className="text-base font-bold text-[#1F2A2A]">
                    {m.current} {m.unit}
                  </span>
                </div>
                <div className="text-right text-[#6C7A7A]">
                  <span>Corridor: </span>
                  <span className="font-semibold text-[#1F2A2A]">
                    {m.min} – {m.max} {m.unit}
                  </span>
                </div>
              </div>

              {/* Minimal Corridor Visual */}
              <div className="relative w-full h-2.5 bg-[#F7F8F7] border border-[#E2EAE8] rounded-full overflow-hidden mb-2">
                <div className="absolute inset-y-0 left-[20%] right-[20%] bg-[#EEF3F2]" />
                <div
                  className={`absolute top-0.5 bottom-0.5 w-2 rounded-full ${
                    isDip ? 'bg-[#D8B26E]' : 'bg-[#2F7E79]'
                  }`}
                  style={{ left: isDip ? '12%' : '50%' }}
                />
              </div>

              <span className="text-[11px] text-[#6C7A7A] block">
                {m.explanation}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
