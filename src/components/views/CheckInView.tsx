'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import confetti from 'canvas-confetti';
import {
  Smile,
  Meh,
  Frown,
  CheckCircle2,
  Droplets,
  Plus,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const CheckInView: React.FC = () => {
  const { addCheckIn, setActiveTab } = useHealth();

  // Step state (0 to 3) or completion (4)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Form selections
  const [overallFeeling, setOverallFeeling] = useState<'great' | 'okay' | 'off'>('great');
  const [mood, setMood] = useState<number>(4);
  const [energy, setEnergy] = useState<number>(4);
  const [stressLevel, setStressLevel] = useState<'low' | 'mild' | 'elevated'>('low');
  const [sleepQuality, setSleepQuality] = useState<'restful' | 'average' | 'disrupted'>('restful');
  const [hydrationLitres, setHydrationLitres] = useState<number>(2.0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptomInput, setCustomSymptomInput] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const commonSymptoms = ['Headache', 'Fatigue', 'Nausea', 'Dizziness', 'Muscle Tension', 'Eye Strain'];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleAddCustomSymptom = () => {
    if (customSymptomInput.trim() && !selectedSymptoms.includes(customSymptomInput.trim())) {
      setSelectedSymptoms((prev) => [...prev, customSymptomInput.trim()]);
      setCustomSymptomInput('');
    }
  };

  const handleSubmit = () => {
    addCheckIn({
      overallFeeling,
      mood,
      energy,
      stressLevel,
      sleepQuality,
      hydrationLitres,
      symptoms: selectedSymptoms,
      note,
    });

    setIsCompleted(true);

    // Subtle, gentle micro-delight confetti
    confetti({
      particleCount: 35,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#2F7E79', '#8FB5AF', '#EEF3F2'],
      ticks: 150,
      disableForReducedMotion: true,
    });
  };

  const totalSteps = 4;

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        className="max-w-xl mx-auto py-12 px-4 text-center"
      >
        <div className="bg-white border border-[#E2EAE8] rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-[#EEF3F2] text-[#2F7E79] flex items-center justify-center mx-auto mb-5 border border-[#8FB5AF]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-[#2F7E79] block mb-1">
            Check-In Recorded
          </span>

          <h2 className="text-2xl font-semibold text-[#1F2A2A] mb-3">
            Your Personal Baseline is Updated
          </h2>

          <p className="text-sm text-[#6C7A7A] max-w-md mx-auto leading-relaxed mb-6">
            Today&apos;s observation has been quietly woven into your 94-day physiological history. No alarms detected.
          </p>

          <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-2xl p-4 text-left mb-6 max-w-md mx-auto space-y-2 text-xs">
            <div className="flex justify-between text-[#6C7A7A]">
              <span>Overall State:</span>
              <span className="font-semibold text-[#1F2A2A] capitalize">{overallFeeling}</span>
            </div>
            <div className="flex justify-between text-[#6C7A7A]">
              <span>Stress Assessment:</span>
              <span className="font-semibold text-[#1F2A2A] capitalize">{stressLevel}</span>
            </div>
            <div className="flex justify-between text-[#6C7A7A]">
              <span>Reported Symptoms:</span>
              <span className="font-semibold text-[#1F2A2A]">
                {selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'None (Asymptomatic)'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-sm font-medium px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentStep(0);
              }}
              className="touch-target text-sm font-medium text-[#6C7A7A] hover:text-[#1F2A2A] px-4 py-3 rounded-xl border border-[#E2EAE8] hover:bg-[#F7F8F7] transition-all"
            >
              Log Another
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2A2A]">
              Quick Health Check-In
            </h1>
            <p className="text-xs text-[#6C7A7A] mt-0.5">
              Takes under 30 seconds. Informs your personal baseline.
            </p>
          </div>

          <span className="text-xs font-medium text-[#5F8F8B] bg-[#EEF3F2] px-3 py-1 rounded-full border border-[#E2EAE8]">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-[#EEF3F2] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2F7E79] rounded-full"
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </div>

      <div className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-xs">
        <AnimatePresence mode="wait">
          {/* STEP 1: HOW ARE YOU FEELING OVERALL? */}
          {currentStep === 0 && (
            <motion.div
              key="q-feeling"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium text-[#1F2A2A]">
                  How are you feeling overall today?
                </h2>
                <p className="text-xs text-[#6C7A7A] mt-1">
                  Choose the state that most closely describes your current physiological sense.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'great', label: 'Great', desc: 'Energized & balanced', icon: Smile },
                  { id: 'okay', label: 'Okay', desc: 'Normal baseline rhythm', icon: Meh },
                  { id: 'off', label: 'Off', desc: 'Subtle fatigue or strain', icon: Frown },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = overallFeeling === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOverallFeeling(item.id as any)}
                      className={`touch-target p-5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-[#EEF3F2] border-[#2F7E79] shadow-xs ring-1 ring-[#2F7E79]'
                          : 'bg-[#F7F8F7] border-[#E2EAE8] hover:bg-white hover:border-[#8FB5AF]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#2F7E79] text-white' : 'bg-white text-[#5F8F8B] border border-[#E2EAE8]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#2F7E79]" />
                        )}
                      </div>

                      <div>
                        <span className="text-base font-semibold text-[#1F2A2A] block">
                          {item.label}
                        </span>
                        <span className="text-xs text-[#6C7A7A] block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
                >
                  <span>Next: Energy & Mood</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MOOD, ENERGY & STRESS */}
          {currentStep === 1 && (
            <motion.div
              key="q-mood-energy"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium text-[#1F2A2A]">
                  Mood & Energy Levels
                </h2>
                <p className="text-xs text-[#6C7A7A] mt-1">
                  Rate your subjective emotional tone and physical vitality.
                </p>
              </div>

              {/* Mood Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#1F2A2A]">
                  <span>Mood Tone</span>
                  <span className="text-[#2F7E79]">{mood} / 5</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMood(val)}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                        mood === val
                          ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                          : 'bg-[#F7F8F7] border-[#E2EAE8] text-[#6C7A7A] hover:bg-white'
                      }`}
                    >
                      {val === 1 ? 'Low' : val === 3 ? 'Neutral' : val === 5 ? 'Serene' : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#1F2A2A]">
                  <span>Energy & Vigor</span>
                  <span className="text-[#2F7E79]">{energy} / 5</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setEnergy(val)}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                        energy === val
                          ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                          : 'bg-[#F7F8F7] border-[#E2EAE8] text-[#6C7A7A] hover:bg-white'
                      }`}
                    >
                      {val === 1 ? 'Drained' : val === 3 ? 'Steady' : val === 5 ? 'Vibrant' : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Level */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#1F2A2A] block">
                  Perceived Stress Level
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', label: 'Low', desc: 'Calm autonomic state' },
                    { id: 'mild', label: 'Mild', desc: 'Manageable tasks' },
                    { id: 'elevated', label: 'Elevated', desc: 'Noticeable tension' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setStressLevel(lvl.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        stressLevel === lvl.id
                          ? 'bg-[#EEF3F2] border-[#2F7E79] text-[#2F7E79] font-medium'
                          : 'bg-[#F7F8F7] border-[#E2EAE8] text-[#6C7A7A] hover:bg-white'
                      }`}
                    >
                      <span className="text-xs font-semibold block">{lvl.label}</span>
                      <span className="text-[10px] text-[#6C7A7A] block mt-0.5">{lvl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="text-xs font-medium text-[#6C7A7A] hover:text-[#1F2A2A]"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
                >
                  <span>Next: Sleep & Hydration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SLEEP QUALITY & HYDRATION */}
          {currentStep === 2 && (
            <motion.div
              key="q-sleep-hydration"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium text-[#1F2A2A]">
                  Sleep Restfulness & Hydration
                </h2>
                <p className="text-xs text-[#6C7A7A] mt-1">
                  Circadian and fluid metrics act as key buffers against acute symptoms.
                </p>
              </div>

              {/* Sleep Quality */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-[#1F2A2A] block">
                  Last Night&apos;s Sleep Restfulness
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'restful', label: 'Restful', desc: 'Woke refreshed' },
                    { id: 'average', label: 'Average', desc: 'Adequate recovery' },
                    { id: 'disrupted', label: 'Disrupted', desc: 'Restless / short' },
                  ].map((sq) => (
                    <button
                      key={sq.id}
                      type="button"
                      onClick={() => setSleepQuality(sq.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        sleepQuality === sq.id
                          ? 'bg-[#EEF3F2] border-[#2F7E79] text-[#2F7E79] font-medium'
                          : 'bg-[#F7F8F7] border-[#E2EAE8] text-[#6C7A7A] hover:bg-white'
                      }`}
                    >
                      <span className="text-xs font-semibold block">{sq.label}</span>
                      <span className="text-[10px] text-[#6C7A7A] block mt-0.5">{sq.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hydration Tally */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#1F2A2A]">
                  <span>Today&apos;s Fluid Intake</span>
                  <span className="text-[#2F7E79] font-semibold">{hydrationLitres.toFixed(1)} Litres</span>
                </div>
                <div className="flex items-center gap-3 bg-[#F7F8F7] border border-[#E2EAE8] rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E2EAE8] flex items-center justify-center text-[#5F8F8B]">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0.5"
                      max="4.0"
                      step="0.1"
                      value={hydrationLitres}
                      onChange={(e) => setHydrationLitres(parseFloat(e.target.value))}
                      className="w-full accent-[#2F7E79]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6C7A7A] mt-1">
                      <span>0.5 L</span>
                      <span>Target: 2.5 L</span>
                      <span>4.0 L</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-medium text-[#6C7A7A] hover:text-[#1F2A2A]"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all"
                >
                  <span>Next: Symptoms</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SYMPTOMS (Headache, Fatigue, Nausea, Dizziness, Custom) */}
          {currentStep === 3 && (
            <motion.div
              key="q-symptoms"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium text-[#1F2A2A]">
                  Any symptoms to note?
                </h2>
                <p className="text-xs text-[#6C7A7A] mt-1">
                  Select any sensations present today, or leave unselected if feeling clear.
                </p>
              </div>

              {/* Symptom chips */}
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`touch-target px-4 py-2 text-xs font-medium rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#EEF3F2] border-[#2F7E79] text-[#2F7E79] font-semibold'
                          : 'bg-[#F7F8F7] border-[#E2EAE8] text-[#6C7A7A] hover:bg-white'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>

              {/* Custom Symptom Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customSymptomInput}
                  onChange={(e) => setCustomSymptomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomSymptom();
                    }
                  }}
                  placeholder="Add custom symptom..."
                  className="flex-1 bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-3.5 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSymptom}
                  className="touch-target px-3 py-2 bg-[#EEF3F2] text-[#2F7E79] hover:bg-[#2F7E79] hover:text-white rounded-xl text-xs font-medium transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Selected custom tags */}
              {selectedSymptoms.some((s) => !commonSymptoms.includes(s)) && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedSymptoms
                    .filter((s) => !commonSymptoms.includes(s))
                    .map((sym) => (
                      <span
                        key={sym}
                        className="inline-flex items-center gap-1 bg-[#EEF3F2] text-[#2F7E79] text-xs font-medium px-2.5 py-1 rounded-lg"
                      >
                        {sym}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => toggleSymptom(sym)}
                        />
                      </span>
                    ))}
                </div>
              )}

              {/* Optional brief note */}
              <div>
                <label className="block text-xs font-medium text-[#1F2A2A] mb-1">
                  Optional note for your timeline
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Worked under bright studio lights; feeling mild eye strain"
                  className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-3.5 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#EEF3F2]">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-medium text-[#6C7A7A] hover:text-[#1F2A2A]"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-sm font-medium px-8 py-3 rounded-xl transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Complete Check-In</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
