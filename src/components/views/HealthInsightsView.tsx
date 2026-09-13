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
      <div className="flex items-center justify-between border-b border-[#EAEFEF] pb-4">
        <div>
          <h1 className="text-xl font-bold text-[#162020]">
            Health Insights
          </h1>
          <span className="text-xs text-[#708080]">
            Observational patterns worth monitoring
          </span>
        </div>

        <span className="text-xs font-semibold text-[#2F7E79] bg-[#EEF5F4] px-2.5 py-0.5 rounded-full">
          {healthSignals.length} Patterns
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
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: idx * 0.03 }}
              className="bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#EEF5F4] text-[#2F7E79] flex items-center justify-center font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#162020]">
                      {signal.title}
                    </h3>
                    <span className="text-[11px] text-[#708080]">
                      {signal.category}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFF8EE] text-[#D8B26E]">
                  Monitoring
                </span>
              </div>

              <p className="text-xs text-[#162020] leading-relaxed">
                {signal.observationText}
              </p>

              <div className="pt-2 border-t border-[#F0F4F3] flex items-center justify-between gap-2 flex-wrap text-xs">
                <span className="text-[11px] text-[#708080]">
                  Action: {signal.recommendedAction}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateSignalStatus(signal.id, 'monitoring')}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border transition-all ${
                      isMonitoring ? 'bg-[#2F7E79] text-white border-[#2F7E79]' : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080]'
                    }`}
                  >
                    Monitor
                  </button>

                  <button
                    onClick={() => updateSignalStatus(signal.id, 'rechecking')}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border transition-all ${
                      isRechecking ? 'bg-[#2F7E79] text-white border-[#2F7E79]' : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080]'
                    }`}
                  >
                    Recheck
                  </button>

                  <button
                    onClick={() => {
                      updateSignalStatus(signal.id, 'clinician-ready');
                      setActiveTab('brief');
                    }}
                    className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border transition-all ${
                      isClinician ? 'bg-[#2F7E79] text-white border-[#2F7E79]' : 'bg-[#EEF5F4] border-[#8FB5AF]/50 text-[#2F7E79]'
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
