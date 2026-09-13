'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HealthProvider, useHealth } from '@/context/HealthContext';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { EmergencyModal } from '@/components/ui/EmergencyModal';

// Views
import { OnboardingView } from '@/components/views/OnboardingView';
import { DashboardView } from '@/components/views/DashboardView';
import { CheckInView } from '@/components/views/CheckInView';
import { JournalView } from '@/components/views/JournalView';
import { DigitalTwinView } from '@/components/views/DigitalTwinView';
import { InvestigationView } from '@/components/views/InvestigationView';
import { HealthInsightsView } from '@/components/views/HealthInsightsView';
import { HealthRecordsView } from '@/components/views/HealthRecordsView';
import { DoctorBriefView } from '@/components/views/DoctorBriefView';
import { ProfileSettingsView } from '@/components/views/ProfileSettingsView';

import { CheckCircle2, Info } from 'lucide-react';

function PulseMainContent() {
  const { isOnboarded, activeTab, toastMessage } = useHealth();

  if (!isOnboarded) {
    return <OnboardingView />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'check-in':
        return <CheckInView />;
      case 'journal':
        return <JournalView />;
      case 'twin':
        return <DigitalTwinView />;
      case 'investigation':
        return <InvestigationView />;
      case 'insights':
        return <HealthInsightsView />;
      case 'records':
        return <HealthRecordsView />;
      case 'brief':
        return <DoctorBriefView />;
      case 'profile':
      case 'settings':
        return <ProfileSettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8F7] text-[#1F2A2A]">
      <Header />

      <div className="flex-1 flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <BottomNav />
      <EmergencyModal />

      {/* Global Calm Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-[#1F2A2A] text-white border border-[#2F7E79]/40 rounded-2xl p-4 px-5 shadow-xl flex items-center gap-3 max-w-md"
          >
            <div className="w-7 h-7 rounded-xl bg-[#2F7E79] flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium leading-relaxed">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <HealthProvider>
      <PulseMainContent />
    </HealthProvider>
  );
}
