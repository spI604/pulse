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
  const getIcon = () => {
    switch (metric.id) {
      case 'sleep':
        return <Moon className="w-3.5 h-3.5 text-[#5F8F8B]" />;
      case 'heart-rate':
        return <Heart className="w-3.5 h-3.5 text-[#2F7E79]" />;
      case 'hrv-stress':
        return <Activity className="w-3.5 h-3.5 text-[#74A57F]" />;
      case 'hydration':
        return <Droplets className="w-3.5 h-3.5 text-[#5F8F8B]" />;
      case 'activity':
        return <Footprints className="w-3.5 h-3.5 text-[#2F7E79]" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-[#2F7E79]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.03 }}
      onClick={onClick}
      className={`bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all ${
        onClick ? 'cursor-pointer hover:shadow-xs' : ''
      }`}
    >
      <div className="flex items-center justify-between text-xs text-[#8FA0A0] mb-1">
        <span className="font-medium">{metric.name}</span>
        {getIcon()}
      </div>

      <div className="flex items-baseline gap-1 my-1">
        <span className="text-xl font-bold text-[#162020] tracking-tight">
          {metric.value}
        </span>
        {metric.unit && (
          <span className="text-[11px] font-medium text-[#8FA0A0]">{metric.unit}</span>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#8FA0A0] mt-1">
        <span>{metric.normalRange}</span>
        <span className="font-semibold text-[#2F7E79]">{metric.delta}</span>
      </div>
    </motion.div>
  );
};
