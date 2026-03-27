/**
 * @file appointment-planning.component.ts
 * @description Gestion du planning de rendez-vous du médecin.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Appointment {
  time: string;
  patient: string;
  type: string;
  duration: string;
  status: 'Confirmé' | 'Annulé' | 'En attente';
}

@Component({
  selector: 'app-appointment-planning',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-calendar2-week" style="margin-right:.5rem;color:#3b82f6"></i>Mon Planning</h1>
        <p class="page-subtitle">{{ appointments.length }} rendez-vous cette semaine</p>
      </div>
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table" aria-label="Planning médecin">
            <thead><tr><th>Heure</th><th>Patient</th><th>Type</th><th>Durée</th><th>Statut</th></tr></thead>
            <tbody>
              <tr *ngFor="let a of appointments">
                <td><span class="time-chip"><i class="bi bi-clock"></i> {{ a.time }}</span></td>
                <td class="fw-semibold">{{ a.patient }}</td>
                <td>{{ a.type }}</td>
                <td class="text-muted small">{{ a.duration }}</td>
                <td>
                  <span class="status-badge"
                    [class.status--active]="a.status==='Confirmé'"
                    [class.status--pending]="a.status==='En attente'"
                    [class.status--suspended]="a.status==='Annulé'">
                    {{ a.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class AppointmentPlanningComponent {
  appointments: Appointment[] = [
    { time: '09:00', patient: 'John Smith', type: 'Consultation', duration: '30 min', status: 'Confirmé' },
    { time: '10:00', patient: 'Maria Garcia', type: 'Suivi', duration: '20 min', status: 'Confirmé' },
    { time: '11:00', patient: 'David Lee', type: 'Urgence', duration: '45 min', status: 'En attente' },
    { time: '14:00', patient: 'Emma Wilson', type: 'Téléconsultation', duration: '30 min', status: 'Confirmé' },
    { time: '15:30', patient: 'James Brown', type: 'Suivi', duration: '20 min', status: 'Annulé' },
  ];
}
