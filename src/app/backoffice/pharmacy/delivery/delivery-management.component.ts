/**
 * @file delivery-management.component.ts
 * @description Gestion des livraisons de médicaments.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Delivery {
  id: string;
  patient: string;
  address: string;
  driver: string;
  estimatedTime: string;
  status: 'En transit' | 'Livré' | 'Retardé';
}

@Component({
  selector: 'app-delivery-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-truck" style="margin-right:.5rem;color:#3b82f6"></i>Gestion des Livraisons</h1>
        <p class="page-subtitle">{{ deliveries.length }} livraison(s) actives</p>
      </div>
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table" aria-label="Livraisons en cours">
            <thead><tr><th>ID</th><th>Patient</th><th>Adresse</th><th>Livreur</th><th>Heure estimée</th><th>Statut</th><th>Actions</th></tr></thead>
            <tbody>
              <tr *ngFor="let d of deliveries">
                <td class="text-muted small">{{d.id}}</td>
                <td class="fw-semibold">{{d.patient}}</td>
                <td class="text-muted small">{{d.address}}</td>
                <td>{{d.driver}}</td>
                <td><span class="time-chip"><i class="bi bi-clock"></i> {{d.estimatedTime}}</span></td>
                <td>
                  <span class="status-badge"
                    [class.status--info]="d.status==='En transit'"
                    [class.status--active]="d.status==='Livré'"
                    [class.status--suspended]="d.status==='Retardé'">
                    {{d.status}}
                  </span>
                </td>
                <td>
                  <button class="btn btn-outline-primary btn-sm" *ngIf="d.status !== 'Livré'" (click)="markDelivered(d.id)">
                    <i class="bi bi-check-circle"></i> Livré
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class DeliveryManagementComponent {
  deliveries: Delivery[] = [
    { id: 'DEL-001', patient: 'John Smith', address: '12 Rue des Roses, Alger', driver: 'Ahmed B.', estimatedTime: '14:30', status: 'En transit' },
    { id: 'DEL-002', patient: 'Maria Garcia', address: '5 Bd Zighout, Oran', driver: 'Karim M.', estimatedTime: '15:00', status: 'Retardé' },
    { id: 'DEL-003', patient: 'Emma Wilson', address: '8 Rue Didouche, Constantine', driver: 'Sofiane A.', estimatedTime: '13:45', status: 'Livré' },
  ];

  markDelivered(id: string): void {
    const d = this.deliveries.find(del => del.id === id);
    if (d) { d.status = 'Livré'; }
  }
}
