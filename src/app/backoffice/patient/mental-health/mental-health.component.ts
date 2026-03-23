import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mental-health',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mental-health.component.html',
})
export class MentalHealthComponent {

  currentView: 'list' | 'consent' | 'active' | 'report' = 'list';

  hasConsent = false;
  isSessionActive = false;

  sessions: any[] = [];
  currentReport: any = null;

  sessionProgress = 0;
  sessionProgressLabel = 'Initialisation...';

  consentPurposes = [
    { value: 'EMOTIONAL_ANALYSIS', label: 'Analyse émotionnelle', granted: false },
    { value: 'STRESS_DETECTION', label: 'Détection du stress', granted: false },
    { value: 'BURNOUT_PREDICTION', label: 'Prédiction du burnout', granted: false },
  ];

  startSession() {
    this.isSessionActive = true;
    this.currentView = 'active';
  }

  cancelSession() {
    this.isSessionActive = false;
    this.currentView = 'list';
  }

  grantConsent() {
    this.hasConsent = true;
    this.currentView = 'list';
  }

  isConsentValid(): boolean {
    return this.consentPurposes.some(p => p.granted);
  }

  viewReport(session: any) {
    this.currentReport = session.report;
    this.currentView = 'report';
  }

  getStatusBadgeClass(status: string) {
    return 'bg-secondary';
  }

  getStressLevelBadgeClass(level: string) {
    return 'bg-warning';
  }

  getBurnoutRiskBadgeClass(level: string) {
    return 'bg-danger';
  }
}
