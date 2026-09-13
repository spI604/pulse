'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import {
  PenLine,
  Sparkles,
  Clock,
  Activity,
  Lightbulb,
  Check,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const JournalView: React.FC = () => {
  const { addJournalEntry, journalEntries, setActiveTab } = useHealth();

  const presets = [
    {
      title: 'Late screen work & tension',
      text: 'Woke up at 6:30 AM with a throbbing tension headache behind my right temple. Stayed up past midnight on the screen, only drank two cups of coffee, and postponed breakfast until 1 PM.',
      symptoms: ['Right Temporal Tension Headache', 'Cervical Muscle Tightness'],
      time: '06:30 AM (Upon waking)',
      context: ['Late screen exposure (>midnight)', 'Fluid intake deficit (~0.6L)'],
      triggers: ['Circadian sleep curtailment', 'Caffeine-to-water imbalance', 'Fasting hypoglycemia'],
    },
    {
      title: 'Afternoon meeting fatigue',
      text: 'Noticed moderate dizziness and cognitive fatigue around 2:15 PM following 4 back-to-back video calls without water or lunch.',
      symptoms: ['Cognitive Fatigue', 'Mild Postural Dizziness'],
      time: '02:15 PM (Mid-afternoon)',
      context: ['Back-to-back sedentary screen time', 'Skipped midday meal'],
      triggers: ['Autonomic strain', 'Hypoglycemic dip', 'Dehydration'],
    },
    {
      title: 'Full restorative recovery',
      text: 'Slept 8 hours continuously. Enjoyed 30 minutes of morning sun and an electrolyte water bottle. Zero headache, energy is 5/5.',
      symptoms: ['None (Asymptomatic)'],
      time: 'Morning restoration',
      context: ['8 hours unbroken sleep', 'Hydration pacing optimized'],
      triggers: ['Restorative parasympathetic dominance'],
    },
  ];

  const [text, setText] = useState<string>(presets[0].text);
  const [extractedSymptoms, setExtractedSymptoms] = useState<string[]>(presets[0].symptoms);
  const [extractedTime, setExtractedTime] = useState<string>(presets[0].time);
  const [extractedContext, setExtractedContext] = useState<string[]>(presets[0].context);
  const [extractedTriggers, setExtractedTriggers] = useState<string[]>(presets[0].triggers);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Dynamic heuristic extraction when user types
  useEffect(() => {
    if (!text.trim()) {
      setExtractedSymptoms([]);
      setExtractedTime('');
      setExtractedContext([]);
      setExtractedTriggers([]);
      return;
    }

    setIsAnalyzing(true);
    const timer = setTimeout(() => {
      const lower = text.toLowerCase();

      const symptoms: string[] = [];
      if (lower.includes('headache') || lower.includes('temple') || lower.includes('throbbing')) {
        symptoms.push('Temporal Tension Headache');
      }
      if (lower.includes('fatigue') || lower.includes('tired') || lower.includes('drained')) {
        symptoms.push('Cognitive Fatigue');
      }
      if (lower.includes('dizzy') || lower.includes('dizziness') || lower.includes('lightheaded')) {
        symptoms.push('Mild Lightheadedness');
      }
      if (lower.includes('nausea') || lower.includes('queasy')) {
        symptoms.push('Episodic Nausea');
      }
      if (lower.includes('neck') || lower.includes('tension') || lower.includes('tight')) {
        symptoms.push('Musculoskeletal Tension');
      }
      if (symptoms.length === 0 && !lower.includes('zero') && !lower.includes('none')) {
        symptoms.push('General Physiological Sensation');
      }

      const contexts: string[] = [];
      if (lower.includes('screen') || lower.includes('computer') || lower.includes('monitor')) {
        contexts.push('Prolonged visual screen exposure');
      }
      if (lower.includes('coffee') || lower.includes('caffeine')) {
        contexts.push('Caffeine consumed before hydration');
      }
      if (lower.includes('late') || lower.includes('midnight') || lower.includes('sleep')) {
        contexts.push('Circadian shift / sleep variability');
      }
      if (lower.includes('breakfast') || lower.includes('lunch') || lower.includes('fasting')) {
        contexts.push('Meal delay past normal corridor');
      }

      const triggers: string[] = [];
      if (lower.includes('coffee') || lower.includes('water') || lower.includes('drank')) {
        triggers.push('Fluid buffer contraction');
      }
      if (lower.includes('meeting') || lower.includes('work') || lower.includes('stress')) {
        triggers.push('Sympathetic cognitive load');
      }
      if (lower.includes('sleep') || lower.includes('late')) {
        triggers.push('Sleep deficit cascade');
      }

      setExtractedSymptoms(symptoms.length > 0 ? symptoms : ['Asymptomatic']);
      setExtractedTime(lower.includes('morning') || lower.includes('am') ? 'Morning onset' : lower.includes('afternoon') || lower.includes('pm') ? 'Afternoon onset' : 'Current daytime');
      setExtractedContext(contexts.length > 0 ? contexts : ['Standard daily routine']);
      setExtractedTriggers(triggers.length > 0 ? triggers : ['Routine autonomic homeostasis']);
      setIsAnalyzing(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [text]);

  const handleSave = () => {
    if (!text.trim()) return;

    addJournalEntry({
      rawText: text,
      extractedSymptoms,
      extractedTime,
      extractedContext,
      extractedTriggers,
    });
    setText('');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-[#EEF3F2] text-[#2F7E79] px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-[#E2EAE8]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Natural Language Health Extraction</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1F2A2A]">
          What happened today?
        </h1>
        <p className="text-sm text-[#6C7A7A] mt-1">
          Write freely in your own words. PULSE quietly extracts symptoms, contexts, and possible triggers to build your preventive timeline.
        </p>
      </div>

      {/* Preset Inspirations */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6C7A7A] block mb-2">
          Demo Scenarios
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setText(preset.text);
                setExtractedSymptoms(preset.symptoms);
                setExtractedTime(preset.time);
                setExtractedContext(preset.context);
                setExtractedTriggers(preset.triggers);
              }}
              className="touch-target p-3 text-left rounded-xl bg-white border border-[#E2EAE8] hover:border-[#2F7E79] hover:bg-[#EEF3F2]/40 transition-all text-xs"
            >
              <span className="font-semibold text-[#1F2A2A] block mb-1">
                {preset.title}
              </span>
              <p className="text-[#6C7A7A] line-clamp-2 leading-relaxed">
                {preset.text}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Journal Writing Box & Live AI Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Serene Writing Surface */}
        <div className="lg:col-span-7 bg-white border border-[#E2EAE8] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEF3F2] pb-3">
            <div className="flex items-center gap-2 text-xs text-[#6C7A7A]">
              <PenLine className="w-4 h-4 text-[#2F7E79]" />
              <span className="font-medium text-[#1F2A2A]">Daily Health Reflection</span>
            </div>
            {isAnalyzing && (
              <span className="text-[11px] text-[#5F8F8B] animate-pulse">
                Extracting signals...
              </span>
            )}
          </div>

          <textarea
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type naturally (e.g., 'Woke up feeling a bit stiff in the neck after 6 hours of sleep. Drank water and took a 20-minute walk before work...')"
            className="w-full bg-[#F7F8F7] border border-[#E2EAE8] focus:border-[#2F7E79] focus:bg-white rounded-2xl p-4 text-sm text-[#1F2A2A] placeholder-[#6C7A7A] focus:outline-hidden leading-relaxed resize-none transition-all"
          />

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#6C7A7A]">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>

            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className={`touch-target inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all ${
                text.trim()
                  ? 'bg-[#2F7E79] hover:bg-[#266864] text-white shadow-sm'
                  : 'bg-[#EEF3F2] text-[#6C7A7A] cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>Save to Health Timeline</span>
            </button>
          </div>
        </div>

        {/* Right: Real-Time AI Extraction Card */}
        <div className="lg:col-span-5 bg-white border border-[#E2EAE8] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EEF3F2] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2F7E79]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2F7E79]">
                Live AI Signal Extraction
              </span>
            </div>
            <span className="text-[11px] text-[#5F8F8B] bg-[#EEF3F2] px-2 py-0.5 rounded-full">
              Non-Diagnostic
            </span>
          </div>

          <div className="space-y-4">
            {/* Symptoms */}
            <div>
              <span className="text-xs font-medium text-[#6C7A7A] flex items-center gap-1.5 mb-1.5">
                <Activity className="w-3.5 h-3.5 text-[#5F8F8B]" />
                Detected Sensations / Symptoms
              </span>
              <div className="flex flex-wrap gap-1.5">
                {extractedSymptoms.map((sym, i) => (
                  <span
                    key={i}
                    className="bg-[#EEF3F2] text-[#2F7E79] text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#E2EAE8]"
                  >
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            {/* Time / Onset */}
            <div>
              <span className="text-xs font-medium text-[#6C7A7A] flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#5F8F8B]" />
                Estimated Temporal Window
              </span>
              <span className="text-xs font-medium text-[#1F2A2A] bg-[#F7F8F7] border border-[#E2EAE8] px-2.5 py-1 rounded-lg inline-block">
                {extractedTime || 'Real-time observation'}
              </span>
            </div>

            {/* Context */}
            <div>
              <span className="text-xs font-medium text-[#6C7A7A] flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#5F8F8B]" />
                Physiological & Environmental Context
              </span>
              <ul className="space-y-1 text-xs text-[#1F2A2A]">
                {extractedContext.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#5F8F8B]">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Possible Triggers */}
            <div className="pt-2 border-t border-[#EEF3F2]">
              <span className="text-xs font-medium text-[#6C7A7A] flex items-center gap-1.5 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#D8B26E]" />
                Observed Tri-Factor Precursors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {extractedTriggers.map((trig, i) => (
                  <span
                    key={i}
                    className="bg-[#FFF8EE] text-[#97732E] text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-[#F3E7D3]"
                  >
                    {trig}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History of Journal Entries */}
      {journalEntries.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#E2EAE8]">
          <h3 className="text-base font-semibold text-[#1F2A2A]">
            Previous Reflections Today
          </h3>
          <div className="space-y-2">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-[#E2EAE8] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#1F2A2A]">{entry.timestamp}</span>
                    <span className="text-[#5F8F8B]">•</span>
                    <span className="text-[#2F7E79] font-medium">
                      {entry.extractedSymptoms.join(', ')}
                    </span>
                  </div>
                  <p className="text-[#6C7A7A] line-clamp-1">{entry.rawText}</p>
                </div>

                <button
                  onClick={() => setActiveTab('investigation')}
                  className="inline-flex items-center gap-1 text-[#2F7E79] font-medium hover:underline whitespace-nowrap"
                >
                  <span>Correlate in Health Replay™</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
