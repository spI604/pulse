'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import { mockHealthReplayEvents } from '@/data/mockHealthData';
import { EmptyState } from '@/components/ui/EmptyState';
import { HealthReplayEvent } from '@/types/health';
import {
  SearchCode,
  Play,
  Pause,
  RotateCcw,
  Moon,
  Activity,
  Droplets,
  Utensils,
  AlertCircle,
  Brain,
  Sparkles,
} from 'lucide-react';

export const InvestigationView: React.FC = () => {
  const { demoMode, setActiveTab } = useHealth();
  const [selectedEventId, setSelectedEventId] = useState<string>(mockHealthReplayEvents[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectedEvent =
    mockHealthReplayEvents.find((e) => e.id === selectedEventId) || mockHealthReplayEvents[0];

  const selectedIndex = mockHealthReplayEvents.findIndex((e) => e.id === selectedEventId);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedEventId((currentId) => {
          const idx = mockHealthReplayEvents.findIndex((e) => e.id === currentId);
          if (idx < mockHealthReplayEvents.length - 1) {
            return mockHealthReplayEvents[idx + 1].id;
          } else {
            setIsPlaying(false);
            return mockHealthReplayEvents[0].id;
          }
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getCategoryIcon = (category: HealthReplayEvent['category']) => {
    switch (category) {
      case 'sleep':
        return <Moon className="w-4 h-4 text-[#5F8F8B]" />;
      case 'stress':
        return <Activity className="w-4 h-4 text-[#D97A7A]" />;
      case 'hydration':
        return <Droplets className="w-4 h-4 text-[#5F8F8B]" />;
      case 'nutrition':
        return <Utensils className="w-4 h-4 text-[#D8B26E]" />;
      case 'symptom':
        return <AlertCircle className="w-4 h-4 text-[#D97A7A]" />;
      default:
        return <Activity className="w-4 h-4 text-[#2F7E79]" />;
    }
  };

  if (demoMode === 'empty') {
    return (
      <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
        <h1 className="text-2xl font-semibold text-[#1F2A2A]">
          Health Replay™
        </h1>

        <EmptyState
          icon={SearchCode}
          title="No Active Investigations"
          message="When a repeated pattern occurs, a 72-hour replay timeline will appear here."
          actionLabel="Log a Health Check-In"
          onAction={() => setActiveTab('check-in')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-6 pb-16">
      {/* Minimal Header */}
      <div className="flex items-center justify-between border-b border-[#E2EAE8] pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2A2A]">
            Health Replay™
          </h1>
          <span className="text-xs text-[#6C7A7A]">
            72-hour antecedent timeline before tension headache
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-xs"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play Cascade'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setSelectedEventId(mockHealthReplayEvents[0].id);
            }}
            className="p-1.5 text-[#6C7A7A] hover:text-[#1F2A2A] rounded-lg hover:bg-white transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 72-Hour Scrubber */}
      <div className="bg-white border border-[#E2EAE8] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {mockHealthReplayEvents.map((evt, idx) => {
            const isSelected = evt.id === selectedEventId;

            return (
              <button
                key={evt.id}
                onClick={() => {
                  setIsPlaying(false);
                  setSelectedEventId(evt.id);
                }}
                className={`touch-target p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#EEF3F2] border-[#2F7E79] shadow-xs'
                    : 'bg-[#F7F8F7] border-[#E2EAE8] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#2F7E79]">
                    {evt.offsetHours === 0 ? 'Onset' : `T${evt.offsetHours}h`}
                  </span>
                  {getCategoryIcon(evt.category)}
                </div>

                <span className="text-xs font-bold text-[#1F2A2A] block truncate">
                  {evt.title}
                </span>
                <span className="text-[11px] text-[#6C7A7A] block truncate">
                  {evt.metricValue}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scannable Node Details Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEvent.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-[#E2EAE8] rounded-2xl p-5 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#EEF3F2] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EEF3F2] flex items-center justify-center">
                {getCategoryIcon(selectedEvent.category)}
              </div>
              <div>
                <span className="text-[11px] text-[#5F8F8B] font-medium block">
                  {selectedEvent.timeLabel}
                </span>
                <h3 className="text-base font-bold text-[#1F2A2A]">
                  {selectedEvent.title}
                </h3>
              </div>
            </div>

            <span className="text-xs font-bold text-[#D97A7A] bg-[#FFF5F5] border border-[#D97A7A]/30 px-2.5 py-1 rounded-lg">
              {selectedEvent.metricValue} vs {selectedEvent.baselineValue}
            </span>
          </div>

          <p className="text-xs text-[#1F2A2A] leading-relaxed">
            {selectedEvent.description}
          </p>

          <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl p-3 text-xs text-[#1F2A2A]">
            <span className="font-semibold text-[#2F7E79] block mb-0.5">Correlation:</span>
            {selectedEvent.correlationNote}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pattern Summary */}
      <div className="bg-white border border-[#E2EAE8] rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EEF3F2] text-[#2F7E79] flex items-center justify-center shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#1F2A2A] block">
              91% Algorithmic Pattern Match
            </span>
            <span className="text-[#6C7A7A]">
              Tri-Factor Cascade: Sleep Curtailment + Hydration Dip + Meal Delay
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('brief')}
          className="touch-target text-xs font-semibold text-[#2F7E79] hover:underline whitespace-nowrap"
        >
          Doctor Brief →
        </button>
      </div>
    </div>
  );
};
