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
  Hospital,
  ShieldCheck,
  Printer,
  MapPin,
  FileCheck2,
  Ambulance,
  MessageSquare,
} from 'lucide-react';
import { useHealth } from '@/context/HealthContext';

export const EmergencyModal: React.FC = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, emergencyProfile, userProfile, showToast } =
    useHealth();
  const [copied, setCopied] = useState(false);

  if (!isEmergencyModalOpen) return null;

  const handleCopySummary = () => {
    const summary = `🚨 EMERGENCY MEDICAL ID & ACCIDENT CARD 🚨
PATIENT: ${userProfile.name} (${userProfile.age}y, ${userProfile.gender})
RESIDENCE: ${emergencyProfile.emergencyAddress || 'Bandra West, Mumbai, MH'}

CRITICAL TRIAGE:
• Blood Group: ${emergencyProfile.bloodGroup} (${emergencyProfile.rhFactor})
• Blood Compatibility: ${emergencyProfile.bloodCompatibility}
• Organ Donor: ${emergencyProfile.organDonor ? `YES (NOTTO Reg #${emergencyProfile.organDonorRegistryNumber || 'IND-88219'})` : 'No'}
• MRI Safe: ${emergencyProfile.mriSafe ? 'YES (No implants/pacemaker)' : 'Check records'}

CRITICAL ALLERGIES & WARNINGS:
${emergencyProfile.severeAllergies.map((a) => `• ⚠️ ${a}`).join('\n')}

EMERGENCY CONTACTS:
${emergencyProfile.emergencyContacts
  .map(
    (c) =>
      `• ${c.name} (${c.relationship}): ${c.phone}${c.altPhone ? ` / ${c.altPhone}` : ''} [${c.location || 'Mumbai'}]`
  )
  .join('\n')}

HOSPITAL & INSURANCE:
• Preferred Hospital: ${emergencyProfile.preferredHospital}
• Health Insurance: ${emergencyProfile.insuranceProvider} (Policy: ${emergencyProfile.insurancePolicyNumber})
• ER Direct: +91 22 2675 1000 | Ambulance: 108 / 112

ACTIVE MEDICATIONS:
${emergencyProfile.activeMedications.map((m) => `• ${m}`).join('\n')}

MEDICAL DIRECTIVES:
${emergencyProfile.medicalDirectives}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    showToast('Complete Emergency Medical Summary copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsEmergencyModalOpen(false)}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#F5F5F7] rounded-3xl shadow-2xl overflow-hidden z-10 border border-black/10 flex flex-col max-h-[94vh]"
        >
          {/* Top Apple Medical ID Banner */}
          <div className="bg-[#FF3B30] text-white p-4 sm:p-5 flex items-start justify-between shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 mt-0.5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 bg-black/20 text-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase mb-1">
                  <span>Accident &amp; First Responder Medical ID</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  {userProfile.name}
                </h2>
                <p className="text-xs text-white/90 mt-0.5">
                  {userProfile.age} yrs • {userProfile.gender} • Height {userProfile.height} • Weight {userProfile.weight}
                </p>
                <p className="text-[11px] text-white/80 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{emergencyProfile.emergencyAddress || 'Bandra West, Mumbai, MH 400050'}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content - High Triage Scannability */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-[#1D1D1F]">
            {/* 1. Critical Triage Matrix (4 cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Blood Group */}
              <div className="bg-white border-2 border-[#FF3B30] rounded-2xl p-3 text-center shadow-xs">
                <span className="text-[10px] font-bold text-[#FF3B30] uppercase tracking-wider block">
                  Blood Group
                </span>
                <span className="text-3xl font-black text-[#1D1D1F] block mt-0.5 leading-none">
                  {emergencyProfile.bloodGroup}
                </span>
                <span className="text-[10px] text-[#86868B] block mt-1 font-medium">
                  {emergencyProfile.rhFactor || 'Rh Positive'}
                </span>
              </div>

              {/* Organ Donor */}
              <div className="bg-white border border-black/8 rounded-2xl p-3 text-center flex flex-col justify-center shadow-xs">
                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">
                  Organ Donor
                </span>
                <span className="text-sm font-bold text-[#1D7A74] flex items-center justify-center gap-1 mt-0.5">
                  <Heart className="w-4 h-4 text-[#FF3B30] fill-[#FF3B30]" />
                  Yes (Registered)
                </span>
                <span className="text-[9px] text-[#86868B] mt-0.5 truncate">
                  {emergencyProfile.organDonorRegistryNumber || 'NOTTO-IND-88219'}
                </span>
              </div>

              {/* MRI Safe */}
              <div className="bg-white border border-black/8 rounded-2xl p-3 text-center flex flex-col justify-center shadow-xs">
                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">
                  MRI Compatibility
                </span>
                <span className="text-sm font-bold text-[#34C759] flex items-center justify-center gap-1 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  MRI Safe
                </span>
                <span className="text-[9px] text-[#86868B] mt-0.5">
                  No metallic implants
                </span>
              </div>

              {/* Directives */}
              <div className="bg-white border border-black/8 rounded-2xl p-3 text-center flex flex-col justify-center shadow-xs">
                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">
                  Resuscitation
                </span>
                <span className="text-sm font-bold text-[#1D1D1F] mt-0.5">
                  Full Code
                </span>
                <span className="text-[9px] text-[#86868B] mt-0.5">
                  CPR &amp; Transfusion OK
                </span>
              </div>
            </div>

            {/* Blood Compatibility Banner */}
            <div className="bg-white border border-black/6 rounded-xl p-2.5 px-3 flex items-center justify-between text-xs">
              <span className="text-[#86868B] text-[11px]">Universal Compatibility:</span>
              <span className="font-semibold text-[#1D1D1F]">
                {emergencyProfile.bloodCompatibility || 'Can receive B+, B-, O+, O-'}
              </span>
            </div>

            {/* 2. Critical Allergies Alert (Red Alert Box) */}
            <div className="bg-[#FFF2F2] border-2 border-[#FF3B30] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-[#FF3B30] text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Critical Allergies &amp; Drug Warnings</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {emergencyProfile.severeAllergies.map((all, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#FF3B30]/40 rounded-xl p-2.5 flex items-start gap-2 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF3B30] shrink-0 mt-1" />
                    <div>
                      <span className="text-xs font-bold text-[#FF3B30] block">
                        {all}
                      </span>
                      <span className="text-[10px] text-[#86868B] block mt-0.5">
                        {all.toLowerCase().includes('penicillin')
                          ? 'Strictly avoid all Beta-lactam / Amoxicillin drugs'
                          : all.toLowerCase().includes('nsaid')
                          ? 'Use Paracetamol / Acetaminophen as first-line'
                          : 'Medical precaution'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Family & Emergency Contacts (Detailed with direct Call & WhatsApp) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#86868B]">
                  Family &amp; Emergency Contacts ({emergencyProfile.emergencyContacts.length})
                </span>
                <span className="text-[10px] text-[#1D7A74] font-semibold">
                  Tap to Call Instantly
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {emergencyProfile.emergencyContacts.map((contact, i) => (
                  <div
                    key={i}
                    className={`bg-white border rounded-2xl p-3.5 flex flex-col justify-between shadow-xs transition-all ${
                      contact.isPrimary
                        ? 'border-[#1D7A74] ring-1 ring-[#1D7A74]/20'
                        : 'border-black/6'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#1D1D1F]">
                            {contact.name}
                          </span>
                          {contact.isPrimary && (
                            <span className="text-[9px] bg-[#EEF7F6] text-[#1D7A74] font-bold px-1.5 py-0.2 rounded-full">
                              Primary Proxy
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-[11px] font-medium text-[#477E7A] block">
                        {contact.relationship}
                      </span>

                      <div className="text-xs font-bold text-[#1D1D1F] mt-1.5 flex items-center gap-1">
                        <span>{contact.phone}</span>
                      </div>

                      {contact.altPhone && (
                        <span className="text-[10px] text-[#86868B] block">
                          Alt: {contact.altPhone}
                        </span>
                      )}

                      {contact.notes && (
                        <p className="text-[10px] text-[#86868B] mt-1 line-clamp-1">
                          {contact.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-black/4">
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                        className="touch-target flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1D7A74] hover:bg-[#155E59] text-white text-xs font-bold py-2 rounded-xl transition-all shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>

                      <a
                        href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="touch-target inline-flex items-center justify-center gap-1 bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759] border border-[#34C759]/30 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                        title="Open WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Emergency Ambulance & Trauma Hotlines */}
            <div className="bg-white border border-black/6 rounded-2xl p-3.5 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#1D1D1F]">
                <span className="flex items-center gap-1.5">
                  <Ambulance className="w-4 h-4 text-[#FF3B30]" />
                  <span>24x7 Emergency Trauma Hotlines</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {emergencyProfile.emergencyHotlines?.map((h, i) => (
                  <a
                    key={i}
                    href={`tel:${h.number.replace(/\s+/g, '')}`}
                    className="p-2 rounded-xl bg-[#F5F5F7] hover:bg-[#EBEBED] flex items-center justify-between transition-colors border border-black/4"
                  >
                    <div>
                      <span className="text-[10px] text-[#86868B] block">{h.name}</span>
                      <span className="font-bold text-[#1D1D1F]">{h.number}</span>
                    </div>
                    <Phone className="w-3 h-3 text-[#1D7A74]" />
                  </a>
                ))}
              </div>
            </div>

            {/* 5. Hospital Network & Health Insurance for Accidents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {/* Preferred Hospital */}
              <div className="bg-white border border-black/6 rounded-2xl p-3.5 space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#1D7A74] uppercase tracking-wider">
                  <Hospital className="w-3.5 h-3.5" />
                  <span>Preferred Accident &amp; Trauma ER</span>
                </div>
                <p className="font-bold text-[#1D1D1F]">
                  {emergencyProfile.preferredHospital}
                </p>
                <span className="text-[10px] text-[#86868B] block">
                  Lilavati Hospital ER: +91 22 2675 1000 (2.1 km away)
                </span>
              </div>

              {/* Health Insurance */}
              <div className="bg-white border border-black/6 rounded-2xl p-3.5 space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0071E3] uppercase tracking-wider">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Cashless Health Insurance</span>
                </div>
                <p className="font-bold text-[#1D1D1F]">
                  {emergencyProfile.insuranceProvider}
                </p>
                <span className="text-[10px] text-[#86868B] block">
                  Policy: {emergencyProfile.insurancePolicyNumber}
                </span>
              </div>
            </div>

            {/* 6. Active Daily Medications & Standby Emergency Kits */}
            <div className="bg-white border border-black/6 rounded-2xl p-3.5 space-y-2 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1D7A74]">
                <Pill className="w-3.5 h-3.5" />
                <span>Active Medications &amp; Emergency Standby</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                {emergencyProfile.activeMedications.map((m, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-xl border flex items-center gap-2 ${
                      m.toLowerCase().includes('epipen')
                        ? 'bg-[#FFF8EE] border-[#FF9500]/40 text-[#B36B00] font-semibold'
                        : 'bg-[#F5F5F7] border-black/4 text-[#1D1D1F]'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                    <span className="text-[11px] leading-snug">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Clinical Directives */}
            <div className="text-xs text-[#86868B] bg-white border border-black/6 p-3.5 rounded-2xl shadow-xs">
              <span className="font-bold text-[#1D1D1F] block mb-0.5">Emergency Medical Directives:</span>
              <p className="leading-relaxed text-[11px]">
                {emergencyProfile.medicalDirectives}
              </p>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-3 sm:p-4 border-t border-black/6 bg-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySummary}
                className="touch-target inline-flex items-center gap-1.5 text-xs font-bold text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#EBEBED] border border-black/6 px-3.5 py-2 rounded-xl transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#34C759]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Summary Copied' : 'Copy Emergency Summary'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="touch-target hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#86868B] hover:text-[#1D1D1F] bg-[#F5F5F7] hover:bg-[#EBEBED] border border-black/6 px-3 py-2 rounded-xl transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print ID</span>
              </button>
            </div>

            <button
              onClick={() => setIsEmergencyModalOpen(false)}
              className="touch-target px-6 py-2 rounded-xl bg-[#1D7A74] hover:bg-[#155E59] text-white text-xs font-bold shadow-xs transition-all"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
