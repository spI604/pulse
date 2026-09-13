'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, HeartPulse, ShieldCheck, Droplets } from 'lucide-react';
import { AIInsight } from '@/types/health';
import { useHealth } from '@/context/HealthContext';

interface InsightCardProps {
  insight: AIInsight;
  index?: number;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, index = 0 }) => {
  const { setActiveTab } = useHealth();

  const getIcon = () => {
    switch (insight.category) {
      case 'autonomic':
        return <HeartPulse className="w-3.5 h-3.5 text-[#2F7E79]" />;
      case 'hydration':
        return <Droplets className="w-3.5 h-3.5 text-[#5F8F8B]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#2F7E79]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#EEF5F4] flex items-center justify-center">
              {getIcon()}
            </div>
            <span className="text-xs font-bold text-[#162020]">
              {insight.title}
            </span>
          </div>

          <span className="text-[10px] text-[#8FA0A0]">
            {insight.timestamp}
          </span>
        </div>

        <p className="text-xs text-[#708080] leading-relaxed mb-3">
          {insight.message}
        </p>
      </div>

      {insight.actionableLabel && insight.targetTab && (
        <div className="pt-2 border-t border-[#F2F6F6] flex justify-end">
          <button
            onClick={() => setActiveTab(insight.targetTab as any)}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F7E79] hover:text-[#266864] transition-colors"
          >
            <span>{insight.actionableLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </motion.div>
  );
};
