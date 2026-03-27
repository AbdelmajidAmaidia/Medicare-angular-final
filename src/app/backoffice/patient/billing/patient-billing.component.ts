/**
 * @file patient-billing.component.ts
 * @description Facturation et historique des paiements du patient.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Invoice {
  id: string;
  description: string;
  provider: string;
  date: string;
  amount: number;
  status: 'Payé' | 'En attente' | 'Remboursé';
}

@Component({
  selector: 'app-patient-billing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-receipt" style="margin-right:.5rem;color:#3b82f6"></i>Facturation</h1>
        <p class="page-subtitle">Total payé ce mois : <strong class="text-primary">{{ totalPaid | number:'1.2-2' }} €</strong></p>
      </div>
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table" aria-label="Factures patient">
            <thead><tr><th>Réf.</th><th>Description</th><th>Prestataire</th><th>Date</th><th>Montant</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              <tr *ngFor="let inv of invoices">
                <td class="text-muted small">{{ inv.id }}</td>
                <td>{{ inv.description }}</td>
                <td>{{ inv.provider }}</td>
                <td class="text-muted small">{{ inv.date }}</td>
                <td class="fw-bold">{{ inv.amount }} €</td>
                <td>
                  <span class="status-badge"
                    [class.status--active]="inv.status==='Payé'"
                    [class.status--pending]="inv.status==='En attente'"
                    [class.status--info]="inv.status==='Remboursé'">
                    {{ inv.status }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-download"></i></button>
                    <button class="btn btn-primary btn-sm" *ngIf="inv.status==='En attente'">
                      <i class="bi bi-credit-card"></i> Payer
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
export class PatientBillingComponent {
  invoices: Invoice[] = [
    { id: 'INV-001', description: 'Consultation cardiologie', provider: 'Dr. Michael Chen', date: '20 Mar 2026', amount: 75, status: 'Payé' },
    { id: 'INV-002', description: 'Analyse sanguine NFS', provider: 'Labo Central', date: '18 Mar 2026', amount: 45, status: 'Payé' },
    { id: 'INV-003', description: 'Téléconsultation endocrinologie', provider: 'Dr. Sarah Kim', date: '25 Mar 2026', amount: 60, status: 'En attente' },
    { id: 'INV-004', description: 'Ordonnance pharmacie', provider: 'Pharmacie Al Amal', date: '15 Mar 2026', amount: 20.50, status: 'Remboursé' },
  ];

  get totalPaid(): number {
    return this.invoices.filter(i => i.status === 'Payé').reduce((sum, i) => sum + i.amount, 0);
  }
}
