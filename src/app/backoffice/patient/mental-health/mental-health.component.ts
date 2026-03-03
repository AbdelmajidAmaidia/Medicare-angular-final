import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MentalHealthService } from '../../../services/mental-health.service';
import {
  Consent,
  MentalHealthSession,
  MH_SessionStatus,
} from '../../../models/mental-health.models';

type View = 'list' | 'consent' | 'session' | 'report';

@Component({
  selector: 'app-mental-health',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mental-health.component.html',
})
export class MentalHealthComponent implements OnInit, OnDestroy {

  // The mock patient ID (would come from AuthService in a real app)
  readonly patientId = 'USR-001';

  view: View = 'list';
  sessions: MentalHealthSession[] = [];
  consent: Consent | undefined;
  activeSession: MentalHealthSession | undefined;
  selectedSession: MentalHealthSession | undefined;
  errorMessage = '';

  // Expose enum values to the template
  readonly MH_SessionStatus = MH_SessionStatus;

  private sub!: Subscription;

  constructor(private mhService: MentalHealthService) {}

  ngOnInit(): void {
    this.sub = this.mhService.sessions$.subscribe(() => {
      this.sessions = this.mhService.getSessionsByPatient(this.patientId);
      this.consent  = this.mhService.getConsent(this.patientId);
      this.activeSession = this.mhService.getActiveSession(this.patientId);

      // If we were watching an active session and it just completed, refresh it
      if (this.view === 'session' && this.activeSession === undefined) {
        const justCompleted = this.sessions.find(
          s => s.id === this.selectedSession?.id && s.status === MH_SessionStatus.COMPLETED
        );
        if (justCompleted) {
          this.selectedSession = justCompleted;
          this.view = 'report';
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // ---- Patient capabilities ----

  /** Step 1: Show consent form */
  showConsentForm(): void {
    this.view = 'consent';
    this.errorMessage = '';
  }

  /** Patient grants consent */
  grantConsent(): void {
    this.consent = this.mhService.grantConsent(this.patientId);
    this.view = 'list';
  }

  /** Step 2: Start session (requires consent) */
  startSession(): void {
    this.errorMessage = '';
    try {
      const session = this.mhService.startSession(this.patientId);
      this.selectedSession = session;
      this.view = 'session';
    } catch (e: unknown) {
      this.errorMessage = e instanceof Error ? e.message : 'An error occurred.';
    }
  }

  /** View a past report */
  viewReport(session: MentalHealthSession): void {
    this.selectedSession = session;
    this.view = 'report';
  }

  /** Go back to session list */
  backToList(): void {
    this.view = 'list';
    this.selectedSession = undefined;
    this.errorMessage = '';
  }
}
