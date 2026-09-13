'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, HeartPulse, Droplets } from 'lucide-react';
import { AIInsight } from '@/types/health';
import { useHealth } from '@/context/HealthContext';

interface InsightCardProps {
  insight: AIInsight;
  index?: number;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, index = 0 }) => {
  const { setActiveTab } = useHealth();

  const getCategoryConfig = () => {
    switch (insight.category) {
      case 'autonomic':
        return {
          icon: <HeartPulse className="w-3.5 h-3.5 text-[#FF2D55]" />,
          bg: 'bg-[#FF2D55]/10',
          pill: 'text-[#FF2D55]',
        };
      case 'hydration':
        return {
          icon: <Droplets className="w-3.5 h-3.5 text-[#0071E3]" />,
          bg: 'bg-[#0071E3]/10',
          pill: 'text-[#0071E3]',
        };
      default:
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-[#1D7A74]" />,
          bg: 'bg-[#1D7A74]/10',
          pill: 'text-[#1D7A74]',
        };
    }
  };

  const config = getCategoryConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="apple-card p-4 flex flex-col justify-between hover:border-[#1D7A74]/30 hover:shadow-md transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
              {config.icon}
            </div>
            <span className="text-xs font-semibold text-[#1D1D1F]">
              {insight.title}
            </span>
          </div>

          <span className="text-[10px] font-medium text-[#86868B]">
            {insight.timestamp}
          </span>
        </div>

        <p className="text-xs text-[#48484A] leading-relaxed mb-3 font-normal">
          {insight.message}
        </p>
      </div>

      {insight.actionableLabel && insight.targetTab && (
        <div className="pt-2 border-t border-black/[0.04] flex justify-end">
          <button
            onClick={() => setActiveTab(insight.targetTab as any)}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1D7A74] hover:text-[#155A55] transition-colors group"
          >
            <span>{insight.actionableLabel}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

