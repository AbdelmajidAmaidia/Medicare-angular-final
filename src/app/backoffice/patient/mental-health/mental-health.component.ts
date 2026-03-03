import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MentalHealthService } from '../../../services/mental-health.service';
import {
  Consent,
  MentalHealthSession,
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

interface ReportView {
  session: MentalHealthSession;
  summary: string;
  recommendations: string[];
  generatedAt: string;
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
  sessionProgress = 0;
  sessionProgressLabel = 'Initialisation...';
  capturedSignals: string[] = [];

  consentPurposes: ConsentPurpose[] = [
    {
      value: 'EMOTIONAL_ANALYSIS',
      label: 'Analyse Émotionnelle',
      description: 'Analyse des expressions faciales pour détecter les émotions',
      granted: true,
    },
    {
      value: 'STRESS_DETECTION',
      label: 'Détection du Stress',
      description: 'Analyse des signaux physiologiques pour évaluer le niveau de stress',
      granted: true,
    },
    {
      value: 'BURNOUT_PREDICTION',
      label: 'Prédiction du Burnout',
      description: 'Modèle prédictif pour identifier les risques de burnout',
      granted: true,
    },
  ];

  // Expose enum values to the template
  readonly MH_SessionStatus = MH_SessionStatus;

  private sub!: Subscription;
  private _sessionInterval: ReturnType<typeof setInterval> | undefined;

  constructor(private mhService: MentalHealthService) {}

  ngOnInit(): void {
    this.sub = this.mhService.sessions$.subscribe(() => {
      this.sessions = this.mhService.getSessionsByPatient(this.patientId);
      this.consent  = this.mhService.getConsent(this.patientId);
      this.activeSession = this.mhService.getActiveSession(this.patientId);

      // If we were watching an active session and it just completed, refresh it
      if (this.currentView === 'active' && this.activeSession === undefined) {
        const justCompleted = this.sessions.find(
          s => s.id === this.selectedSession?.id && s.status === MH_SessionStatus.COMPLETED
        );
        if (justCompleted) {
          this.selectedSession = justCompleted;
          this.currentView = 'report';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this._sessionInterval !== undefined) {
      clearInterval(this._sessionInterval);
    }
  }

  // ---- Computed properties ----

  get hasConsent(): boolean {
    return this.consent?.granted === true;
  }

  get isSessionActive(): boolean {
    return this.activeSession !== undefined;
  }

  get currentReport(): ReportView | undefined {
    if (!this.selectedSession?.report) return undefined;
    return {
      session: this.selectedSession,
      summary: this.selectedSession.report.summary,
      recommendations: this.selectedSession.report.recommendations,
      generatedAt: this.selectedSession.report.generatedAt,
    };
  }

  // ---- Patient capabilities ----

  /** Step 1: Show consent form */
  showConsentForm(): void {
    this.currentView = 'consent';
    this.errorMessage = '';
  }

  /** Patient grants consent */
  grantConsent(): void {
    this.consent = this.mhService.grantConsent(this.patientId);
    this.currentView = 'list';
  }

  /** Revoke consent */
  revokeConsent(): void {
    if (this.consent) {
      this.consent.granted = false;
    }
    this.currentView = 'list';
  }

  /** Step 2: Start session (requires consent) */
  startSession(): void {
    this.errorMessage = '';
    try {
      const session = this.mhService.startSession(this.patientId);
      this.selectedSession = session;
      this.currentView = 'active';
      this._simulateSessionProgress();
    } catch (e: unknown) {
      this.errorMessage = e instanceof Error ? e.message : 'An error occurred.';
    }
  }

  /** Cancel the active session */
  cancelSession(): void {
    if (this._sessionInterval !== undefined) {
      clearInterval(this._sessionInterval);
      this._sessionInterval = undefined;
    }
    this.currentView = 'list';
    this.selectedSession = undefined;
    this.sessionProgress = 0;
    this.capturedSignals = [];
  }

  /** View a past report */
  viewReport(session: MentalHealthSession): void {
    this.selectedSession = session;
    this.currentView = 'report';
  }

  /** Go back to session list */
  backToList(): void {
    this.currentView = 'list';
    this.selectedSession = undefined;
    this.errorMessage = '';
  }

  /** Check if the consent form is valid */
  isConsentValid(): boolean {
    return this.consentPurposes.some(p => p.granted);
  }

  // ---- Display / helper methods ----

  getSessionDuration(session: MentalHealthSession): string {
    if (!session.completedAt) return 'En cours';
    const start = Date.parse(session.startedAt);
    const end = Date.parse(session.completedAt);
    if (!isNaN(start) && !isNaN(end) && end > start) {
      const minutes = Math.round((end - start) / 60000);
      return `~${minutes} min`;
    }
    return '~12 min';
  }

  getStatusBadgeClass(status: MH_SessionStatus): Record<string, boolean> {
    return {
      'bg-success': status === MH_SessionStatus.COMPLETED,
      'bg-warning text-dark': status === MH_SessionStatus.IN_PROGRESS,
      'bg-secondary': status === MH_SessionStatus.PENDING,
      'bg-danger': status === MH_SessionStatus.CANCELLED,
    };
  }

  getStatusLabel(status: MH_SessionStatus): string {
    const labels: Record<MH_SessionStatus, string> = {
      [MH_SessionStatus.PENDING]: 'En attente',
      [MH_SessionStatus.IN_PROGRESS]: 'En cours',
      [MH_SessionStatus.COMPLETED]: 'Terminé',
      [MH_SessionStatus.CANCELLED]: 'Annulé',
    };
    return labels[status] ?? status;
  }

  getStressLevelBadgeClass(level: MH_StressLevel | undefined): Record<string, boolean> {
    return {
      'bg-success': level === MH_StressLevel.LOW,
      'bg-warning text-dark': level === MH_StressLevel.MODERATE,
      'bg-danger': level === MH_StressLevel.HIGH || level === MH_StressLevel.CRITICAL,
    };
  }

  getStressLevelLabel(level: MH_StressLevel | undefined): string {
    if (!level) return '-';
    const labels: Record<MH_StressLevel, string> = {
      [MH_StressLevel.LOW]: 'Faible',
      [MH_StressLevel.MODERATE]: 'Modéré',
      [MH_StressLevel.HIGH]: 'Élevé',
      [MH_StressLevel.CRITICAL]: 'Critique',
    };
    return labels[level] ?? level;
  }

  getStressLevelTextClass(level: MH_StressLevel | undefined): string {
    if (level === MH_StressLevel.LOW) return 'text-success';
    if (level === MH_StressLevel.MODERATE) return 'text-warning';
    if (level === MH_StressLevel.HIGH || level === MH_StressLevel.CRITICAL) return 'text-danger';
    return '';
  }

  getStressLevelIconClass(level: MH_StressLevel | undefined): string {
    if (level === MH_StressLevel.LOW) return 'bi bi-activity fs-1 text-success';
    if (level === MH_StressLevel.MODERATE) return 'bi bi-activity fs-1 text-warning';
    if (level === MH_StressLevel.HIGH || level === MH_StressLevel.CRITICAL) return 'bi bi-activity fs-1 text-danger';
    return 'bi bi-activity fs-1';
  }

  getStressLevelProgressClass(level: MH_StressLevel | undefined): Record<string, boolean> {
    return {
      'bg-success': level === MH_StressLevel.LOW,
      'bg-warning': level === MH_StressLevel.MODERATE,
      'bg-danger': level === MH_StressLevel.HIGH || level === MH_StressLevel.CRITICAL,
    };
  }

  getBurnoutRiskBadgeClass(risk: MH_BurnoutRisk | undefined): Record<string, boolean> {
    return {
      'bg-success': risk === MH_BurnoutRisk.NONE || risk === MH_BurnoutRisk.LOW,
      'bg-warning text-dark': risk === MH_BurnoutRisk.MODERATE,
      'bg-danger': risk === MH_BurnoutRisk.HIGH,
    };
  }

  getBurnoutRiskLabel(risk: MH_BurnoutRisk | undefined): string {
    if (!risk) return '-';
    const labels: Record<MH_BurnoutRisk, string> = {
      [MH_BurnoutRisk.NONE]: 'Aucun',
      [MH_BurnoutRisk.LOW]: 'Faible',
      [MH_BurnoutRisk.MODERATE]: 'Modéré',
      [MH_BurnoutRisk.HIGH]: 'Élevé',
    };
    return labels[risk] ?? risk;
  }

  getBurnoutRiskTextClass(risk: MH_BurnoutRisk | undefined): string {
    if (risk === MH_BurnoutRisk.NONE || risk === MH_BurnoutRisk.LOW) return 'text-success';
    if (risk === MH_BurnoutRisk.MODERATE) return 'text-warning';
    if (risk === MH_BurnoutRisk.HIGH) return 'text-danger';
    return '';
  }

  getBurnoutRiskIconClass(risk: MH_BurnoutRisk | undefined): string {
    if (risk === MH_BurnoutRisk.NONE || risk === MH_BurnoutRisk.LOW) return 'bi bi-thermometer-half fs-1 text-success';
    if (risk === MH_BurnoutRisk.MODERATE) return 'bi bi-thermometer-half fs-1 text-warning';
    if (risk === MH_BurnoutRisk.HIGH) return 'bi bi-thermometer-half fs-1 text-danger';
    return 'bi bi-thermometer-half fs-1';
  }

  getBurnoutRiskProgressClass(risk: MH_BurnoutRisk | undefined): Record<string, boolean> {
    return {
      'bg-success': risk === MH_BurnoutRisk.NONE || risk === MH_BurnoutRisk.LOW,
      'bg-warning': risk === MH_BurnoutRisk.MODERATE,
      'bg-danger': risk === MH_BurnoutRisk.HIGH,
    };
  }

  getSignalTypeLabel(signalType: MH_SignalType): string {
    const labels: Record<MH_SignalType, string> = {
      [MH_SignalType.BLINK]: 'Clignements',
      [MH_SignalType.GAZE]: 'Regard',
      [MH_SignalType.MICRO_EXPRESSION]: 'Micro-expressions',
      [MH_SignalType.HEAD_POSE]: 'Posture de tête',
      [MH_SignalType.FACIAL_ACTION]: 'Actions faciales',
    };
    return labels[signalType] ?? signalType;
  }

  private _simulateSessionProgress(): void {
    const signalTypes = Object.values(MH_SignalType);
    let step = 0;
    this._sessionInterval = setInterval(() => {
      step++;
      this.sessionProgress = (step / signalTypes.length) * 100;
      const label = this.getSignalTypeLabel(signalTypes[step - 1]);
      this.sessionProgressLabel = `Analyse ${label}...`;
      this.capturedSignals.push(label);
      if (step >= signalTypes.length) {
        clearInterval(this._sessionInterval);
        this._sessionInterval = undefined;
      }
    }, 600);
  }
}
