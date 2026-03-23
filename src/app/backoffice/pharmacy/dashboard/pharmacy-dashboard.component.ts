/**
 * @file pharmacy-dashboard.component.ts
 * @description Tableau de bord du pharmacien.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title">Tableau de Bord Pharmacie</h1>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;margin-bottom:1.75rem">
        <div *ngFor="let s of stats" style="display:flex;align-items:flex-start;gap:1rem;background:#fff;border-radius:12px;padding:1.25rem;border:1px solid #e2e8f0">
          <div style="width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.25rem" [style.background]="s.bg" [style.color]="s.fg">
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
            <i class="bi bi-bag-check" style="color:#3b82f6"></i> Commandes Récentes
          </h2>
        </div>
        <div class="table-responsive">
          <table class="data-table" aria-label="Commandes pharmacie">
            <thead><tr><th>Commande</th><th>Patient</th><th>Médicaments</th><th>Total</th><th>Statut</th></tr></thead>
            <tbody>
              <tr *ngFor="let o of orders">
                <td class="text-muted small">{{o.id}}</td>
                <td class="fw-semibold">{{o.patient}}</td>
                <td>{{o.items}}</td>
                <td class="fw-bold">{{o.total}} €</td>
                <td><span class="status-badge"
                  [class.status--active]="o.status==='Livré'"
                  [class.status--pending]="o.status==='En cours'"
                  [class.status--info]="o.status==='Préparation'">
                  {{o.status}}
                </span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class PharmacyDashboardComponent {
  stats = [
    { label: 'Commandes Aujourd\'hui', value: '24', icon: 'bi-bag', bg: '#dbeafe', fg: '#3b82f6' },
    { label: 'Livraisons Actives', value: '8', icon: 'bi-truck', bg: '#e0f2fe', fg: '#0ea5e9' },
    { label: 'Stock Critique', value: '3', icon: 'bi-exclamation-triangle', bg: '#fee2e2', fg: '#ef4444' },
    { label: 'Revenu Mensuel', value: '15 800 €', icon: 'bi-wallet2', bg: '#dcfce7', fg: '#22c55e' },
  ];

  orders = [
    { id: 'ORD-001', patient: 'John Smith', items: 'Metformine 500mg, Aspirine', total: 24.50, status: 'Livré' },
    { id: 'ORD-002', patient: 'Maria Garcia', items: 'Insuline Glargine', total: 48.00, status: 'En cours' },
    { id: 'ORD-003', patient: 'Emma Wilson', items: 'Ventoline, Sérum phy.', total: 18.90, status: 'Préparation' },
  ];
}
