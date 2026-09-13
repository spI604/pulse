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
      <div className="no-print flex items-center justify-between border-b border-[#EAEFEF] pb-3">
        <div>
          <h1 className="text-xl font-bold text-[#162020]">
            Doctor Brief
          </h1>
          <span className="text-xs text-[#708080]">
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
            className="touch-target inline-flex items-center gap-1.5 bg-[#EEF5F4] text-[#2F7E79] text-xs font-semibold px-3.5 py-2 rounded-xl border border-[#EAEFEF]"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#679E73]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share Link'}</span>
          </button>
        </div>
      </div>

      {/* Clean Document Container */}
      <div className="print-card bg-white border border-[#EAEFEF] rounded-2xl p-5 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-5 font-sans">
        {/* Document Header */}
        <div className="border-b border-[#EAEFEF] pb-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2F7E79] text-white flex items-center justify-center font-bold text-xs">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-tight text-[#162020] block leading-none">
                PULSE CLINICAL REPORT
              </span>
              <span className="text-[10px] text-[#708080]">
                Date: {doctorBriefData.patientSummary.consultationDate}
              </span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="font-bold text-[#2F7E79]">94 Days Calibrated</span>
          </div>
        </div>

        {/* Patient Summary Matrix */}
        <div className="bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-[#708080] block text-[11px]">Patient</span>
            <span className="font-bold text-[#162020]">{userProfile.name}</span>
          </div>
          <div>
            <span className="text-[#708080] block text-[11px]">Demographics</span>
            <span className="font-semibold text-[#162020]">
              {userProfile.age}y, {userProfile.gender}
            </span>
          </div>
          <div>
            <span className="text-[#708080] block text-[11px]">Blood Group</span>
            <span className="font-bold text-[#2F7E79]">{emergencyProfile.bloodGroup}</span>
          </div>
          <div>
            <span className="text-[#708080] block text-[11px]">Physician</span>
            <span className="font-semibold text-[#162020]">Dr. Rajesh Iyer</span>
          </div>
        </div>

        {/* Chief Focus */}
        <div className="text-xs">
          <span className="font-bold text-[#5F8F8B] uppercase tracking-wider block mb-1">
            Focus:
          </span>
          <p className="font-medium text-[#162020] bg-[#EEF5F4] p-2.5 rounded-lg">
            {doctorBriefData.patientSummary.chiefFocus}
          </p>
        </div>

        {/* Key Observations */}
        <div className="space-y-1 text-xs">
          <span className="font-bold uppercase tracking-wider text-[#162020] block">
            Clinical Observations
          </span>
          <ul className="space-y-1 bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl p-3 text-[#162020]">
            {doctorBriefData.keyObservations.map((obs, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#2F7E79] font-bold">•</span>
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Antecedent Cascade Table */}
        <div className="space-y-1 text-xs">
          <span className="font-bold uppercase tracking-wider text-[#162020] block">
            72h Antecedent Pattern
          </span>
          <div className="border border-[#EAEFEF] rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-[#F8FAF9] border-b border-[#EAEFEF] p-2 font-bold text-[#162020]">
              <div className="col-span-3">Timeline</div>
              <div className="col-span-5">Finding</div>
              <div className="col-span-4">Significance</div>
            </div>
            {doctorBriefData.antecedentChronology.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-12 p-2 border-b border-[#F0F4F3] last:border-none items-center"
              >
                <div className="col-span-3 font-semibold text-[#2F7E79]">{row.timing}</div>
                <div className="col-span-5 text-[#162020]">{row.finding}</div>
                <div className="col-span-4 text-[#708080]">{row.clinicalRelevance}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vitals Corridors & Meds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Vitals */}
          <div className="border border-[#EAEFEF] rounded-xl p-3 space-y-1.5">
            <span className="font-bold text-[#162020] block">Resting Corridors</span>
            {doctorBriefData.vitalCorridors.map((vit, i) => (
              <div key={i} className="flex justify-between border-b border-[#F0F4F3] pb-1 last:border-none">
                <span className="text-[#708080]">{vit.metric}:</span>
                <span className="font-bold text-[#162020]">{vit.recentAverage}</span>
              </div>
            ))}
          </div>

          {/* Meds & Allergy */}
          <div className="border border-[#EAEFEF] rounded-xl p-3 space-y-1.5">
            <span className="font-bold text-[#162020] block">Active Medications</span>
            {doctorBriefData.activeMedications.map((m, i) => (
              <div key={i} className="flex justify-between border-b border-[#F0F4F3] pb-1 last:border-none">
                <span className="text-[#162020]">{m.name} ({m.dose})</span>
                <span className="text-[#679E73] font-bold">{m.adherenceRate}</span>
              </div>
            ))}

            <div className="pt-1 text-[#D97A7A] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Allergy: Penicillin (Severe)</span>
            </div>
          </div>
        </div>

        {/* Discussion prompts */}
        <div className="text-xs pt-1 border-t border-[#EAEFEF]">
          <span className="font-bold text-[#5F8F8B] block mb-1">
            Questions for Discussion:
          </span>
          <ul className="space-y-1 text-[#162020]">
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
