/**
 * @file financial-admin.component.ts
 * @description Tableau financier de la plateforme pour l'administrateur.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Transaction financière */
export interface FinancialTransaction {
  id: string;
  type: 'Paiement' | 'Remboursement' | 'Commission';
  description: string;
  amount: number;
  date: string;
  status: 'Validé' | 'En cours' | 'Annulé';
}

@Component({
  selector: 'app-financial-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-admin.component.html',
})
export class FinancialAdminComponent {
  totalRevenue = 284500;
  totalPending = 12340;
  totalRefunds = 3200;

  transactions: FinancialTransaction[] = [
    { id: 'TXN-001', type: 'Paiement', description: 'Consultation Dr. Chen - Patient #4512', amount: 75, date: '22 Mar 2026', status: 'Validé' },
    { id: 'TXN-002', type: 'Commission', description: 'Commission pharmacie AbouYacer', amount: 45, date: '21 Mar 2026', status: 'Validé' },
    { id: 'TXN-003', type: 'Remboursement', description: 'Annulation rdv - Patient #3210', amount: -50, date: '20 Mar 2026', status: 'En cours' },
    { id: 'TXN-004', type: 'Paiement', description: 'Analyse Labo - Patient #6788', amount: 120, date: '19 Mar 2026', status: 'Validé' },
    { id: 'TXN-005', type: 'Remboursement', description: 'Erreur facturation - Patient #2201', amount: -30, date: '18 Mar 2026', status: 'Annulé' },
  ];

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Validé': 'status--active',
      'En cours': 'status--pending',
      'Annulé': 'status--suspended',
    };
    return map[status] ?? '';
  }
}
