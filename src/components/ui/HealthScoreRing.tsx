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
  const size = 100;
  const strokeWidth = 7;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isCalibrated
    ? circumference - (score / 100) * circumference
    : circumference - 0.2 * circumference;

  return (
    <div className="bg-white border border-[#EAEFEF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        {/* Sleek Minimal Ring */}
        <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#EEF5F4"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <motion.circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#2F7E79"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-[#162020] tracking-tight">
              {isCalibrated ? score : '--'}
            </span>
            <span className="text-[9px] uppercase font-bold text-[#8FA0A0]">
              Score
            </span>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold text-[#2F7E79] block mb-0.5">
            {statusText}
          </span>
          <h2 className="text-base font-bold text-[#162020]">
            {isCalibrated ? 'Physiological rhythm steady' : 'Calibrating personal baseline'}
          </h2>
          <span className="text-xs text-[#8FA0A0]">
            {isCalibrated ? 'All vitals tracking in normal corridor' : 'Baseline requires 7 days'}
          </span>
        </div>
      </div>

      {/* Clean Unboxed Sub-metrics */}
      <div className="flex items-center gap-6 sm:border-l sm:border-[#F0F4F3] sm:pl-6 text-center">
        <div>
          <span className="text-[11px] text-[#8FA0A0] block">Autonomic</span>
          <span className="text-sm font-bold text-[#162020]">
            {isCalibrated ? '94%' : '--'}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[#8FA0A0] block">Sleep</span>
          <span className="text-sm font-bold text-[#162020]">
            {isCalibrated ? '91%' : '--'}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[#8FA0A0] block">Hydration</span>
          <span className="text-sm font-bold text-[#162020]">
            {isCalibrated ? '84%' : '--'}
          </span>
        </div>
      </div>
    </div>
  );
};
