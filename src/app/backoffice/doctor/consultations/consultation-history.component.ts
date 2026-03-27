/**
 * @file consultation-history.component.ts
 * @description Historique des consultations du médecin.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Consultation {
  id: string;
  patient: string;
  date: string;
  diagnosis: string;
  prescription: boolean;
  notes: string;
}

@Component({
  selector: 'app-consultation-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title">Historique des Consultations</h1>
      </div>
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table" aria-label="Consultations">
            <thead><tr><th>ID</th><th>Patient</th><th>Date</th><th>Diagnostic</th><th>Ordonnance</th><th>Notes</th></tr></thead>
            <tbody>
              <tr *ngFor="let c of consultations">
                <td class="text-muted small">{{ c.id }}</td>
                <td class="fw-semibold">{{ c.patient }}</td>
                <td class="text-muted small">{{ c.date }}</td>
                <td>{{ c.diagnosis }}</td>
                <td>
                  <span class="status-badge" [class.status--active]="c.prescription" [class.status--suspended]="!c.prescription">
                    {{ c.prescription ? 'Oui' : 'Non' }}
                  </span>
                </td>
                <td class="text-muted small">{{ c.notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ConsultationHistoryComponent {
  consultations: Consultation[] = [
    { id: 'CON-001', patient: 'John Smith', date: '20 Mar 2026', diagnosis: 'Hypertension artérielle', prescription: true, notes: 'Suivi dans 30j' },
    { id: 'CON-002', patient: 'Maria Garcia', date: '18 Mar 2026', diagnosis: 'Diabète type 2 - contrôle', prescription: true, notes: 'Analyses à prévoir' },
    { id: 'CON-003', patient: 'Emma Wilson', date: '15 Mar 2026', diagnosis: 'Asthme léger', prescription: false, notes: 'Aérosol conseillé' },
  ];
}
