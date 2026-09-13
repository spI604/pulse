'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HealthScoreRingProps {
  score?: number;
  statusText?: string;
  isCalibrated?: boolean;
}

export const HealthScoreRing: React.FC<HealthScoreRingProps> = ({
  score = 88,
  statusText = 'Optimal Baseline',
  isCalibrated = true,
}) => {
  const size = 110;
  const strokeWidth = 8;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isCalibrated
    ? circumference - (score / 100) * circumference
    : circumference - 0.2 * circumference;

  return (
    <div className="apple-card p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        {/* Apple Fitness-style Ring */}
        <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#E5E5EA"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#1D7A74"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
              {isCalibrated ? score : '--'}
            </span>
            <span className="text-[9px] uppercase font-bold text-[#86868B] tracking-wider">
              Score
            </span>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D7A74] bg-[#1D7A74]/10 px-2.5 py-0.5 rounded-full mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D7A74]" />
            {statusText}
          </span>
          <h2 className="text-base font-bold text-[#1D1D1F] tracking-tight">
            {isCalibrated ? 'Physiological rhythm steady' : 'Calibrating personal baseline'}
          </h2>
          <span className="text-xs text-[#86868B] block mt-0.5">
            {isCalibrated ? 'All 6 vital channels tracking within calibrated corridor' : 'Baseline requires 7 days continuous telemetry'}
          </span>
        </div>
      </div>

      {/* Apple Sub-metrics with Color Accent Dots */}
      <div className="flex items-center gap-6 sm:border-l sm:border-[#E5E5EA] sm:pl-6 text-center w-full sm:w-auto justify-around sm:justify-end">
        <div>
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
            <span className="text-[11px] font-medium text-[#86868B]">Autonomic</span>
          </div>
          <span className="text-base font-bold text-[#1D1D1F]">
            {isCalibrated ? '94%' : '--'}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5856D6]" />
            <span className="text-[11px] font-medium text-[#86868B]">Sleep</span>
          </div>
          <span className="text-base font-bold text-[#1D1D1F]">
            {isCalibrated ? '91%' : '--'}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" />
            <span className="text-[11px] font-medium text-[#86868B]">Hydration</span>
          </div>
          <span className="text-base font-bold text-[#1D1D1F]">
            {isCalibrated ? '84%' : '--'}
          </span>
        </div>
      </div>
    </div>
  );
};

