'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, ArrowUpRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { AIInsight } from '@/types/health';
import { useHealth } from '@/context/HealthContext';

interface InsightCardProps {
  insight: AIInsight;
  index?: number;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, index = 0 }) => {
  const { setActiveTab } = useHealth();

  const getIcon = () => {
    switch (insight.type) {
      case 'recovery':
        return <HeartPulse className="w-4 h-4 text-[#2F7E79]" />;
      case 'pattern':
        return <Brain className="w-4 h-4 text-[#5F8F8B]" />;
      case 'preventive':
        return <ShieldCheck className="w-4 h-4 text-[#74A57F]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#2F7E79]" />;
    }
  };

  const getCategoryBadge = () => {
    switch (insight.category) {
      case 'sleep':
        return 'Circadian Rhythm';
      case 'autonomic':
        return 'Autonomic Tone';
      case 'hydration':
        return 'Fluid Pacing';
      case 'activity':
        return 'Movement Balance';
      default:
        return 'Physiological Pattern';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 18,
        delay: index * 0.07,
      }}
      className="group relative bg-white border border-[#E2EAE8] hover:border-[#8FB5AF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(47,126,121,0.06)] transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#EEF3F2] flex items-center justify-center">
              {getIcon()}
            </div>
            <span className="text-xs font-medium tracking-wide uppercase text-[#5F8F8B] bg-[#F7F8F7] px-2.5 py-0.5 rounded-full border border-[#E2EAE8]">
              {getCategoryBadge()}
            </span>
          </div>

          <span className="text-xs text-[#6C7A7A]">{insight.timestamp}</span>
        </div>

        <h4 className="text-base font-medium text-[#1F2A2A] mb-1.5 group-hover:text-[#2F7E79] transition-colors">
          {insight.title}
        </h4>

        <p className="text-sm text-[#6C7A7A] leading-relaxed mb-4">
          {insight.message}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[#EEF3F2]">
        <div className="flex items-center gap-1.5 text-xs text-[#5F8F8B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#74A57F]" />
          <span>{insight.confidence ? `${insight.confidence}% algorithmic confidence` : 'Calm observation'}</span>
        </div>

        {insight.actionableLabel && insight.targetTab && (
          <button
            onClick={() => setActiveTab(insight.targetTab as any)}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2F7E79] hover:text-[#266864] hover:underline p-1 -mr-1"
          >
            <span>{insight.actionableLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
