'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  showConstructionAnimation?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  showConstructionAnimation = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-white border border-[#E2EAE8] rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
    >
      <div className="relative w-16 h-16 rounded-2xl bg-[#EEF3F2] border border-[#E2EAE8] flex items-center justify-center mx-auto mb-5 text-[#2F7E79]">
        <Icon className="w-8 h-8" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#8FB5AF] rounded-full ring-4 ring-white" />
      </div>

      <h3 className="text-xl font-medium text-[#1F2A2A] mb-2">{title}</h3>

      <p className="text-sm text-[#6C7A7A] leading-relaxed max-w-md mx-auto mb-6">
        {message}
      </p>

      {showConstructionAnimation && (
        <div className="mb-6 p-4 bg-[#F7F8F7] border border-[#E2EAE8] rounded-2xl max-w-sm mx-auto">
          <div className="flex items-center justify-between text-xs text-[#6C7A7A] mb-2 font-medium">
            <span>Calibration Progress</span>
            <span className="text-[#2F7E79]">Day 1 of 7</span>
          </div>
          <div className="h-2 w-full bg-[#EEF3F2] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#2F7E79] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '18%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] text-[#5F8F8B] mt-2 block">
            Baseline accuracy improves with every log
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="touch-target inline-flex items-center justify-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all duration-150"
          >
            <Sparkles className="w-4 h-4" />
            <span>{actionLabel}</span>
          </button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="touch-target inline-flex items-center justify-center text-sm font-medium text-[#6C7A7A] hover:text-[#1F2A2A] px-4 py-2.5 rounded-xl border border-[#E2EAE8] hover:bg-[#F7F8F7] transition-all"
          >
            <span>{secondaryActionLabel}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
