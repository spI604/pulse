'use client';

import React, { useState } from 'react';
import { useHealth } from '@/context/HealthContext';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  FileText,
  Printer,
  Share2,
  Download,
  Check,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
} from 'lucide-react';

export const DoctorBriefView: React.FC = () => {
  const { demoMode, doctorBriefData, userProfile, emergencyProfile, setActiveTab, showToast } =
    useHealth();
  const [copiedLink, setCopiedLink] = useState(false);

  if (demoMode === 'empty') {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
        <h1 className="text-2xl font-semibold text-[#1F2A2A]">
          Doctor Brief
        </h1>

        <EmptyState
          icon={FileText}
          title="No Report Available"
          message="Complete a few daily check-ins so PULSE can summarize your physiological corridors."
          actionLabel="Complete First Check-In"
          onAction={() => setActiveTab('check-in')}
        />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `https://pulse.health/brief/token-${Date.now()}`
    );
    setCopiedLink(true);
    showToast('Encrypted clinician link copied.');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-4 pb-20">
      {/* Top Action Bar */}
      <div className="no-print flex items-center justify-between border-b border-[#E2EAE8] pb-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2A2A]">
            Doctor Brief
          </h1>
          <span className="text-xs text-[#6C7A7A]">
            Consultation-ready summary for clinician visit
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={handleShare}
            className="touch-target inline-flex items-center gap-1.5 bg-[#EEF3F2] text-[#2F7E79] text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#E2EAE8]"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#74A57F]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
          </button>
        </div>
      </div>

      {/* Clean Document Container */}
      <div className="print-card bg-white border border-[#E2EAE8] rounded-2xl p-5 sm:p-8 shadow-xs space-y-6 font-sans">
        {/* Document Header */}
        <div className="border-b border-[#E2EAE8] pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2F7E79] text-white flex items-center justify-center font-bold text-xs">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-[#1F2A2A] block leading-none">
                PULSE CLINICAL REPORT
              </span>
              <span className="text-[10px] text-[#6C7A7A]">
                Date: {doctorBriefData.patientSummary.consultationDate}
              </span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="font-bold text-[#2F7E79]">94 Days Calibrated</span>
          </div>
        </div>

        {/* Patient Summary Matrix */}
        <div className="bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[#6C7A7A] block text-[11px]">Patient</span>
            <span className="font-bold text-[#1F2A2A]">{userProfile.name}</span>
          </div>
          <div>
            <span className="text-[#6C7A7A] block text-[11px]">Demographics</span>
            <span className="font-semibold text-[#1F2A2A]">
              {userProfile.age}y, {userProfile.gender}
            </span>
          </div>
          <div>
            <span className="text-[#6C7A7A] block text-[11px]">Blood Group</span>
            <span className="font-bold text-[#2F7E79]">{emergencyProfile.bloodGroup}</span>
          </div>
          <div>
            <span className="text-[#6C7A7A] block text-[11px]">Primary Physician</span>
            <span className="font-semibold text-[#1F2A2A]">Dr. Rajesh Iyer</span>
          </div>
        </div>

        {/* Chief Focus */}
        <div className="text-xs">
          <span className="font-bold text-[#5F8F8B] uppercase tracking-wider block mb-1">
            Focus:
          </span>
          <p className="font-medium text-[#1F2A2A] bg-[#EEF3F2] p-2.5 rounded-lg">
            {doctorBriefData.patientSummary.chiefFocus}
          </p>
        </div>

        {/* Key Observations */}
        <div className="space-y-1.5 text-xs">
          <span className="font-bold uppercase tracking-wider text-[#1F2A2A] block">
            Clinical Observations
          </span>
          <ul className="space-y-1 bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl p-3 text-[#1F2A2A]">
            {doctorBriefData.keyObservations.map((obs, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#2F7E79] font-bold">•</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Antecedent Cascade Table */}
        <div className="space-y-1.5 text-xs">
          <span className="font-bold uppercase tracking-wider text-[#1F2A2A] block">
            72h Antecedent Pattern
          </span>
          <div className="border border-[#E2EAE8] rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-[#F7F8F7] border-b border-[#E2EAE8] p-2 font-bold text-[#1F2A2A]">
              <div className="col-span-3">Timeline</div>
              <div className="col-span-5">Finding</div>
              <div className="col-span-4">Significance</div>
            </div>
            {doctorBriefData.antecedentChronology.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-12 p-2 border-b border-[#EEF3F2] last:border-none items-center"
              >
                <div className="col-span-3 font-semibold text-[#2F7E79]">{row.timing}</div>
                <div className="col-span-5 text-[#1F2A2A]">{row.finding}</div>
                <div className="col-span-4 text-[#6C7A7A]">{row.clinicalRelevance}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vitals Corridors & Meds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Vitals */}
          <div className="border border-[#E2EAE8] rounded-xl p-3 space-y-2">
            <span className="font-bold text-[#1F2A2A] block">Resting Corridors</span>
            {doctorBriefData.vitalCorridors.map((vit, i) => (
              <div key={i} className="flex justify-between border-b border-[#EEF3F2] pb-1 last:border-none">
                <span className="text-[#6C7A7A]">{vit.metric}:</span>
                <span className="font-bold text-[#1F2A2A]">{vit.recentAverage}</span>
              </div>
            ))}
          </div>

          {/* Meds & Allergy */}
          <div className="border border-[#E2EAE8] rounded-xl p-3 space-y-2">
            <span className="font-bold text-[#1F2A2A] block">Active Medications</span>
            {doctorBriefData.activeMedications.map((m, i) => (
              <div key={i} className="flex justify-between border-b border-[#EEF3F2] pb-1 last:border-none">
                <span className="text-[#1F2A2A]">{m.name} ({m.dose})</span>
                <span className="text-[#74A57F] font-bold">{m.adherenceRate}</span>
              </div>
            ))}

            <div className="pt-1 text-[#D97A7A] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Allergy: Penicillin (Severe)</span>
            </div>
          </div>
        </div>

        {/* Discussion prompts */}
        <div className="text-xs pt-1 border-t border-[#E2EAE8]">
          <span className="font-bold text-[#5F8F8B] block mb-1">
            Questions for Discussion:
          </span>
          <ul className="space-y-1 text-[#1F2A2A]">
            {doctorBriefData.questionsForDiscussion.map((q, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#2F7E79]">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
