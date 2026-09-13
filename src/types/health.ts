export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  conditions: string[];
  allergies: string[];
  medications: string[];
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  connectedDevices: {
    appleHealth: boolean;
    googleFit: boolean;
    fitbit: boolean;
    oura: boolean;
    garmin: boolean;
  };
}

export interface BaselineStatus {
  isCalibrated: boolean;
  daysCalibrated: number;
  confidencePercentage: number;
  lastCalibrationDate: string;
}

export interface VitalMetric {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  normalRange: [number, number] | string;
  status: 'optimal' | 'within-normal' | 'slight-deviation' | 'elevated';
  delta: string;
  deltaDirection: 'up' | 'down' | 'neutral';
  contextNote: string;
}

export interface AIInsight {
  id: string;
  title: string;
  message: string;
  type: 'observation' | 'pattern' | 'recovery' | 'preventive';
  category: 'sleep' | 'autonomic' | 'hydration' | 'activity' | 'metabolic';
  actionableLabel?: string;
  targetTab?: string;
  confidence?: number;
  timestamp: string;
}

export interface HealthReplayEvent {
  id: string;
  offsetHours: number;
  timeLabel: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'sleep' | 'stress' | 'hydration' | 'nutrition' | 'symptom';
  metricName: string;
  metricValue: string;
  baselineValue: string;
  deviationLevel: 'moderate' | 'significant' | 'primary';
  contextualFactors: string[];
  correlationNote: string;
}

export interface CheckInRecord {
  id: string;
  timestamp: string;
  overallFeeling: 'great' | 'okay' | 'off';
  mood: number; // 1 to 5
  energy: number; // 1 to 5
  stressLevel: 'low' | 'mild' | 'elevated';
  sleepQuality: 'restful' | 'average' | 'disrupted';
  hydrationLitres: number;
  symptoms: string[];
  note?: string;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  rawText: string;
  extractedSymptoms: string[];
  extractedTime: string;
  extractedContext: string[];
  extractedTriggers: string[];
}

export interface HealthSignal {
  id: string;
  title: string;
  level: 'gentle-watch' | 'notable-pattern' | 'supportive-review';
  category: string;
  observationText: string;
  evidenceText: string;
  recommendedAction: string;
  status: 'monitoring' | 'rechecking' | 'clinician-ready';
}

export interface HealthRecord {
  id: string;
  category: 'symptom' | 'vital' | 'medication' | 'prescription' | 'allergy' | 'condition' | 'lab';
  title: string;
  date: string;
  provider?: string;
  value?: string;
  status?: string;
  details: string;
  tags: string[];
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  altPhone?: string;
  location?: string;
  notes?: string;
  isPrimary: boolean;
}

export interface EmergencyHotline {
  name: string;
  number: string;
  role: string;
}

export interface EmergencyProfile {
  bloodGroup: string;
  rhFactor: string;
  bloodCompatibility: string;
  mriSafe: boolean;
  severeAllergies: string[];
  activeMedications: string[];
  chronicConditions: string[];
  emergencyContacts: EmergencyContact[];
  organDonor: boolean;
  organDonorRegistryNumber?: string;
  medicalDirectives: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  preferredHospital?: string;
  emergencyAddress?: string;
  emergencyHotlines?: EmergencyHotline[];
}

export interface DoctorBriefData {
  patientSummary: {
    name: string;
    age: number;
    gender: string;
    baselineDays: number;
    consultationDate: string;
    chiefFocus: string;
  };
  keyObservations: string[];
  antecedentChronology: {
    timing: string;
    finding: string;
    clinicalRelevance: string;
  }[];
  vitalCorridors: {
    metric: string;
    baselineRange: string;
    recentAverage: string;
    deviationStatus: string;
  }[];
  activeMedications: {
    name: string;
    dose: string;
    frequency: string;
    adherenceRate: string;
  }[];
  questionsForDiscussion: string[];
}
