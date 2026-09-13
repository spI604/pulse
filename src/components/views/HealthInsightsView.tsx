'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  ShieldCheck,
  Eye,
  RefreshCw,
  Stethoscope,
} from 'lucide-react';

export const HealthInsightsView: React.FC = () => {
  const { demoMode, healthSignals, updateSignalStatus, setActiveTab } = useHealth();

  if (demoMode === 'empty') {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
        <h1 className="text-2xl font-semibold text-[#1F2A2A]">
          Health Insights
        </h1>

        <EmptyState
          icon={ShieldCheck}
          title="No Signals Detected"
          message="All resting vitals and corridors are tracking within normal bounds."
          actionLabel="Log a Daily Check-In"
          onAction={() => setActiveTab('check-in')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-4 pb-16">
      <div className="flex items-center justify-between border-b border-[#E2EAE8] pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2A2A]">
            Health Insights
          </h1>
          <span className="text-xs text-[#6C7A7A]">
            Observational patterns worth monitoring
          </span>
        </div>

        <span className="text-xs font-semibold text-[#2F7E79] bg-[#EEF3F2] px-3 py-1 rounded-full">
          {healthSignals.length} Active Patterns
        </span>
      </div>

      <div className="space-y-3">
        {healthSignals.map((signal, idx) => {
          const isMonitoring = signal.status === 'monitoring';
          const isRechecking = signal.status === 'rechecking';
          const isClinician = signal.status === 'clinician-ready';

          return (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              className="bg-white border border-[#E2EAE8] hover:border-[#8FB5AF] rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF3F2] text-[#2F7E79] flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1F2A2A]">
                      {signal.title}
                    </h3>
                    <span className="text-[11px] text-[#6C7A7A]">
                      {signal.category}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF8EE] text-[#D8B26E] border border-[#F3E7D3]">
                  Monitoring
                </span>
              </div>

              <p className="text-xs text-[#1F2A2A] leading-relaxed">
                {signal.observationText}
              </p>

              <div className="pt-2 border-t border-[#EEF3F2] flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="text-[11px] text-[#6C7A7A]">
                  Action: {signal.recommendedAction}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateSignalStatus(signal.id, 'monitoring')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      isMonitoring ? 'bg-[#2F7E79] text-white' : 'bg-[#F7F8F7] text-[#6C7A7A]'
                    }`}
                  >
                    Monitor
                  </button>

                  <button
                    onClick={() => updateSignalStatus(signal.id, 'rechecking')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      isRechecking ? 'bg-[#2F7E79] text-white' : 'bg-[#F7F8F7] text-[#6C7A7A]'
                    }`}
                  >
                    Recheck
                  </button>

                  <button
                    onClick={() => {
                      updateSignalStatus(signal.id, 'clinician-ready');
                      setActiveTab('brief');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      isClinician ? 'bg-[#2F7E79] text-white' : 'bg-[#EEF3F2] text-[#2F7E79]'
                    }`}
                  >
                    To Doctor Brief
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
