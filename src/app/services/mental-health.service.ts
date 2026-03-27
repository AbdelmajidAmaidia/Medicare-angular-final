import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  Consent,
  FaceSignalSnapshot,
  MentalHealthReport,
  MentalHealthSession,
  MH_BurnoutRisk,
  MH_ConsentPurpose,
  MH_SessionStatus,
  MH_SignalType,
  MH_StressLevel,
  StressAssessment,
  BurnoutPrediction,
} from '../models/mental-health.models';

// Score ranges for the simulated AI pipeline
const STRESS_SCORE_MIN = 10;
const STRESS_SCORE_RANGE = 80;   // scores from 10 to 89
const BURNOUT_SCORE_MIN = 5;
const BURNOUT_SCORE_RANGE = 70;  // scores from 5 to 74

// Delay (ms) before the simulated AI pipeline produces results
const AI_PIPELINE_DELAY_MS = 3000;

@Injectable({ providedIn: 'root' })
export class MentalHealthService {

  // Monotonic counter for collision-free ID generation
  private _idCounter = 100;
  private _nextId(prefix: string): string {
    return `${prefix}-${++this._idCounter}`;
  }

  // ---- In-memory store (replaces a real backend repository) ----

  private sessions: MentalHealthSession[] = [
    {
      id: 'MHS-001',
      patientId: 'USR-001',
      status: MH_SessionStatus.COMPLETED,
      startedAt: 'Dec 10, 2024 09:00',
      completedAt: 'Dec 10, 2024 09:12',
      consentId: 'CNS-001',
      snapshots: [
        { id: 'SN-001', sessionId: 'MHS-001', signalType: MH_SignalType.BLINK, capturedAt: 'Dec 10, 2024 09:02', value: '18 blinks/min' },
        { id: 'SN-002', sessionId: 'MHS-001', signalType: MH_SignalType.GAZE, capturedAt: 'Dec 10, 2024 09:04', value: 'Right-lateral deviation' },
        { id: 'SN-003', sessionId: 'MHS-001', signalType: MH_SignalType.MICRO_EXPRESSION, capturedAt: 'Dec 10, 2024 09:06', value: 'Disgust 0.42' },
        { id: 'SN-004', sessionId: 'MHS-001', signalType: MH_SignalType.HEAD_POSE, capturedAt: 'Dec 10, 2024 09:08', value: 'Yaw -12°, Pitch 5°' },
      ],
      stressAssessment: {
        id: 'SA-001', sessionId: 'MHS-001',
        stressLevel: MH_StressLevel.MODERATE, score: 58, confidence: 0.84,
        assessedAt: 'Dec 10, 2024 09:10',
      },
      burnoutPrediction: {
        id: 'BP-001', sessionId: 'MHS-001',
        burnoutRisk: MH_BurnoutRisk.LOW, score: 32, confidence: 0.79,
        predictedAt: 'Dec 10, 2024 09:11',
      },
      report: {
        id: 'RPT-001', sessionId: 'MHS-001',
        summary: 'Moderate stress indicators detected. No significant burnout risk at this time.',
        recommendations: [
          'Practice 10 minutes of guided breathing daily.',
          'Schedule a follow-up session in 2 weeks.',
          'Reduce screen time after 9 PM.',
        ],
        generatedAt: 'Dec 10, 2024 09:12',
        notificationSent: true,
      },
    },
  ];

  private consents: Consent[] = [
    {
      id: 'CNS-001',
      patientId: 'USR-001',
      purpose: MH_ConsentPurpose.EMOTIONAL_ANALYSIS,
      granted: true,
      grantedAt: 'Dec 10, 2024 08:58',
    },
  ];

  // ---- BehaviorSubject so components can react to changes ----
  private sessionsSubject = new BehaviorSubject<MentalHealthSession[]>(this.sessions);
  sessions$ = this.sessionsSubject.asObservable();

  // ---- Patient capabilities ----

  /** Returns all sessions for the given patient */
  getSessionsByPatient(patientId: string): MentalHealthSession[] {
    return this.sessions.filter(s => s.patientId === patientId);
  }

  /** Returns the active (IN_PROGRESS) session for a patient, if any */
  getActiveSession(patientId: string): MentalHealthSession | undefined {
    return this.sessions.find(s => s.patientId === patientId && s.status === MH_SessionStatus.IN_PROGRESS);
  }

  /** Returns the consent record for a patient */
  getConsent(patientId: string): Consent | undefined {
    return this.consents.find(c => c.patientId === patientId);
  }

  /** Patient grants consent for AI-based emotional analysis */
  grantConsent(patientId: string): Consent {
    const existing = this.getConsent(patientId);
    if (existing) {
      existing.granted = true;
      return existing;
    }
    const consent: Consent = {
      id: this._nextId('CNS'),
      patientId,
      purpose: MH_ConsentPurpose.EMOTIONAL_ANALYSIS,
      granted: true,
      grantedAt: new Date().toLocaleString(),
    };
    this.consents.push(consent);
    return consent;
  }

  /** Patient starts a new Mental Health Session */
  startSession(patientId: string): MentalHealthSession {
    const consent = this.getConsent(patientId);
    if (!consent?.granted) {
      throw new Error('Patient consent is required before starting a session.');
    }
    const session: MentalHealthSession = {
      id: this._nextId('MHS'),
      patientId,
      status: MH_SessionStatus.IN_PROGRESS,
      startedAt: new Date().toLocaleString(),
      consentId: consent.id,
      snapshots: [],
    };
    this.sessions.push(session);
    this._notify();

    // Simulate AI pipeline after a configurable delay
    setTimeout(() => this._runAIPipeline(session), AI_PIPELINE_DELAY_MS);

    return session;
  }

  /** Returns a session's full report */
  getReport(sessionId: string): MentalHealthReport | undefined {
    return this.sessions.find(s => s.id === sessionId)?.report;
  }

  // ---- Internal AI simulation (System responsibilities) ----

  /** Simulates the full AI pipeline: snapshots → stress → burnout → report → notification */
  private _runAIPipeline(session: MentalHealthSession): void {
    const signalTypes = Object.values(MH_SignalType);
    signalTypes.forEach(type => {
      const snap: FaceSignalSnapshot = {
        id: this._nextId('SN'),
        sessionId: session.id,
        signalType: type,
        capturedAt: new Date().toLocaleString(),
        value: this._mockSignalValue(type),
      };
      session.snapshots.push(snap);
    });

    const stressScore = Math.floor(Math.random() * STRESS_SCORE_RANGE) + STRESS_SCORE_MIN;
    const stressLevel = this._classifyStress(stressScore);
    const stress: StressAssessment = {
      id: this._nextId('SA'),
      sessionId: session.id,
      stressLevel,
      score: stressScore,
      confidence: +(Math.random() * 0.3 + 0.7).toFixed(2),
      assessedAt: new Date().toLocaleString(),
    };
    session.stressAssessment = stress;

    const burnoutScore = Math.floor(Math.random() * BURNOUT_SCORE_RANGE) + BURNOUT_SCORE_MIN;
    const burnoutRisk = this._classifyBurnout(burnoutScore);
    const burnout: BurnoutPrediction = {
      id: this._nextId('BP'),
      sessionId: session.id,
      burnoutRisk,
      score: burnoutScore,
      confidence: +(Math.random() * 0.3 + 0.7).toFixed(2),
      predictedAt: new Date().toLocaleString(),
    };
    session.burnoutPrediction = burnout;

    session.report = this._generateReport(session, stress, burnout);
    session.status = MH_SessionStatus.COMPLETED;
    session.completedAt = new Date().toLocaleString();

    this._notify();
  }

  private _mockSignalValue(type: MH_SignalType): string {
    const values: Record<MH_SignalType, string> = {
      [MH_SignalType.BLINK]: `${Math.floor(Math.random() * 10) + 12} blinks/min`,
      [MH_SignalType.GAZE]: 'Center-focused',
      [MH_SignalType.MICRO_EXPRESSION]: `Neutral ${(Math.random()).toFixed(2)}`,
      [MH_SignalType.HEAD_POSE]: `Yaw ${Math.floor(Math.random() * 20) - 10}°`,
      [MH_SignalType.FACIAL_ACTION]: `AU4 ${(Math.random()).toFixed(2)}`,
    };
    return values[type];
  }

  private _classifyStress(score: number): MH_StressLevel {
    if (score < 30) return MH_StressLevel.LOW;
    if (score < 55) return MH_StressLevel.MODERATE;
    if (score < 80) return MH_StressLevel.HIGH;
    return MH_StressLevel.CRITICAL;
  }

  private _classifyBurnout(score: number): MH_BurnoutRisk {
    if (score < 20) return MH_BurnoutRisk.NONE;
    if (score < 40) return MH_BurnoutRisk.LOW;
    if (score < 65) return MH_BurnoutRisk.MODERATE;
    return MH_BurnoutRisk.HIGH;
  }

  private _generateReport(
    session: MentalHealthSession,
    stress: StressAssessment,
    burnout: BurnoutPrediction,
  ): MentalHealthReport {
    const summary =
      `Session completed. Stress level: ${stress.stressLevel} (score ${stress.score}/100). ` +
      `Burnout risk: ${burnout.burnoutRisk} (score ${burnout.score}/100).`;

    const recommendations: string[] = [];
    if (stress.stressLevel === MH_StressLevel.HIGH || stress.stressLevel === MH_StressLevel.CRITICAL) {
      recommendations.push('Consider speaking with a mental health professional.');
      recommendations.push('Practice daily mindfulness or meditation for at least 15 minutes.');
    } else {
      recommendations.push('Maintain current wellness habits.');
      recommendations.push('Ensure 7–8 hours of quality sleep each night.');
    }
    if (burnout.burnoutRisk === MH_BurnoutRisk.HIGH || burnout.burnoutRisk === MH_BurnoutRisk.MODERATE) {
      recommendations.push('Schedule regular breaks during work hours.');
      recommendations.push('Discuss workload management with your care team.');
    }
    recommendations.push('Book a follow-up session in 4 weeks.');

    return {
      id: this._nextId('RPT'),
      sessionId: session.id,
      summary,
      recommendations,
      generatedAt: new Date().toLocaleString(),
      notificationSent: true,  // simulates notification dispatch
    };
  }

  private _notify(): void {
    this.sessionsSubject.next([...this.sessions]);
  }
}

