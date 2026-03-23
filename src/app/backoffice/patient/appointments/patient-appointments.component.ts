/**
 * @file patient-appointments.component.ts
 * @description Gestion des rendez-vous du patient (liste, prise et annulation).
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PatientAppointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: 'Confirmé' | 'En attente' | 'Annulé' | 'Terminé';
}

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
        <div>
          <h1 class="page-title">Mes Rendez-vous</h1>
          <p class="page-subtitle">{{ appointments.length }} rendez-vous au total</p>
        </div>
        <button class="btn btn-primary"><i class="bi bi-calendar-plus"></i> Nouveau RDV</button>
      </div>
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table" aria-label="Rendez-vous patient">
            <thead><tr><th>Médecin</th><th>Spécialité</th><th>Date</th><th>Heure</th><th>Type</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              <tr *ngFor="let a of appointments">
                <td class="fw-semibold">{{ a.doctor }}</td>
                <td>{{ a.specialty }}</td>
                <td class="text-muted small">{{ a.date }}</td>
                <td><span class="time-chip"><i class="bi bi-clock"></i> {{ a.time }}</span></td>
                <td>{{ a.type }}</td>
                <td>
                  <span class="status-badge"
                    [class.status--active]="a.status==='Confirmé'"
                    [class.status--pending]="a.status==='En attente'"
                    [class.status--suspended]="a.status==='Annulé'"
                    [class.status--info]="a.status==='Terminé'">
                    {{ a.status }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary btn-sm" *ngIf="a.status !== 'Annulé' && a.status !== 'Terminé'">
                      <i class="bi bi-camera-video"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm" (click)="cancel(a.id)" *ngIf="a.status === 'Confirmé' || a.status === 'En attente'">
                      <i class="bi bi-x-circle"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class PatientAppointmentsComponent {
  appointments: PatientAppointment[] = [
    { id: 'A001', doctor: 'Dr. Michael Chen', specialty: 'Cardiologie', date: '25 Mar 2026', time: '10:00', type: 'Présentiel', status: 'Confirmé' },
    { id: 'A002', doctor: 'Dr. Sarah Kim', specialty: 'Endocrinologie', date: '2 Avr 2026', time: '14:30', type: 'Téléconsultation', status: 'En attente' },
    { id: 'A003', doctor: 'Dr. Ahmed Benali', specialty: 'Généraliste', date: '10 Mar 2026', time: '09:00', type: 'Présentiel', status: 'Terminé' },
  ];

  cancel(id: string): void {
    const a = this.appointments.find(ap => ap.id === id);
    if (a) { a.status = 'Annulé'; }
  }
}
