'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Moon, Droplets } from 'lucide-react';

interface HealthScoreRingProps {
  score?: number;
  statusText?: string;
  isCalibrated?: boolean;
}

export const HealthScoreRing: React.FC<HealthScoreRingProps> = ({
  score = 88,
  statusText = 'Optimal Baseline Alignment',
  isCalibrated = true,
}) => {
  const size = 120;
  const strokeWidth = 8;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isCalibrated
    ? circumference - (score / 100) * circumference
    : circumference - 0.2 * circumference;

  return (
    <div className="bg-white border border-[#E2EAE8] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-5">
        <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#EEF3F2"
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
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-[#1F2A2A] tracking-tight">
              {isCalibrated ? score : '--'}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#5F8F8B]">
              Score
            </span>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1 bg-[#EEF3F2] text-[#2F7E79] px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1 border border-[#E2EAE8]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{statusText}</span>
          </div>
          <h2 className="text-base font-semibold text-[#1F2A2A]">
            {isCalibrated ? 'Physiological rhythm steady' : 'Building personal baseline'}
          </h2>
          <span className="text-xs text-[#6C7A7A]">
            {isCalibrated ? 'No anomalies detected across 48 continuous data points' : 'Requires 7 days of daily entries'}
          </span>
        </div>
      </div>

      {/* Clean compact sub-metrics */}
      <div className="w-full sm:w-auto grid grid-cols-3 gap-2 border-t sm:border-t-0 sm:border-l border-[#EEF3F2] pt-3 sm:pt-0 sm:pl-5">
        <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl p-2.5 text-center min-w-[72px]">
          <span className="text-[10px] text-[#6C7A7A] block">Autonomic</span>
          <span className="text-xs font-bold text-[#1F2A2A]">
            {isCalibrated ? '94%' : '--'}
          </span>
        </div>

        <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl p-2.5 text-center min-w-[72px]">
          <span className="text-[10px] text-[#6C7A7A] block">Sleep</span>
          <span className="text-xs font-bold text-[#1F2A2A]">
            {isCalibrated ? '91%' : '--'}
          </span>
        </div>

        <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl p-2.5 text-center min-w-[72px]">
          <span className="text-[10px] text-[#6C7A7A] block">Hydration</span>
          <span className="text-xs font-bold text-[#1F2A2A]">
            {isCalibrated ? '84%' : '--'}
          </span>
        </div>
      </div>
    </div>
  );
};
