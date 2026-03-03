// ============================================================
// Mental Health Module – Domain Models
// ============================================================

// ---------- Enums ----------

export enum MH_SessionStatus {
  PENDING   = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum MH_SignalType {
  BLINK          = 'BLINK',
  GAZE           = 'GAZE',
  MICRO_EXPRESSION = 'MICRO_EXPRESSION',
  HEAD_POSE      = 'HEAD_POSE',
  FACIAL_ACTION  = 'FACIAL_ACTION',
}

export enum MH_StressLevel {
  LOW      = 'LOW',
  MODERATE = 'MODERATE',
  HIGH     = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum MH_BurnoutRisk {
  NONE     = 'NONE',
  LOW      = 'LOW',
  MODERATE = 'MODERATE',
  HIGH     = 'HIGH',
}

export enum MH_ConsentPurpose {
  EMOTIONAL_ANALYSIS = 'EMOTIONAL_ANALYSIS',
  STRESS_DETECTION   = 'STRESS_DETECTION',
  BURNOUT_PREDICTION = 'BURNOUT_PREDICTION',
}

// ---------- Entities ----------

export interface Consent {
  id: string;
  patientId: string;
  purpose: MH_ConsentPurpose;
  granted: boolean;
  grantedAt: string;
}

export interface FaceSignalSnapshot {
  id: string;
  sessionId: string;
  signalType: MH_SignalType;
  capturedAt: string;
  value: string;
}

export interface StressAssessment {
  id: string;
  sessionId: string;
  stressLevel: MH_StressLevel;
  score: number;          // 0–100
  confidence: number;     // 0–1
  assessedAt: string;
}

export interface BurnoutPrediction {
  id: string;
  sessionId: string;
  burnoutRisk: MH_BurnoutRisk;
  score: number;          // 0–100
  confidence: number;     // 0–1
  predictedAt: string;
}

export interface MentalHealthReport {
  id: string;
  sessionId: string;
  summary: string;
  recommendations: string[];
  generatedAt: string;
  notificationSent: boolean;
}

export interface MentalHealthSession {
  id: string;
  patientId: string;
  status: MH_SessionStatus;
  startedAt: string;
  completedAt?: string;
  consentId?: string;
  snapshots: FaceSignalSnapshot[];
  stressAssessment?: StressAssessment;
  burnoutPrediction?: BurnoutPrediction;
  report?: MentalHealthReport;
}
