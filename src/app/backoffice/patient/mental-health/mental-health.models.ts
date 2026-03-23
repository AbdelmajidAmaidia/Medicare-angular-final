// ============================================================
// Mental Health Module – Domain Models (FINAL)
// ============================================================

// ============================================================
// ENUMS
// ============================================================

export enum MHSessionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum MHSignalType {
  BLINK = 'BLINK',
  GAZE = 'GAZE',
  MICRO_EXPRESSION = 'MICRO_EXPRESSION',
  HEAD_POSE = 'HEAD_POSE',
  FACIAL_ACTION = 'FACIAL_ACTION',
}

export enum MHStressLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum MHBurnoutRisk {
  NONE = 'NONE',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
}

export enum MHConsentPurpose {
  EMOTIONAL_ANALYSIS = 'EMOTIONAL_ANALYSIS',
  STRESS_DETECTION = 'STRESS_DETECTION',
  BURNOUT_PREDICTION = 'BURNOUT_PREDICTION',
}

// ============================================================
// BASE AUDIT MODEL (OPTIONAL BUT RECOMMENDED)
// ============================================================

export interface BaseAudit {
  createdAt: string; // ISO-8601
  updatedAt?: string;
}

// ============================================================
// CONSENT
// ============================================================

export interface MentalHealthConsent extends BaseAudit {
  id: string;
  patientId: string;
  purpose: MHConsentPurpose;
  granted: boolean;
  grantedAt: string;
  revokedAt?: string;
}

// ============================================================
// AI SIGNAL SNAPSHOT
// ============================================================

export interface FaceSignalSnapshot extends BaseAudit {
  id: string;
  sessionId: string;
  signalType: MHSignalType;
  capturedAt: string;
  rawValue: string;
  normalizedValue?: number;
}

// ============================================================
// STRESS ASSESSMENT
// ============================================================

export interface StressAssessment extends BaseAudit {
  id: string;
  sessionId: string;
  stressLevel: MHStressLevel;
  score: number;      // 0–100
  confidence: number; // 0–1
  assessedAt: string;
}

// ============================================================
// BURNOUT PREDICTION
// ============================================================

export interface BurnoutPrediction extends BaseAudit {
  id: string;
  sessionId: string;
  burnoutRisk: MHBurnoutRisk;
  score: number;      // 0–100
  confidence: number; // 0–1
  predictedAt: string;
}

// ============================================================
// FINAL REPORT
// ============================================================

export interface MentalHealthReport extends BaseAudit {
  id: string;
  sessionId: string;
  summary: string;
  recommendations: string[];
  generatedAt: string;
  notificationSent: boolean;
}

// ============================================================
// SESSION (ROOT AGGREGATE)
// ============================================================

export interface MentalHealthSession extends BaseAudit {
  id: string;
  patientId: string;
  status: MHSessionStatus;

  startedAt: string;
  completedAt?: string;
  cancelledAt?: string;

  consent?: MentalHealthConsent;

  signals: FaceSignalSnapshot[];

  stressAssessment?: StressAssessment;
  burnoutPrediction?: BurnoutPrediction;

  report?: MentalHealthReport;
}