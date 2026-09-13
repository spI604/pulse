'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  User,
  ShieldCheck,
  Watch,
  ShieldAlert,
  RotateCcw,
  Compass,
  Lock,
  Check,
  Sparkles,
} from 'lucide-react';

export const ProfileSettingsView: React.FC = () => {
  const {
    userProfile,
    setUserProfile,
    setIsEmergencyModalOpen,
    resetToOnboarding,
    demoMode,
    setDemoMode,
    baselineStatus,
    showToast,
  } = useHealth();

  const [name, setName] = useState(userProfile.name);
  const [age, setAge] = useState(userProfile.age.toString());
  const [height, setHeight] = useState(userProfile.height);
  const [weight, setWeight] = useState(userProfile.weight);
  const [activityLevel, setActivityLevel] = useState(userProfile.activityLevel);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name: name.trim() || 'Arjun Sharma',
      age: parseInt(age, 10) || 34,
      height: height.trim() || `5'10"`,
      weight: weight.trim() || '158 lbs',
      activityLevel: activityLevel || 'Moderately Active',
    }));
    showToast('Personal profile updated successfully.');
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-[#E2EAE8] pb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#EEF3F2] text-[#2F7E79] px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-[#E2EAE8]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Profile &amp; Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1F2A2A]">
          Settings &amp; Personal Preferences
        </h1>
        <p className="text-sm text-[#6C7A7A] mt-1">
          Manage your dynamic health profile, connected wearables, baseline settings, and emergency directives.
        </p>
      </div>

      {/* Emergency Profile Quick Banner */}
      <div className="bg-[#FFF0F0] border border-[#D97A7A]/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#D97A7A] text-white flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1F2A2A]">
              Emergency Medical Profile
            </h3>
            <p className="text-xs text-[#6C7A7A] mt-0.5">
              Blood type, anaphylactic allergies, active prescriptions, and emergency contacts accessible in one click.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEmergencyModalOpen(true)}
          className="touch-target inline-flex items-center gap-2 bg-[#D97A7A] hover:bg-[#C55F5F] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-xs whitespace-nowrap"
        >
          <span>View Emergency Card</span>
        </button>
      </div>

      {/* Dynamic Profile Information Form */}
      <div className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#EEF3F2] pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#2F7E79]" />
            <h2 className="text-base font-semibold text-[#1F2A2A]">
              Personal Health Profile
            </h2>
          </div>
          <span className="text-xs text-[#5F8F8B]">Dynamic Profile Active</span>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#1F2A2A] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1F2A2A] mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#1F2A2A] mb-1">
                Height
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1F2A2A] mb-1">
                Weight
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-4 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1F2A2A] mb-1">
              Typical Daily Activity Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setActivityLevel(lvl as any)}
                  className={`touch-target py-2 px-3 text-xs font-medium rounded-xl border transition-all ${
                    activityLevel === lvl
                      ? 'bg-[#EEF3F2] border-[#2F7E79] text-[#2F7E79]'
                      : 'bg-[#F7F8F7] border-[#E2EAE8] text-[#6C7A7A] hover:bg-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Connected Wearables & Sensors */}
      <div className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#EEF3F2] pb-4">
          <div className="flex items-center gap-2">
            <Watch className="w-5 h-5 text-[#2F7E79]" />
            <h2 className="text-base font-semibold text-[#1F2A2A]">
              Connected Sensors &amp; Wearables
            </h2>
          </div>
          <span className="text-xs text-[#5F8F8B]">Passive Health Sync</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            { name: 'Apple Health', status: 'Connected • Syncing Sleep & HRV', isConnected: true },
            { name: 'Oura Ring Gen 3', status: 'Connected • Temperature & Sleep Stages', isConnected: true },
            { name: 'Garmin Connect', status: 'Standby • Ready to link', isConnected: false },
            { name: 'Google Fit', status: 'Standby • Ready to link', isConnected: false },
          ].map((dev, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                dev.isConnected
                  ? 'bg-[#EEF3F2]/50 border-[#8FB5AF]/40'
                  : 'bg-[#F7F8F7] border-[#E2EAE8]'
              }`}
            >
              <div>
                <span className="font-semibold text-[#1F2A2A] block">{dev.name}</span>
                <span className="text-[#6C7A7A] text-[11px] block mt-0.5">{dev.status}</span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  dev.isConnected ? 'bg-[#2F7E79] text-white' : 'bg-white text-[#6C7A7A] border border-[#E2EAE8]'
                }`}
              >
                {dev.isConnected ? 'Active' : 'Pair'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluator & Demonstration Tools */}
      <div className="bg-white border border-[#E2EAE8] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EEF3F2] pb-4">
          <Sparkles className="w-5 h-5 text-[#2F7E79]" />
          <h2 className="text-base font-semibold text-[#1F2A2A]">
            Evaluator &amp; Onboarding Controls
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#1F2A2A] block">
                Walkthrough Onboarding
              </span>
              <p className="text-xs text-[#6C7A7A] mt-1">
                Re-experience the 5-step onboarding flow from the welcome screen.
              </p>
            </div>
            <button
              onClick={resetToOnboarding}
              className="touch-target inline-flex items-center justify-center gap-2 bg-white border border-[#E2EAE8] hover:border-[#2F7E79] text-[#2F7E79] text-xs font-semibold py-2 px-4 rounded-xl mt-3 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Launch Onboarding Flow</span>
            </button>
          </div>

          <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#1F2A2A] block">
                Demo Baseline State
              </span>
              <p className="text-xs text-[#6C7A7A] mt-1">
                Toggle between 94-day calibrated data and clean empty states.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => {
                  setDemoMode('calibrated');
                  showToast('Switched to 94-day Calibrated Baseline mode.');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  demoMode === 'calibrated'
                    ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                    : 'bg-white border-[#E2EAE8] text-[#6C7A7A]'
                }`}
              >
                Calibrated (94d)
              </button>
              <button
                onClick={() => {
                  setDemoMode('empty');
                  showToast('Switched to Fresh Baseline (Empty States) mode.');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  demoMode === 'empty'
                    ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                    : 'bg-white border-[#E2EAE8] text-[#6C7A7A]'
                }`}
              >
                Fresh (0d)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Local Privacy & Security Assurance */}
      <div className="bg-[#EEF3F2] border border-[#8FB5AF]/30 rounded-3xl p-6 flex items-start gap-3.5">
        <Lock className="w-5 h-5 text-[#2F7E79] shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-semibold text-[#2F7E79] block mb-0.5">
            Privacy Preserving Architecture
          </span>
          <p className="text-[#6C7A7A] leading-relaxed">
            Your physiological metrics and journal entries are processed locally on device. PULSE never sells health information or shares records without your explicit clinical consent.
          </p>
        </div>
      </div>
    </div>
  );
};
