'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import {
  HeartPulse,
  Sparkles,
  ArrowRight,
  Check,
  Watch,
  Activity,
  Moon,
  Heart,
  Droplets,
  Smile,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { setIsOnboarded, userProfile, setUserProfile, showToast } = useHealth();
  const [step, setStep] = useState<number>(0); // 0 = Welcome, 1 = Profile, 2 = Background, 3 = Devices, 4 = Baseline, 5 = Summary

  // Local form state
  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age.toString());
  const [gender, setGender] = useState(userProfile.gender);
  const [height, setHeight] = useState(userProfile.height);
  const [weight, setWeight] = useState(userProfile.weight);

  const [conditions, setConditions] = useState(userProfile.conditions.join(', '));
  const [allergies, setAllergies] = useState(userProfile.allergies.join(', '));
  const [medications, setMedications] = useState(userProfile.medications.join(', '));
  const [activityLevel, setActivityLevel] = useState(userProfile.activityLevel);

  const [devices, setDevices] = useState({
    appleHealth: true,
    googleFit: false,
    fitbit: false,
    oura: true,
    garmin: false,
  });

  const toggleDevice = (key: keyof typeof devices) => {
    setDevices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFinish = () => {
    setUserProfile({
      name: name || 'Karan Sharma',
      age: parseInt(age, 10) || 32,
      gender: gender || 'Male',
      height: height || `5'10"`,
      weight: weight || '158 lbs',
      conditions: conditions ? conditions.split(',').map((s) => s.trim()) : [],
      allergies: allergies ? allergies.split(',').map((s) => s.trim()) : [],
      medications: medications ? medications.split(',').map((s) => s.trim()) : [],
      activityLevel: activityLevel || 'Moderately Active',
      connectedDevices: devices,
    });
    setIsOnboarded(true);
    showToast('Welcome to PULSE. Your baseline calibration has begun.');
  };

  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-[#F7F8F7] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-xl">
        {/* Top Progress bar (when in steps 1 to 5) */}
        {step > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-[#6C7A7A] mb-2 font-medium">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="flex items-center gap-1 hover:text-[#1F2A2A] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <span>
                Step {step} of {totalSteps}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#EEF3F2] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#2F7E79] rounded-full"
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* SCREEN 0: WELCOME SCREEN */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#EAEFEF] rounded-3xl p-8 md:p-12 text-center shadow-[0_2px_16px_rgba(0,0,0,0.03)]"
            >
              {/* Calm Pulsing Health Icon */}
              <div className="relative w-16 h-16 rounded-2xl bg-[#EEF5F4] flex items-center justify-center mx-auto mb-6 text-[#2F7E79]">
                <HeartPulse className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#EEF5F4] text-[#2F7E79] px-3 py-1 rounded-full text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Preventive Health Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#162020] tracking-tight mb-3">
                PULSE
              </h1>

              <blockquote className="text-base sm:text-lg font-medium text-[#2F7E79] mb-4 italic">
                &ldquo;Learn your normal. Notice when you&rsquo;re different.&rdquo;
              </blockquote>

              <p className="text-xs text-[#708080] max-w-md mx-auto leading-relaxed mb-8">
                Build your individualized physiological baseline from daily rest, heart rate, hydration, and activity—detecting patterns before they become issues.
              </p>

              <button
                onClick={() => setStep(1)}
                className="touch-target inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#2F7E79] hover:bg-[#266864] text-white font-semibold px-8 py-3 rounded-2xl text-xs shadow-xs hover:shadow transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {/* STEP 1: BASIC HEALTH PROFILE */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-[#1F2A2A] mb-1">
                Basic Health Profile
              </h2>
              <p className="text-sm text-[#6C7A7A] mb-6">
                Tell us a little about yourself to help tailor your personal physiological corridors.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#1F2A2A] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Karan Sharma"
                    className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A2A] mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="34"
                      className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A2A] mb-1.5">
                      Gender Identity
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-3 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                    >
                      <option value="Non-binary">Non-binary</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A2A] mb-1.5">
                      Height
                    </label>
                    <input
                      type="text"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={`5'10" (178 cm)`}
                      className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1F2A2A] mb-1.5">
                      Weight
                    </label>
                    <input
                      type="text"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="158 lbs (71 kg)"
                      className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white font-medium px-6 py-3 rounded-xl text-sm transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: HEALTH BACKGROUND */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-[#1F2A2A] mb-1">
                Health Background
              </h2>
              <p className="text-sm text-[#6C7A7A] mb-6">
                Optional context allows PULSE to differentiate baseline variations from clinical sensitivities.
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#1F2A2A]">
                      Known Conditions
                    </label>
                    <span className="text-[11px] text-[#6C7A7A]">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                    placeholder="e.g. Mild Allergic Rhinitis, Tension Headaches"
                    className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#1F2A2A]">
                      Allergies & Sensitivities
                    </label>
                    <span className="text-[11px] text-[#6C7A7A]">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. Penicillin, Shellfish"
                    className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#1F2A2A]">
                      Regular Medications or Supplements
                    </label>
                    <span className="text-[11px] text-[#6C7A7A]">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="e.g. Levothyroxine 50mcg, Omega-3"
                    className="touch-target w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2.5 text-sm text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1F2A2A] mb-1.5">
                    Typical Daily Activity Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setActivityLevel(level as any)}
                        className={`touch-target px-3 py-2 text-xs font-medium rounded-xl border text-center transition-all ${
                          activityLevel === level
                            ? 'bg-[#EEF3F2] border-[#2F7E79] text-[#2F7E79]'
                            : 'bg-[#F7F8F7] border-[#E2EAE8] text-[#6C7A7A] hover:bg-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(3)}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white font-medium px-6 py-3 rounded-xl text-sm transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DEVICE CONNECTIONS */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-[#1F2A2A] mb-1">
                Connect Wearables & Devices
              </h2>
              <p className="text-sm text-[#6C7A7A] mb-6">
                PULSE learns passively in the background from your existing sensors. All connections are local and secure.
              </p>

              <div className="space-y-3">
                {[
                  { key: 'appleHealth', name: 'Apple Health', note: 'Sleep, Heart Rate, HRV, Steps' },
                  { key: 'oura', name: 'Oura Ring', note: 'Resting HR, Sleep Stages, Body Temp' },
                  { key: 'fitbit', name: 'Fitbit', note: 'Daily Activity, Sleep Tracking' },
                  { key: 'garmin', name: 'Garmin Connect', note: 'Stress, Respiration, Training Load' },
                  { key: 'googleFit', name: 'Google Fit', note: 'Activity & Movement' },
                ].map((dev) => {
                  const isConnected = devices[dev.key as keyof typeof devices];
                  return (
                    <div
                      key={dev.key}
                      onClick={() => toggleDevice(dev.key as keyof typeof devices)}
                      className={`touch-target flex items-center justify-between p-3.5 px-4 rounded-2xl border cursor-pointer transition-all ${
                        isConnected
                          ? 'bg-[#EEF3F2]/60 border-[#2F7E79]'
                          : 'bg-[#F7F8F7] border-[#E2EAE8] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isConnected ? 'bg-[#2F7E79] text-white' : 'bg-white text-[#6C7A7A] border border-[#E2EAE8]'
                          }`}
                        >
                          <Watch className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[#1F2A2A] block">
                            {dev.name}
                          </span>
                          <span className="text-xs text-[#6C7A7A] block">
                            {dev.note}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          isConnected
                            ? 'bg-[#2F7E79] border-[#2F7E79] text-white'
                            : 'border-[#CBD5D3] bg-white'
                        }`}
                      >
                        {isConnected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep(4)}
                  className="text-xs text-[#6C7A7A] hover:text-[#1F2A2A] font-medium"
                >
                  Skip for now
                </button>

                <button
                  onClick={() => setStep(4)}
                  className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white font-medium px-6 py-3 rounded-xl text-sm transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: BASELINE SETUP & ANIMATED CALIBRATION */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-sm text-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#EEF3F2] border border-[#E2EAE8] flex items-center justify-center mx-auto mb-4 text-[#2F7E79]">
                <Activity className="w-8 h-8" />
              </div>

              <h2 className="text-2xl font-semibold text-[#1F2A2A] mb-2">
                Baseline Setup
              </h2>
              <p className="text-sm text-[#6C7A7A] max-w-md mx-auto mb-6">
                PULSE learns what <span className="font-semibold text-[#1F2A2A]">&ldquo;normal&rdquo;</span> means for you. Unlike rigid medical thresholds, your baseline improves continuously over time.
              </p>

              {/* Animated Baseline Calibration Corridor */}
              <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-2xl p-5 mb-6 text-left">
                <div className="flex items-center justify-between text-xs font-semibold text-[#1F2A2A] mb-3">
                  <span>Constructing Physiological Corridors</span>
                  <span className="text-[#2F7E79]">Calibrating...</span>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Moon, name: 'Sleep Corridor', range: '7.2 – 8.2 hrs' },
                    { icon: Heart, name: 'Resting Heart Rate', range: '56 – 63 bpm' },
                    { icon: Activity, name: 'Autonomic HRV', range: '55 – 72 ms' },
                    { icon: Droplets, name: 'Hydration Intake', range: '2.2 – 2.8 L' },
                    { icon: Smile, name: 'Mood & Energy Corridors', range: 'Daily balance' },
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ItemIcon className="w-4 h-4 text-[#5F8F8B]" />
                          <span className="text-xs text-[#1F2A2A] font-medium">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs text-[#6C7A7A] bg-white border border-[#E2EAE8] px-2 py-0.5 rounded-lg">
                          {item.range}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-[#EEF3F2] flex items-center gap-2 text-xs text-[#5F8F8B]">
                  <ShieldCheck className="w-4 h-4 text-[#74A57F]" />
                  <span>Continuous passive refinement starts on Day 1</span>
                </div>
              </div>

              <button
                onClick={() => setStep(5)}
                className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white font-medium px-8 py-3.5 rounded-2xl text-sm transition-all shadow-sm"
              >
                <span>View Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 5: WELCOME SUMMARY */}
          {step === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="bg-white border border-[#E2EAE8] rounded-3xl p-8 md:p-10 text-center shadow-sm"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#EEF3F2] text-[#2F7E79] flex items-center justify-center mx-auto mb-4 border border-[#8FB5AF]">
                <Check className="w-8 h-8" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-wider text-[#2F7E79] block mb-1">
                Health Profile Created
              </span>

              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1F2A2A] mb-3">
                Baseline Calibration Started
              </h2>

              <blockquote className="text-base text-[#2F7E79] font-medium italic mb-4">
                &ldquo;Your health has a history. Let&rsquo;s start learning it.&rdquo;
              </blockquote>

              <p className="text-sm text-[#6C7A7A] max-w-md mx-auto leading-relaxed mb-8">
                Welcome, <span className="font-semibold text-[#1F2A2A]">{name || 'Friend'}</span>. Your profile is ready. You can complete a quick 30-second check-in or write a natural language journal entry anytime.
              </p>

              <button
                onClick={handleFinish}
                className="touch-target inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[#2F7E79] hover:bg-[#266864] text-white font-medium px-10 py-3.5 rounded-2xl text-sm shadow-sm hover:shadow transition-all duration-150"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
