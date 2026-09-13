'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  BaselineStatus,
  VitalMetric,
  AIInsight,
  HealthReplayEvent,
  HealthSignal,
  HealthRecord,
  EmergencyProfile,
  DoctorBriefData,
  CheckInRecord,
  JournalEntry,
} from '@/types/health';
import {
  initialUserProfile,
  calibratedBaselineStatus,
  freshBaselineStatus,
  defaultEmergencyProfile,
  initialVitals,
  initialAIInsights,
  mockHealthReplayEvents,
  mockHealthSignals,
  mockHealthRecords,
  mockDoctorBriefData,
} from '@/data/mockHealthData';

export type ActiveTab =
  | 'dashboard'
  | 'check-in'
  | 'journal'
  | 'twin'
  | 'investigation'
  | 'insights'
  | 'records'
  | 'brief'
  | 'profile'
  | 'settings';

export type DemoMode = 'calibrated' | 'empty';

interface HealthContextType {
  // Onboarding & Demo
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  demoMode: DemoMode;
  setDemoMode: (mode: DemoMode) => void;
  resetToOnboarding: () => void;

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // User & Baseline
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  baselineStatus: BaselineStatus;

  // Vitals & Insights
  vitals: VitalMetric[];
  aiInsights: AIInsight[];
  addAIInsight: (insight: AIInsight) => void;

  // Check-In
  checkIns: CheckInRecord[];
  addCheckIn: (checkIn: Omit<CheckInRecord, 'id' | 'timestamp'>) => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;

  // Health Replay & Investigation
  healthReplayEvents: HealthReplayEvent[];

  // Signals (Health Insights)
  healthSignals: HealthSignal[];
  updateSignalStatus: (id: string, status: HealthSignal['status']) => void;

  // Health Records
  healthRecords: HealthRecord[];
  addHealthRecord: (record: Omit<HealthRecord, 'id'>) => void;

  // Emergency Profile & Modal
  emergencyProfile: EmergencyProfile;
  setEmergencyProfile: React.Dispatch<React.SetStateAction<EmergencyProfile>>;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;

  // Doctor Brief Print/PDF Modal
  doctorBriefData: DoctorBriefData;
  isDoctorBriefModalOpen: boolean;
  setIsDoctorBriefModalOpen: (open: boolean) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export function HealthProvider({ children }: { children: React.ReactNode }) {
  // Start with onboarding = true by default for immediate immersion, or allow quick toggle
  const [isOnboarded, setIsOnboarded] = useState<boolean>(true);
  const [demoMode, setDemoMode] = useState<DemoMode>('calibrated');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [baselineStatus, setBaselineStatus] = useState<BaselineStatus>(calibratedBaselineStatus);

  const [vitals] = useState<VitalMetric[]>(initialVitals);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(initialAIInsights);
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [healthSignals, setHealthSignals] = useState<HealthSignal[]>(mockHealthSignals);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(mockHealthRecords);
  const [emergencyProfile, setEmergencyProfile] = useState<EmergencyProfile>(defaultEmergencyProfile);
  const [doctorBriefData] = useState<DoctorBriefData>(mockDoctorBriefData);

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isDoctorBriefModalOpen, setIsDoctorBriefModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync baseline status with demoMode
  useEffect(() => {
    if (demoMode === 'calibrated') {
      setBaselineStatus(calibratedBaselineStatus);
    } else {
      setBaselineStatus(freshBaselineStatus);
    }
  }, [demoMode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const addCheckIn = (newCheckIn: Omit<CheckInRecord, 'id' | 'timestamp'>) => {
    const record: CheckInRecord = {
      ...newCheckIn,
      id: `checkin-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setCheckIns((prev) => [record, ...prev]);

    // Add a gentle insight
    const newInsight: AIInsight = {
      id: `ins-${Date.now()}`,
      title: 'Daily Rhythm Updated',
      message: `You reported feeling ${record.overallFeeling} with stress at ${record.stressLevel}. Your personal corridor was quietly updated.`,
      type: 'observation',
      category: 'autonomic',
      timestamp: 'Just now',
    };
    setAiInsights((prev) => [newInsight, ...prev]);
    showToast('Check-in saved. Your personal baseline quietly incorporated today’s observation.');
  };

  const addJournalEntry = (newEntry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
    const entry: JournalEntry = {
      ...newEntry,
      id: `journal-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setJournalEntries((prev) => [entry, ...prev]);

    // Also add to health records as a symptom log if symptoms were detected
    if (entry.extractedSymptoms.length > 0) {
      const rec: HealthRecord = {
        id: `rec-${Date.now()}`,
        category: 'symptom',
        title: entry.extractedSymptoms.join(', '),
        date: 'Today • Just now',
        provider: 'PULSE Natural Language Journal',
        value: entry.extractedTime || 'Recent',
        status: 'Logged & Tracked',
        details: entry.rawText,
        tags: ['Journal', 'AI Extracted', ...entry.extractedTriggers],
      };
      setHealthRecords((prev) => [rec, ...prev]);
    }

    showToast('Journal processed. Extracted signals saved to your health timeline.');
  };

  const addAIInsight = (insight: AIInsight) => {
    setAiInsights((prev) => [insight, ...prev]);
  };

  const updateSignalStatus = (id: string, status: HealthSignal['status']) => {
    setHealthSignals((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    showToast(`Signal status updated to ${status}.`);
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRec: HealthRecord = {
      ...record,
      id: `rec-${Date.now()}`,
    };
    setHealthRecords((prev) => [newRec, ...prev]);
    showToast('New health record successfully added.');
  };

  const resetToOnboarding = () => {
    setIsOnboarded(false);
    setActiveTab('dashboard');
  };

  return (
    <HealthContext.Provider
      value={{
        isOnboarded,
        setIsOnboarded,
        demoMode,
        setDemoMode,
        resetToOnboarding,
        activeTab,
        setActiveTab,
        userProfile,
        setUserProfile,
        baselineStatus,
        vitals,
        aiInsights,
        addAIInsight,
        checkIns,
        addCheckIn,
        journalEntries,
        addJournalEntry,
        healthReplayEvents: mockHealthReplayEvents,
        healthSignals,
        updateSignalStatus,
        healthRecords,
        addHealthRecord,
        emergencyProfile,
        setEmergencyProfile,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        doctorBriefData,
        isDoctorBriefModalOpen,
        setIsDoctorBriefModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
