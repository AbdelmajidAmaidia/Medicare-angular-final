import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MentalHealthService } from '../../../services/mental-health.service';
import {
  Consent,
  MentalHealthSession,
  MentalHealthReport,
  MH_SessionStatus,
  MH_StressLevel,
  MH_BurnoutRisk,
  MH_SignalType,
} from '../../../models/mental-health.models';

type View = 'list' | 'consent' | 'active' | 'report';

interface ConsentPurpose {
  value: string;
  label: string;
  description: string;
  granted: boolean;
}

/** Combined view-model returned by the currentReport getter */
export interface ReportViewModel {
  session: MentalHealthSession;
  generatedAt: string;
  summary: string;
  recommendations: string[];
}

@Component({
  selector: 'app-mental-health',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mental-health.component.html',
})
export class MentalHealthComponent implements OnInit, OnDestroy {

  // The mock patient ID (would come from AuthService in a real app)
  readonly patientId = 'USR-001';

  currentView: View = 'list';
  sessions: MentalHealthSession[] = [];
  consent: Consent | undefined;
  activeSession: MentalHealthSession | undefined;
  selectedSession: MentalHealthSession | undefined;
  errorMessage = '';

  // Active-session progress simulation
  sessionProgress = 0;
  sessionProgressLabel = 'Initialisation...';
  capturedSignals: string[] = [];

  // Consent form purposes
  consentPurposes: ConsentPurpose[] = [
    { value: 'emotional_analysis', label: 'Analyse émotionnelle', description: 'Analyse des expressions faciales pour détecter les émotions.', granted: true },
    { value: 'stress_detection', label: 'Détection du stress', description: 'Évaluation du niveau de stress via les signaux biométriques.', granted: true },
    { value: 'burnout_prediction', label: 'Prédiction du burnout', description: 'Analyse prédictive du risque de burnout professionnel.', granted: false },
  ];

  // Expose enum values to the template
  readonly MH_SessionStatus = MH_SessionStatus;

  private sub!: Subscription;
  private progressInterval?: ReturnType<typeof setInterval>;

  constructor(private mhService: MentalHealthService) {}

  ngOnInit(): void {
    this.sub = this.mhService.sessions$.subscribe(() => {
      this.sessions = this.mhService.getSessionsByPatient(this.patientId);
      this.consent  = this.mhService.getConsent(this.patientId);
      this.activeSession = this.mhService.getActiveSession(this.patientId);

      // If we were watching an active session and it just completed, show the report
      if (this.currentView === 'active' && this.activeSession === undefined) {
        const justCompleted = this.sessions.find(
          s => s.id === this.selectedSession?.id && s.status === MH_SessionStatus.COMPLETED
        );
        if (justCompleted) {
          this.selectedSession = justCompleted;
          this._stopProgress();
          this.currentView = 'report';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this._stopProgress();
  }

  // ---- Computed getters ----

  get hasConsent(): boolean {
    return this.consent?.granted === true;
  }

  get isSessionActive(): boolean {
    return this.activeSession !== undefined;
  }

  get currentReport(): ReportViewModel | null {
    const session = this.selectedSession;
    const report: MentalHealthReport | undefined = session?.report;
    if (!session || !report) return null;
    return {
      session,
      generatedAt: report.generatedAt,
      summary: report.summary,
      recommendations: report.recommendations,
    };
  }

  // ---- Consent methods ----

  isConsentValid(): boolean {
    return this.consentPurposes.some(p => p.granted);
  }

  grantConsent(): void {
    this.consent = this.mhService.grantConsent(this.patientId);
    this.currentView = 'list';
  }

  revokeConsent(): void {
    if (this.consent) {
      this.consent.granted = false;
    }
    this.currentView = 'list';
  }

  // ---- Session methods ----

  startSession(): void {
    this.errorMessage = '';
    try {
      const session = this.mhService.startSession(this.patientId);
      this.selectedSession = session;
      this._startProgressSimulation();
      this.currentView = 'active';
    } catch (e: unknown) {
      this.errorMessage = e instanceof Error ? e.message : 'Une erreur est survenue.';
    }
  }

  cancelSession(): void {
    this._stopProgress();
    this.currentView = 'list';
  }

  viewReport(session: MentalHealthSession): void {
    this.selectedSession = session;
    this.currentView = 'report';
  }

  // ---- Helper display methods ----

  getSessionDuration(session: MentalHealthSession): string {
    if (!session.completedAt) return 'En cours';
    return '~12 min';
  }

  getStatusBadgeClass(status: MH_SessionStatus): string {
    const map: Record<MH_SessionStatus, string> = {
      [MH_SessionStatus.COMPLETED]:   'bg-success',
      [MH_SessionStatus.IN_PROGRESS]: 'bg-primary',
      [MH_SessionStatus.PENDING]:     'bg-warning text-dark',
      [MH_SessionStatus.CANCELLED]:   'bg-secondary',
    };
    return map[status] ?? 'bg-light text-dark';
  }

  getStatusLabel(status: MH_SessionStatus): string {
    const map: Record<MH_SessionStatus, string> = {
      [MH_SessionStatus.COMPLETED]:   'Terminé',
      [MH_SessionStatus.IN_PROGRESS]: 'En cours',
      [MH_SessionStatus.PENDING]:     'En attente',
      [MH_SessionStatus.CANCELLED]:   'Annulé',
    };
    return map[status] ?? status;
  }

  getStressLevelBadgeClass(level: MH_StressLevel | undefined): string {
    const map: Record<MH_StressLevel, string> = {
      [MH_StressLevel.LOW]:      'bg-success',
      [MH_StressLevel.MODERATE]: 'bg-warning text-dark',
      [MH_StressLevel.HIGH]:     'bg-danger',
      [MH_StressLevel.CRITICAL]: 'bg-dark',
    };
    return level ? (map[level] ?? 'bg-secondary') : 'bg-secondary';
  }

  getStressLevelLabel(level: MH_StressLevel | undefined): string {
    const map: Record<MH_StressLevel, string> = {
      [MH_StressLevel.LOW]:      'Faible',
      [MH_StressLevel.MODERATE]: 'Modéré',
      [MH_StressLevel.HIGH]:     'Élevé',
      [MH_StressLevel.CRITICAL]: 'Critique',
    };
    return level ? (map[level] ?? level) : '-';
  }

  getStressLevelIconClass(level: MH_StressLevel | undefined): string {
    const map: Record<MH_StressLevel, string> = {
      [MH_StressLevel.LOW]:      'text-success',
      [MH_StressLevel.MODERATE]: 'text-warning',
      [MH_StressLevel.HIGH]:     'text-danger',
      [MH_StressLevel.CRITICAL]: 'text-dark',
    };
    return level ? (map[level] ?? '') : '';
  }

  getStressLevelTextClass(level: MH_StressLevel | undefined): string {
    return this.getStressLevelIconClass(level);
  }

  getStressLevelProgressClass(level: MH_StressLevel | undefined): string {
    const map: Record<MH_StressLevel, string> = {
      [MH_StressLevel.LOW]:      'bg-success',
      [MH_StressLevel.MODERATE]: 'bg-warning',
      [MH_StressLevel.HIGH]:     'bg-danger',
      [MH_StressLevel.CRITICAL]: 'bg-dark',
    };
    return level ? (map[level] ?? 'bg-info') : 'bg-info';
  }

  getBurnoutRiskBadgeClass(risk: MH_BurnoutRisk | undefined): string {
    const map: Record<MH_BurnoutRisk, string> = {
      [MH_BurnoutRisk.NONE]:     'bg-success',
      [MH_BurnoutRisk.LOW]:      'bg-info',
      [MH_BurnoutRisk.MODERATE]: 'bg-warning text-dark',
      [MH_BurnoutRisk.HIGH]:     'bg-danger',
    };
    return risk ? (map[risk] ?? 'bg-secondary') : 'bg-secondary';
  }

  getBurnoutRiskLabel(risk: MH_BurnoutRisk | undefined): string {
    const map: Record<MH_BurnoutRisk, string> = {
      [MH_BurnoutRisk.NONE]:     'Aucun',
      [MH_BurnoutRisk.LOW]:      'Faible',
      [MH_BurnoutRisk.MODERATE]: 'Modéré',
      [MH_BurnoutRisk.HIGH]:     'Élevé',
    };
    return risk ? (map[risk] ?? risk) : '-';
  }

  getBurnoutRiskIconClass(risk: MH_BurnoutRisk | undefined): string {
    const map: Record<MH_BurnoutRisk, string> = {
      [MH_BurnoutRisk.NONE]:     'text-success',
      [MH_BurnoutRisk.LOW]:      'text-info',
      [MH_BurnoutRisk.MODERATE]: 'text-warning',
      [MH_BurnoutRisk.HIGH]:     'text-danger',
    };
    return risk ? (map[risk] ?? '') : '';
  }

  getBurnoutRiskTextClass(risk: MH_BurnoutRisk | undefined): string {
    return this.getBurnoutRiskIconClass(risk);
  }

  getBurnoutRiskProgressClass(risk: MH_BurnoutRisk | undefined): string {
    const map: Record<MH_BurnoutRisk, string> = {
      [MH_BurnoutRisk.NONE]:     'bg-success',
      [MH_BurnoutRisk.LOW]:      'bg-info',
      [MH_BurnoutRisk.MODERATE]: 'bg-warning',
      [MH_BurnoutRisk.HIGH]:     'bg-danger',
    };
    return risk ? (map[risk] ?? 'bg-info') : 'bg-info';
  }

  getSignalTypeLabel(type: MH_SignalType): string {
    const map: Record<MH_SignalType, string> = {
      [MH_SignalType.BLINK]:            'Clignement des yeux',
      [MH_SignalType.GAZE]:             'Direction du regard',
      [MH_SignalType.MICRO_EXPRESSION]: 'Micro-expression',
      [MH_SignalType.HEAD_POSE]:        'Posture de la tête',
      [MH_SignalType.FACIAL_ACTION]:    'Action faciale',
    };
    return map[type] ?? type;
  }

  // ---- Private helpers ----

  private _startProgressSimulation(): void {
    this.sessionProgress = 0;
    this.capturedSignals = [];
    const signals = ['Clignement', 'Regard', 'Micro-expression', 'Posture', 'Action faciale'];
    let step = 0;

    this.progressInterval = setInterval(() => {
      step++;
      this.sessionProgress = Math.min(step * 20, 100);
      if (step <= signals.length) {
        this.capturedSignals.push(signals[step - 1]);
        this.sessionProgressLabel = `Capture ${signals[step - 1]}...`;
      } else {
        this.sessionProgressLabel = 'Analyse en cours...';
      }
    }, 500);
  }

  private _stopProgress(): void {
    if (this.progressInterval !== undefined) {
      clearInterval(this.progressInterval);
      this.progressInterval = undefined;
    }
  }
}
