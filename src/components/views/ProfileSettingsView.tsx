'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import {
  User,
  ShieldCheck,
  Watch,
  ShieldAlert,
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
      name: name.trim() || 'Karan Sharma',
      age: parseInt(age, 10) || 32,
      height: height.trim() || `5'10"`,
      weight: weight.trim() || '158 lbs',
      activityLevel: activityLevel || 'Moderately Active',
    }));
    showToast('Personal profile updated.');
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAEFEF] pb-4">
        <div>
          <h1 className="text-xl font-bold text-[#162020]">
            Profile &amp; Settings
          </h1>
          <span className="text-xs text-[#708080]">
            Personal baseline preferences &amp; devices
          </span>
        </div>

        <span className="text-xs font-semibold text-[#2F7E79] bg-[#EEF5F4] px-2.5 py-0.5 rounded-full">
          {baselineStatus.daysCalibrated}d Calibrated
        </span>
      </div>

      {/* Apple Medical ID & Emergency Section */}
      <div className="bg-white border border-[#FF3B30]/20 rounded-2xl p-5 shadow-[0_2px_12px_rgba(255,59,48,0.06)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#FF3B30]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF3B30] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#1D1D1F]">
                  Apple Medical ID • Emergency &amp; Accident Profile
                </h3>
                <span className="bg-[#FF3B30]/10 text-[#FF3B30] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  First Responder Ready
                </span>
              </div>
              <span className="text-xs text-[#86868B]">
                Immediate triage telemetry, universal blood compatibility, and family contacts
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 bg-[#FF3B30] hover:bg-[#E03126] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-[0.98] whitespace-nowrap"
          >
            <span>Open Full Medical ID</span>
          </button>
        </div>

        {/* Quick Accident Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#F5F5F7] rounded-xl p-3">
            <span className="text-[10px] uppercase font-semibold text-[#86868B] block mb-0.5">Blood &amp; Rh</span>
            <span className="font-bold text-[#FF3B30] text-sm">B+ Rh Positive</span>
            <span className="text-[10px] text-[#86868B] block mt-0.5">Takes B+, B-, O+, O-</span>
          </div>

          <div className="bg-[#FFF2F2] border border-[#FF3B30]/15 rounded-xl p-3">
            <span className="text-[10px] uppercase font-semibold text-[#FF3B30] block mb-0.5">Critical Allergy</span>
            <span className="font-bold text-[#FF3B30] text-sm">Penicillin</span>
            <span className="text-[10px] text-[#FF3B30]/80 block mt-0.5">Anaphylaxis Risk</span>
          </div>

          <div className="bg-[#F5F5F7] rounded-xl p-3">
            <span className="text-[10px] uppercase font-semibold text-[#86868B] block mb-0.5">Preferred Trauma ER</span>
            <span className="font-bold text-[#1D1D1F] text-xs">Lilavati Hospital</span>
            <span className="text-[10px] text-[#86868B] block mt-0.5">Bandra West • Level-1</span>
          </div>

          <div className="bg-[#F5F5F7] rounded-xl p-3">
            <span className="text-[10px] uppercase font-semibold text-[#86868B] block mb-0.5">Insurance / Cashless</span>
            <span className="font-bold text-[#1D1D1F] text-xs">Star Health Premier</span>
            <span className="text-[10px] text-[#86868B] block mt-0.5 truncate">#SH-8492041-A</span>
          </div>
        </div>

        {/* Emergency Contacts Strip */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#86868B]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#1D1D1F]">Primary ICE:</span>
            <span className="text-[#48484A]">Priya Sharma (Spouse): +91 98201 44321</span>
            <span className="text-[#86868B] hidden sm:inline">•</span>
            <span className="text-[#48484A] hidden sm:inline">Dr. Rajesh Iyer: +91 98190 22110</span>
          </div>
          <span className="text-[11px] text-[#1D7A74] font-medium">4 Verified Contacts Configured</span>
        </div>
      </div>


      {/* Profile Information Form */}
      <div className="bg-white border border-[#EAEFEF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0F4F3] pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#2F7E79]" />
            <h2 className="text-xs font-bold text-[#162020]">
              Personal Information
            </h2>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#708080] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#708080] mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#708080] mb-1">
                Height
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#708080] mb-1">
                Weight
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-[#708080] mb-1">
              Daily Activity
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setActivityLevel(lvl as any)}
                  className={`py-1.5 px-2 text-xs font-medium rounded-xl border transition-all ${
                    activityLevel === lvl
                      ? 'bg-[#EEF5F4] border-[#2F7E79] text-[#2F7E79] font-bold'
                      : 'bg-[#F8FAF9] border-[#EAEFEF] text-[#708080] hover:bg-white'
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
              className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>

      {/* Connected Wearables & Sensors */}
      <div className="bg-white border border-[#EAEFEF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
        <div className="flex items-center justify-between border-b border-[#F0F4F3] pb-3">
          <div className="flex items-center gap-2">
            <Watch className="w-4 h-4 text-[#2F7E79]" />
            <h2 className="text-xs font-bold text-[#162020]">
              Sensors &amp; Wearables
            </h2>
          </div>
          <span className="text-[11px] text-[#708080]">Passive Sync</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {[
            { name: 'Apple Health', status: 'Connected • Sleep & HRV', isConnected: true },
            { name: 'Oura Ring Gen 3', status: 'Connected • Temperature', isConnected: true },
            { name: 'Garmin Connect', status: 'Standby • Ready', isConnected: false },
            { name: 'Google Fit', status: 'Standby • Ready', isConnected: false },
          ].map((dev, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border flex items-center justify-between ${
                dev.isConnected
                  ? 'bg-[#EEF5F4]/60 border-[#8FB5AF]/40'
                  : 'bg-[#F8FAF9] border-[#EAEFEF]'
              }`}
            >
              <div>
                <span className="font-bold text-[#162020] block">{dev.name}</span>
                <span className="text-[#708080] text-[11px] block">{dev.status}</span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  dev.isConnected ? 'bg-[#2F7E79] text-white' : 'bg-white text-[#708080] border border-[#EAEFEF]'
                }`}
              >
                {dev.isConnected ? 'Active' : 'Pair'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Evaluator Controls */}
      <div className="bg-white border border-[#EAEFEF] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-3">
        <div className="flex items-center gap-2 border-b border-[#F0F4F3] pb-3">
          <Sparkles className="w-4 h-4 text-[#2F7E79]" />
          <h2 className="text-xs font-bold text-[#162020]">
            Demo &amp; Onboarding Controls
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#162020] block">
                Onboarding Flow
              </span>
              <p className="text-[11px] text-[#708080] mt-0.5">
                Re-experience the 5-step onboarding walkthrough.
              </p>
            </div>
            <button
              onClick={resetToOnboarding}
              className="touch-target inline-flex items-center justify-center gap-1.5 bg-white border border-[#EAEFEF] hover:border-[#2F7E79] text-[#2F7E79] text-xs font-semibold py-1.5 px-3 rounded-lg mt-2.5 transition-all"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Launch Onboarding</span>
            </button>
          </div>

          <div className="bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#162020] block">
                Demo Baseline
              </span>
              <p className="text-[11px] text-[#708080] mt-0.5">
                Switch between calibrated data and fresh empty state.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2.5">
              <button
                onClick={() => {
                  setDemoMode('calibrated');
                  showToast('Switched to 94-day Calibrated mode.');
                }}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  demoMode === 'calibrated'
                    ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                    : 'bg-white border-[#EAEFEF] text-[#708080]'
                }`}
              >
                94d Calibrated
              </button>
              <button
                onClick={() => {
                  setDemoMode('empty');
                  showToast('Switched to Fresh (0d) mode.');
                }}
                className={`flex-1 py-1 text-xs font-semibold rounded-lg border transition-all ${
                  demoMode === 'empty'
                    ? 'bg-[#2F7E79] text-white border-[#2F7E79]'
                    : 'bg-white border-[#EAEFEF] text-[#708080]'
                }`}
              >
                Fresh (0d)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Local Privacy Note */}
      <div className="bg-[#EEF5F4] border border-[#8FB5AF]/30 rounded-2xl p-4 flex items-start gap-3">
        <Lock className="w-4 h-4 text-[#2F7E79] shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-[#2F7E79] block mb-0.5">
            Private &amp; Local
          </span>
          <p className="text-[#708080] leading-relaxed">
            All physiological data and reflection entries are processed on device. PULSE never shares records without clinical consent.
          </p>
        </div>
      </div>
    </div>
  );
};
