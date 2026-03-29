/**
 * @file pharmacy-wallet.component.ts
 * @description Portefeuille et historique des paiements de la pharmacie.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-wallet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container" style="max-width:800px">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-wallet2" style="margin-right:.5rem;color:#3b82f6"></i>Portefeuille</h1>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem">
        <div style="background:linear-gradient(135deg,#3b82f6,#2563eb);border-radius:16px;padding:1.5rem;color:#fff">
          <p style="font-size:.85rem;opacity:.8;margin:0 0 .5rem">Solde Disponible</p>
          <p style="font-size:2rem;font-weight:700;margin:0">15 840 €</p>
          <p style="font-size:.75rem;opacity:.7;margin:.5rem 0 0">Dernière mise à jour : 22 Mar 2026</p>
        </div>
        <div style="background:linear-gradient(135deg,#22c55e,#16a34a);border-radius:16px;padding:1.5rem;color:#fff">
          <p style="font-size:.85rem;opacity:.8;margin:0 0 .5rem">Revenus ce Mois</p>
          <p style="font-size:2rem;font-weight:700;margin:0">15 800 €</p>
          <p style="font-size:.75rem;opacity:.7;margin:.5rem 0 0">+12% vs mois dernier</p>
        </div>
      </div>
      <div class="table-card">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9">
          <h2 style="font-size:1rem;font-weight:600;margin:0;display:flex;align-items:center;gap:.5rem">
            <i class="bi bi-clock-history" style="color:#3b82f6"></i> Transactions Récentes
          </h2>
        </div>
        <div class="table-responsive">
          <table class="data-table" aria-label="Transactions portefeuille">
            <thead><tr><th>Description</th><th>Date</th><th>Montant</th><th>Statut</th></tr></thead>
            <tbody>
              <tr *ngFor="let t of transactions">
                <td>{{t.description}}</td>
                <td class="text-muted small">{{t.date}}</td>
                <td [class.text-success]="t.amount > 0" [class.text-danger]="t.amount < 0" class="fw-bold">
                  {{t.amount > 0 ? '+' : ''}}{{t.amount}} €
                </td>
                <td><span class="status-badge" [class.status--active]="t.status==='Validé'" [class.status--pending]="t.status==='En cours'">{{t.status}}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class PharmacyWalletComponent {
  transactions = [
    { description: 'Commande ORD-001 - John Smith', date: '22 Mar 2026', amount: 24.50, status: 'Validé' },
    { description: 'Commande ORD-002 - Maria Garcia', date: '21 Mar 2026', amount: 48.00, status: 'En cours' },
    { description: 'Retrait portefeuille', date: '20 Mar 2026', amount: -500, status: 'Validé' },
    { description: 'Commande ORD-003 - Emma Wilson', date: '19 Mar 2026', amount: 18.90, status: 'Validé' },
  ];
}
