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
      <div className="flex items-center justify-between border-b border-[#EAEFEF] pb-4">
        <div>
          <h1 className="text-xl font-bold text-[#162020]">
            Digital Twin
          </h1>
          <span className="text-xs text-[#708080]">
            {baselineStatus.daysCalibrated} Days Calibrated • {baselineStatus.confidencePercentage}% Confidence
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-[#EEF5F4] text-[#2F7E79] font-semibold">
            5 In Range
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFF8EE] text-[#D8B26E] font-semibold">
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: idx * 0.03 }}
              className="bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#162020]">
                  {m.name}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isDip
                      ? 'bg-[#FFF8EE] text-[#D8B26E]'
                      : isOptimal
                      ? 'bg-[#EEF5F4] text-[#2F7E79]'
                      : 'bg-[#F8FAF9] text-[#708080]'
                  }`}
                >
                  {m.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-2 text-xs">
                <div>
                  <span className="text-xs text-[#8FA0A0]">Today: </span>
                  <span className="text-sm font-bold text-[#162020]">
                    {m.current} {m.unit}
                  </span>
                </div>
                <div className="text-right text-[#8FA0A0]">
                  <span>Corridor: </span>
                  <span className="font-semibold text-[#162020]">
                    {m.min} – {m.max} {m.unit}
                  </span>
                </div>
              </div>

              {/* Minimal Corridor Visual */}
              <div className="relative w-full h-2 bg-[#F0F4F3] rounded-full overflow-hidden mb-2">
                <div className="absolute inset-y-0 left-[20%] right-[20%] bg-[#DCE8E6]" />
                <div
                  className={`absolute top-0 bottom-0 w-2 rounded-full ${
                    isDip ? 'bg-[#D8B26E]' : 'bg-[#2F7E79]'
                  }`}
                  style={{ left: isDip ? '12%' : '50%' }}
                />
              </div>

              <span className="text-[11px] text-[#708080] block">
                {m.explanation}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
