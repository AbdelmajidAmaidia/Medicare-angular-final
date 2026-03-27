/**
 * @file doctor-financial.component.ts
 * @description Tableau des revenus du médecin.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-financial',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title">Mes Finances</h1>
      </div>
      <div class="stats-grid mb-4" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem">
        <div class="stat-card stat-card--success" style="display:flex;align-items:flex-start;gap:1rem;background:#fff;border-radius:12px;padding:1.25rem;border:1px solid #e2e8f0">
          <div class="stat-icon" style="background:#dcfce7;color:#22c55e;width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem"><i class="bi bi-cash-stack"></i></div>
          <div><p style="font-size:.8rem;color:#64748b;margin:0 0 .25rem;font-weight:500">Revenus Mars</p><p style="font-size:1.5rem;font-weight:700;color:#0f172a;margin:0">12 450 €</p></div>
        </div>
        <div class="stat-card stat-card--info" style="display:flex;align-items:flex-start;gap:1rem;background:#fff;border-radius:12px;padding:1.25rem;border:1px solid #e2e8f0">
          <div class="stat-icon" style="background:#e0f2fe;color:#0ea5e9;width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem"><i class="bi bi-calendar-check"></i></div>
          <div><p style="font-size:.8rem;color:#64748b;margin:0 0 .25rem;font-weight:500">Consultations</p><p style="font-size:1.5rem;font-weight:700;color:#0f172a;margin:0">142</p></div>
        </div>
      </div>
      <div class="table-card">
        <div class="panel-header" style="display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9">
          <h2 style="font-size:1rem;font-weight:600;color:#0f172a;margin:0;display:flex;align-items:center;gap:.5rem">
            <i class="bi bi-list-columns" style="color:#3b82f6"></i> Détail des Paiements
          </h2>
        </div>
        <div class="table-responsive">
          <table class="data-table" aria-label="Paiements médecin">
            <thead><tr><th>Patient</th><th>Date</th><th>Type</th><th>Montant</th><th>Statut</th></tr></thead>
            <tbody>
              <tr *ngFor="let p of payments">
                <td class="fw-semibold">{{ p.patient }}</td>
                <td class="text-muted small">{{ p.date }}</td>
                <td>{{ p.type }}</td>
                <td class="fw-bold">{{ p.amount }} €</td>
                <td><span class="status-badge" [class.status--active]="p.paid" [class.status--pending]="!p.paid">{{ p.paid ? 'Reçu' : 'En attente' }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class DoctorFinancialComponent {
  payments = [
    { patient: 'John Smith', date: '20 Mar 2026', type: 'Consultation', amount: 75, paid: true },
    { patient: 'Maria Garcia', date: '18 Mar 2026', type: 'Téléconsultation', amount: 60, paid: true },
    { patient: 'David Lee', date: '15 Mar 2026', type: 'Urgence', amount: 120, paid: false },
    { patient: 'Emma Wilson', date: '12 Mar 2026', type: 'Suivi', amount: 50, paid: true },
  ];
}
