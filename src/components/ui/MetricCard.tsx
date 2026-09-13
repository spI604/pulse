'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Moon,
  Heart,
  Activity,
  Droplets,
  Footprints,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { VitalMetric } from '@/types/health';

interface MetricCardProps {
  metric: VitalMetric;
  index?: number;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, index = 0, onClick }) => {
  const getIcon = () => {
    switch (metric.id) {
      case 'sleep':
        return <Moon className="w-4 h-4 text-[#5F8F8B]" />;
      case 'heart-rate':
        return <Heart className="w-4 h-4 text-[#2F7E79]" />;
      case 'hrv-stress':
        return <Activity className="w-4 h-4 text-[#74A57F]" />;
      case 'hydration':
        return <Droplets className="w-4 h-4 text-[#5F8F8B]" />;
      case 'activity':
        return <Footprints className="w-4 h-4 text-[#2F7E79]" />;
      default:
        return <Activity className="w-4 h-4 text-[#2F7E79]" />;
    }
  };

  const getDeltaIcon = () => {
    switch (metric.deltaDirection) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-[#2F7E79]" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-[#5F8F8B]" />;
      default:
        return <Minus className="w-3 h-3 text-[#6C7A7A]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      onClick={onClick}
      className={`bg-white border border-[#E2EAE8] hover:border-[#8FB5AF] rounded-2xl p-4 shadow-xs transition-all flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:shadow-sm' : ''
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#EEF3F2] flex items-center justify-center">
            {getIcon()}
          </div>
          <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#1F2A2A]">
            {getDeltaIcon()}
            {metric.delta}
          </span>
        </div>

        <span className="text-xs text-[#6C7A7A] block">{metric.name}</span>
        <div className="flex items-baseline gap-1 mt-0.5 mb-2">
          <span className="text-xl font-bold text-[#1F2A2A] tracking-tight">
            {metric.value}
          </span>
          {metric.unit && (
            <span className="text-[11px] text-[#6C7A7A]">{metric.unit}</span>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-[#EEF3F2] flex items-center justify-between text-[11px] text-[#6C7A7A]">
        <span>Corridor</span>
        <span className="font-semibold text-[#1F2A2A]">{metric.normalRange}</span>
      </div>
    </motion.div>
  );
};
