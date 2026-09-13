'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  AlertTriangle,
  Heart,
  Pill,
  Copy,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { useHealth } from '@/context/HealthContext';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, emergencyProfile, userProfile } =
    useHealth();
  const [copied, setCopied] = useState(false);

  if (!isEmergencyModalOpen) return null;

  const handleCopySummary = () => {
    const summary = `EMERGENCY MEDICAL PROFILE
Patient: ${userProfile.name} (${userProfile.age}y, ${userProfile.gender})
Blood Group: ${emergencyProfile.bloodGroup}
CRITICAL ALLERGIES: ${emergencyProfile.severeAllergies.join(', ')}
Medications: ${emergencyProfile.activeMedications.join(', ')}
Primary Contact: ${emergencyProfile.emergencyContacts[0]?.name} (${emergencyProfile.emergencyContacts[0]?.phone})
Directives: ${emergencyProfile.medicalDirectives}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsEmergencyModalOpen(false)}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#D97A7A]/30 flex flex-col max-h-[92vh]"
        >
          {/* Top Triage Banner */}
          <div className="bg-[#D97A7A] text-white p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6" />
              <div>
                <h2 className="text-lg font-bold tracking-tight leading-none">
                  Emergency Medical Card
                </h2>
                <span className="text-[11px] opacity-90">
                  {userProfile.name} • Age {userProfile.age}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick-Scan Emergency Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-[#162020]">
            {/* Top Critical Row: Blood Group & Organ Donor */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFF5F5] border-2 border-[#D97A7A] rounded-2xl p-4 text-center">
                <span className="text-xs font-bold text-[#D97A7A] uppercase tracking-wider block">
                  Blood Group
                </span>
                <span className="text-3xl sm:text-4xl font-black text-[#162020] block mt-0.5">
                  {emergencyProfile.bloodGroup.split(' ')[0]}
                </span>
                <span className="text-[11px] text-[#708080]">Rh Positive</span>
              </div>

              <div className="bg-[#F8FAF9] border border-[#EAEFEF] rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-xs text-[#708080] block">Organ Donor</span>
                <span className="text-sm font-bold text-[#2F7E79] flex items-center gap-1.5 mt-0.5">
                  <Heart className="w-4 h-4 text-[#2F7E79]" />
                  Yes (Registered)
                </span>
                <span className="text-[11px] text-[#708080] mt-1">
                  {emergencyProfile.chronicConditions[0] || 'None'}
                </span>
              </div>
            </div>

            {/* SEVERE ALLERGIES - High Contrast Alert */}
            <div className="bg-[#FFF5F5] border-2 border-[#D97A7A] rounded-2xl p-4">
              <div className="flex items-center gap-1.5 text-[#D97A7A] text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Severe Allergies (Critical)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {emergencyProfile.severeAllergies.map((all, i) => (
                  <span
                    key={i}
                    className="bg-white border border-[#D97A7A] text-[#D97A7A] text-xs font-bold px-3 py-1 rounded-xl shadow-xs"
                  >
                    {all}
                  </span>
                ))}
              </div>
            </div>

            {/* Tap-to-Call Emergency Contacts */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#708080]">
                Emergency Contacts
              </span>
              <div className="space-y-2">
                {emergencyProfile.emergencyContacts.map((contact, i) => (
                  <div
                    key={i}
                    className="bg-[#F8FAF9] border border-[#EAEFEF] rounded-2xl p-3.5 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#162020]">
                          {contact.name}
                        </span>
                        {contact.isPrimary && (
                          <span className="text-[10px] bg-[#EEF5F4] text-[#2F7E79] font-bold px-2 py-0.2 rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#708080]">
                        {contact.relationship} • {contact.phone}
                      </span>
                    </div>

                    <a
                      href={`tel:${contact.phone}`}
                      className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Medications */}
            <div className="bg-[#F8FAF9] border border-[#EAEFEF] rounded-2xl p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2F7E79] mb-1.5">
                <Pill className="w-3.5 h-3.5" />
                <span>Active Medications</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs font-medium text-[#162020]">
                {emergencyProfile.activeMedications.map((m, i) => (
                  <span
                    key={i}
                    className="bg-white border border-[#EAEFEF] px-2.5 py-1 rounded-lg text-xs"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Directive note */}
            <div className="text-[11px] text-[#708080] bg-[#EEF5F4] p-3 rounded-xl">
              <span className="font-bold text-[#162020]">Directives: </span>
              {emergencyProfile.medicalDirectives}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[#EAEFEF] bg-[#F8FAF9] flex items-center justify-between">
            <button
              onClick={handleCopySummary}
              className="touch-target inline-flex items-center gap-1.5 text-xs font-bold text-[#162020] bg-white border border-[#EAEFEF] hover:bg-[#F8FAF9] px-3.5 py-2 rounded-xl transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#679E73]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="touch-target px-5 py-2 rounded-xl bg-[#2F7E79] text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
