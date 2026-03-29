/**
 * @file lab-dashboard.component.ts
 * @description Tableau de bord du technicien de laboratoire.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-clipboard2-pulse" style="margin-right:.5rem;color:#3b82f6"></i>Tableau de Bord Laboratoire</h1>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:1.75rem">
        <div *ngFor="let s of stats" class="stat-card" [ngClass]="'stat-card--'+s.color" style="display:flex;align-items:flex-start;gap:1rem;background:#fff;border-radius:12px;padding:1.25rem;border:1px solid #e2e8f0">
          <div class="stat-icon" style="width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem" [style.background]="s.bg" [style.color]="s.fg">
            <i [class]="'bi '+s.icon"></i>
          </div>
          <div>
            <p style="font-size:.8rem;color:#64748b;margin:0 0 .25rem;font-weight:500">{{s.label}}</p>
            <p style="font-size:1.5rem;font-weight:700;color:#0f172a;margin:0">{{s.value}}</p>
          </div>
        </div>
      </div>
      <div class="table-card">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9">
          <h2 style="font-size:1rem;font-weight:600;margin:0;display:flex;align-items:center;gap:.5rem">
            <i class="bi bi-clipboard-data" style="color:#3b82f6"></i> Analyses Récentes
          </h2>
        </div>
        <div class="table-responsive">
          <table class="data-table" aria-label="Analyses de laboratoire">
            <thead><tr><th>Réf.</th><th>Patient</th><th>Type</th><th>Date</th><th>Statut</th></tr></thead>
            <tbody>
              <tr *ngFor="let a of analyses">
                <td class="text-muted small">{{a.ref}}</td>
                <td class="fw-semibold">{{a.patient}}</td>
                <td>{{a.type}}</td>
                <td class="text-muted small">{{a.date}}</td>
                <td><span class="status-badge" [class.status--active]="a.done" [class.status--pending]="!a.done">{{a.done?'Terminé':'En cours'}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class LabDashboardComponent {
  stats = [
    { label: 'Analyses Aujourd\'hui', value: '48', icon: 'bi-clipboard-data', color: 'primary', bg: '#dbeafe', fg: '#3b82f6' },
    { label: 'En Attente', value: '12', icon: 'bi-hourglass-split', color: 'warning', bg: '#fef3c7', fg: '#f59e0b' },
    { label: 'Terminées', value: '36', icon: 'bi-check-circle', color: 'success', bg: '#dcfce7', fg: '#22c55e' },
    { label: 'Revenu Mensuel', value: '8 200 €', icon: 'bi-wallet2', color: 'info', bg: '#e0f2fe', fg: '#0ea5e9' },
  ];

  analyses = [
    { ref: 'LAB-001', patient: 'John Smith', type: 'Glycémie', date: '22 Mar 2026', done: true },
    { ref: 'LAB-002', patient: 'Maria Garcia', type: 'NFS Complète', date: '22 Mar 2026', done: true },
    { ref: 'LAB-003', patient: 'David Lee', type: 'Bilan Lipidique', date: '22 Mar 2026', done: false },
    { ref: 'LAB-004', patient: 'Emma Wilson', type: 'TSH', date: '21 Mar 2026', done: false },
  ];
}
