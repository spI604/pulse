'use client';

import React, { useState, useEffect } from 'react';
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
      title: 'Tension headache',
      text: 'Woke up at 6:30 AM with a throbbing tension headache behind my right temple. Stayed up past midnight on the screen, only drank two cups of coffee, and postponed breakfast until 1 PM.',
      symptoms: ['Right Temporal Tension Headache', 'Cervical Muscle Tightness'],
      time: '06:30 AM',
      context: ['Late screen exposure', 'Fluid deficit'],
      triggers: ['Sleep curtailment', 'Caffeine before water', 'Delayed meal'],
    },
    {
      title: 'Afternoon fatigue',
      text: 'Noticed moderate dizziness and cognitive fatigue around 2:15 PM following 4 back-to-back video calls without water or lunch.',
      symptoms: ['Cognitive Fatigue', 'Mild Postural Dizziness'],
      time: '02:15 PM',
      context: ['Sedentary screen time', 'Skipped midday meal'],
      triggers: ['Cognitive load', 'Dehydration'],
    },
    {
      title: 'Restorative recovery',
      text: 'Slept 8 hours continuously. Enjoyed 30 minutes of morning sun and an electrolyte water bottle. Zero headache, energy is 5/5.',
      symptoms: ['Asymptomatic'],
      time: 'Morning',
      context: ['8 hours unbroken sleep', 'Hydration pacing on target'],
      triggers: ['Restorative recovery'],
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
        symptoms.push('General Sensation');
      }

      const contexts: string[] = [];
      if (lower.includes('screen') || lower.includes('computer') || lower.includes('monitor')) {
        contexts.push('Screen exposure');
      }
      if (lower.includes('coffee') || lower.includes('caffeine')) {
        contexts.push('Caffeine before water');
      }
      if (lower.includes('late') || lower.includes('midnight') || lower.includes('sleep')) {
        contexts.push('Sleep variability');
      }
      if (lower.includes('breakfast') || lower.includes('lunch') || lower.includes('fasting')) {
        contexts.push('Delayed meal');
      }

      const triggers: string[] = [];
      if (lower.includes('coffee') || lower.includes('water') || lower.includes('drank')) {
        triggers.push('Fluid buffer deficit');
      }
      if (lower.includes('meeting') || lower.includes('work') || lower.includes('stress')) {
        triggers.push('Cognitive strain');
      }
      if (lower.includes('sleep') || lower.includes('late')) {
        triggers.push('Sleep deficit');
      }

      setExtractedSymptoms(symptoms.length > 0 ? symptoms : ['Asymptomatic']);
      setExtractedTime(lower.includes('morning') || lower.includes('am') ? 'Morning onset' : lower.includes('afternoon') || lower.includes('pm') ? 'Afternoon onset' : 'Current daytime');
      setExtractedContext(contexts.length > 0 ? contexts : ['Standard routine']);
      setExtractedTriggers(triggers.length > 0 ? triggers : ['Homeostasis']);
      setIsAnalyzing(false);
    }, 400);

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
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAEFEF] pb-4">
        <div>
          <h1 className="text-xl font-bold text-[#162020]">
            Health Journal
          </h1>
          <span className="text-xs text-[#708080]">
            Natural language signal extraction
          </span>
        </div>

        {/* Demo scenarios */}
        <div className="hidden sm:flex items-center gap-1.5">
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
              className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/40 text-[#708080] hover:text-[#162020] transition-all"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Journal Writing & Live AI Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Serene Writing Surface */}
        <div className="lg:col-span-7 bg-white border border-[#EAEFEF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#162020]">
              Reflection
            </span>
            {isAnalyzing && (
              <span className="text-[11px] text-[#2F7E79] animate-pulse">
                Extracting signals...
              </span>
            )}
          </div>

          <textarea
            rows={7}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type naturally (e.g., 'Woke up with mild stiffness after 6 hours of sleep...')"
            className="w-full bg-[#F8FAF9] border border-[#EAEFEF] focus:border-[#2F7E79] focus:bg-white rounded-xl p-3.5 text-xs text-[#162020] placeholder-[#8FA0A0] focus:outline-hidden leading-relaxed resize-none transition-all"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#8FA0A0]">
              {text.trim().split(/\s+/).filter(Boolean).length} words
            </span>

            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className={`touch-target inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                text.trim()
                  ? 'bg-[#2F7E79] hover:bg-[#266864] text-white'
                  : 'bg-[#EEF5F4] text-[#8FA0A0] cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Entry</span>
            </button>
          </div>
        </div>

        {/* Right: Real-Time AI Extraction Panel */}
        <div className="lg:col-span-5 bg-white border border-[#EAEFEF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F0F4F3] pb-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2F7E79]" />
              <span className="text-xs font-bold text-[#162020]">
                Extracted Signals
              </span>
            </div>
            <span className="text-[10px] text-[#708080] bg-[#F0F4F3] px-2 py-0.5 rounded-full">
              Real-time
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Symptoms */}
            <div>
              <span className="text-[11px] font-medium text-[#708080] block mb-1">
                Symptoms
              </span>
              <div className="flex flex-wrap gap-1">
                {extractedSymptoms.map((sym, i) => (
                  <span
                    key={i}
                    className="bg-[#EEF5F4] text-[#2F7E79] font-semibold px-2 py-0.5 rounded-md text-[11px]"
                  >
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            {/* Time */}
            <div>
              <span className="text-[11px] font-medium text-[#708080] block mb-0.5">
                Onset Window
              </span>
              <span className="text-[11px] text-[#162020] font-medium">
                {extractedTime || 'Daytime'}
              </span>
            </div>

            {/* Context */}
            <div>
              <span className="text-[11px] font-medium text-[#708080] block mb-1">
                Context
              </span>
              <ul className="space-y-0.5 text-[11px] text-[#162020]">
                {extractedContext.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-[#2F7E79]">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Triggers */}
            <div className="pt-2 border-t border-[#F0F4F3]">
              <span className="text-[11px] font-medium text-[#708080] block mb-1">
                Possible Precursors
              </span>
              <div className="flex flex-wrap gap-1">
                {extractedTriggers.map((trig, i) => (
                  <span
                    key={i}
                    className="bg-[#FFF8EE] text-[#97732E] text-[11px] font-medium px-2 py-0.5 rounded-md border border-[#F3E7D3]"
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
        <div className="space-y-2.5 pt-2">
          <span className="text-xs font-bold text-[#162020] block">
            Previous Reflections
          </span>
          <div className="space-y-2">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-[#EAEFEF] rounded-2xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-[#162020]">{entry.timestamp}</span>
                    <span className="text-[#8FA0A0]">•</span>
                    <span className="text-[#2F7E79] font-medium">
                      {entry.extractedSymptoms.join(', ')}
                    </span>
                  </div>
                  <p className="text-[#708080] line-clamp-1">{entry.rawText}</p>
                </div>

                <button
                  onClick={() => setActiveTab('investigation')}
                  className="inline-flex items-center gap-1 text-[#2F7E79] font-semibold hover:underline whitespace-nowrap text-xs"
                >
                  <span>Health Replay™</span>
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
