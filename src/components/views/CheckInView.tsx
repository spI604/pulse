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
  ArrowLeft,
} from 'lucide-react';

export const CheckInView: React.FC = () => {
  const { addCheckIn, setActiveTab } = useHealth();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Form state
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

    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.65 },
      colors: ['#2F7E79', '#8FB5AF', '#EEF5F4'],
      ticks: 120,
      disableForReducedMotion: true,
    });
  };

  const totalSteps = 4;

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-md mx-auto py-12 px-4 text-center"
      >
        <div className="bg-white border border-[#EAEFEF] rounded-3xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF5F4] text-[#2F7E79] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#162020]">
              Check-In Recorded
            </h2>
            <p className="text-xs text-[#708080] mt-1">
              Baseline updated for today
            </p>
          </div>

          <div className="bg-[#F8FAF9] rounded-2xl p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between text-[#708080]">
              <span>Overall State</span>
              <span className="font-semibold text-[#162020] capitalize">{overallFeeling}</span>
            </div>
            <div className="flex justify-between text-[#708080]">
              <span>Stress</span>
              <span className="font-semibold text-[#162020] capitalize">{stressLevel}</span>
            </div>
            <div className="flex justify-between text-[#708080]">
              <span>Symptoms</span>
              <span className="font-semibold text-[#162020]">
                {selectedSymptoms.length > 0 ? selectedSymptoms.join(', ') : 'None'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-all shadow-xs"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentStep(0);
              }}
              className="touch-target text-xs font-medium text-[#708080] hover:text-[#162020] px-4 py-2.5 rounded-xl border border-[#EAEFEF] hover:bg-[#F8FAF9] transition-all"
            >
              Log Another
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold text-[#162020]">
              Daily Check-In
            </h1>
            <p className="text-xs text-[#708080]">
              30-second physiological log
            </p>
          </div>

          <span className="text-xs font-semibold text-[#2F7E79] bg-[#EEF5F4] px-2.5 py-0.5 rounded-full">
            {currentStep + 1} of {totalSteps}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-[#EEF5F4] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#2F7E79] rounded-full"
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>

      <div className="bg-white border border-[#EAEFEF] rounded-3xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <AnimatePresence mode="wait">
          {/* STEP 1: FEELING */}
          {currentStep === 0 && (
            <motion.div
              key="step-feeling"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-6"
            >
              <h2 className="text-base font-bold text-[#162020]">
                How are you feeling overall today?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'great', label: 'Great', desc: 'Energized & balanced', icon: Smile },
                  { id: 'okay', label: 'Okay', desc: 'Normal baseline', icon: Meh },
                  { id: 'off', label: 'Off', desc: 'Fatigued or strained', icon: Frown },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = overallFeeling === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setOverallFeeling(item.id as any)}
                      className={`touch-target p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-[#EEF5F4] border-[#2F7E79] shadow-xs'
                          : 'bg-white border-[#EAEFEF] hover:border-[#8FB5AF]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#2F7E79] text-white' : 'bg-[#F0F4F3] text-[#5F8F8B]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#2F7E79]" />
                        )}
                      </div>

                      <div>
                        <span className="text-sm font-bold text-[#162020] block">
                          {item.label}
                        </span>
                        <span className="text-[11px] text-[#708080] block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MOOD & ENERGY */}
          {currentStep === 1 && (
            <motion.div
              key="step-mood-energy"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              <h2 className="text-base font-bold text-[#162020]">
                Mood &amp; Energy
              </h2>

              {/* Mood */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#162020]">
                  <span className="font-medium">Mood</span>
                  <span className="text-[#2F7E79] font-bold">{mood} / 5</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMood(val)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        mood === val
                          ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                          : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080] hover:bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#162020]">
                  <span className="font-medium">Energy</span>
                  <span className="text-[#2F7E79] font-bold">{energy} / 5</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setEnergy(val)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        energy === val
                          ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                          : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080] hover:bg-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-[#162020] block">
                  Perceived Stress
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', label: 'Low' },
                    { id: 'mild', label: 'Mild' },
                    { id: 'elevated', label: 'Elevated' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setStressLevel(lvl.id as any)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        stressLevel === lvl.id
                          ? 'bg-[#EEF5F4] border-[#2F7E79] text-[#2F7E79] font-bold'
                          : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080] hover:bg-white'
                      }`}
                    >
                      <span className="text-xs block">{lvl.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#708080] hover:text-[#162020]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SLEEP & HYDRATION */}
          {currentStep === 2 && (
            <motion.div
              key="step-sleep-hydration"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              <h2 className="text-base font-bold text-[#162020]">
                Sleep &amp; Hydration
              </h2>

              {/* Sleep Quality */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-[#162020] block">
                  Last Night&apos;s Sleep
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'restful', label: 'Restful' },
                    { id: 'average', label: 'Average' },
                    { id: 'disrupted', label: 'Disrupted' },
                  ].map((sq) => (
                    <button
                      key={sq.id}
                      type="button"
                      onClick={() => setSleepQuality(sq.id as any)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        sleepQuality === sq.id
                          ? 'bg-[#EEF5F4] border-[#2F7E79] text-[#2F7E79] font-bold'
                          : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080] hover:bg-white'
                      }`}
                    >
                      <span className="text-xs block">{sq.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hydration */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-[#162020]">
                  <span>Fluid Intake</span>
                  <span className="text-[#2F7E79] font-bold">{hydrationLitres.toFixed(1)} L</span>
                </div>
                <div className="flex items-center gap-3 bg-[#F8FAF9] rounded-2xl p-3 border border-[#EAEFEF]">
                  <Droplets className="w-4 h-4 text-[#2F7E79] shrink-0" />
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.1"
                    value={hydrationLitres}
                    onChange={(e) => setHydrationLitres(parseFloat(e.target.value))}
                    className="w-full accent-[#2F7E79]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#708080] hover:text-[#162020]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SYMPTOMS & NOTES */}
          {currentStep === 3 && (
            <motion.div
              key="step-symptoms"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="space-y-5"
            >
              <h2 className="text-base font-bold text-[#162020]">
                Any symptoms today?
              </h2>

              {/* Symptom chips */}
              <div className="flex flex-wrap gap-1.5">
                {commonSymptoms.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`touch-target px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#EEF5F4] border-[#2F7E79] text-[#2F7E79] font-bold'
                          : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080] hover:bg-white'
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
                  className="flex-1 bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSymptom}
                  className="touch-target px-3 py-2 bg-[#EEF5F4] text-[#2F7E79] hover:bg-[#2F7E79] hover:text-white rounded-xl text-xs font-semibold transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Selected custom tags */}
              {selectedSymptoms.some((s) => !commonSymptoms.includes(s)) && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSymptoms
                    .filter((s) => !commonSymptoms.includes(s))
                    .map((sym) => (
                      <span
                        key={sym}
                        className="inline-flex items-center gap-1 bg-[#EEF5F4] text-[#2F7E79] text-xs font-medium px-2.5 py-1 rounded-lg"
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
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional timeline note..."
                  className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-[#F0F4F3]">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#708080] hover:text-[#162020]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Save Check-In</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
