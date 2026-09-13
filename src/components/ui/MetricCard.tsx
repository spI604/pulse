'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Heart, Activity, Droplets, Footprints } from 'lucide-react';
import { VitalMetric } from '@/types/health';

interface MetricCardProps {
  metric: VitalMetric;
  index?: number;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, index = 0, onClick }) => {
  const getBadgeConfig = () => {
    switch (metric.id) {
      case 'sleep':
        return {
          icon: <Moon className="w-4 h-4 text-[#5856D6]" />,
          bg: 'bg-[#5856D6]/10',
        };
      case 'heart-rate':
        return {
          icon: <Heart className="w-4 h-4 text-[#FF2D55]" />,
          bg: 'bg-[#FF2D55]/10',
        };
      case 'hrv-stress':
        return {
          icon: <Activity className="w-4 h-4 text-[#34C759]" />,
          bg: 'bg-[#34C759]/10',
        };
      case 'hydration':
        return {
          icon: <Droplets className="w-4 h-4 text-[#0071E3]" />,
          bg: 'bg-[#0071E3]/10',
        };
      case 'activity':
        return {
          icon: <Footprints className="w-4 h-4 text-[#FF9500]" />,
          bg: 'bg-[#FF9500]/10',
        };
      default:
        return {
          icon: <Activity className="w-4 h-4 text-[#1D7A74]" />,
          bg: 'bg-[#1D7A74]/10',
        };
    }
  };

  const badge = getBadgeConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.03 }}
      onClick={onClick}
      className={`apple-card p-4 transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:border-[#1D7A74]/40 hover:shadow-md active:scale-[0.99]' : ''
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#86868B]">
          {metric.name}
        </span>
        <div className={`w-7 h-7 rounded-xl ${badge.bg} flex items-center justify-center shrink-0`}>
          {badge.icon}
        </div>
      </div>

      {/* Main Value */}
      <div className="flex items-baseline mb-3">
        <span className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
          {metric.value}
        </span>
        {metric.unit && (
          <span className="text-xs font-medium text-[#86868B] ml-1">
            {metric.unit}
          </span>
        )}
      </div>

      {/* Baseline Corridor & Delta */}
      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-black/[0.04]">
        <span className="text-[#86868B] truncate max-w-[90px]">
          {metric.normalRange}
        </span>
        <span className="bg-[#34C759]/10 text-[#28A745] font-semibold px-2 py-0.5 rounded-full text-[10px] shrink-0">
          {metric.delta}
        </span>
      </div>
    </motion.div>
  );
};

