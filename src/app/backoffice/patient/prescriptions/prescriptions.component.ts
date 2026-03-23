/**
 * @file prescriptions.component.ts
 * @description Gestion des ordonnances du patient.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Prescription {
  id: string;
  doctor: string;
  date: string;
  medications: string[];
  renewable: boolean;
  expiresAt: string;
}

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title">Mes Ordonnances</h1>
        <p class="page-subtitle">{{ prescriptions.length }} ordonnance(s)</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem">
        <div *ngFor="let p of prescriptions" class="panel p-4" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px">
          <div class="d-flex align-items-start justify-content-between mb-3">
            <div>
              <h3 style="font-size:.95rem;font-weight:700;margin:0">{{ p.id }}</h3>
              <span class="text-muted small">{{ p.doctor }} · {{ p.date }}</span>
            </div>
            <span class="status-badge" [class.status--active]="p.renewable" [class.status--suspended]="!p.renewable">
              {{ p.renewable ? 'Renouvelable' : 'Non renouvelable' }}
            </span>
          </div>
          <ul class="mb-3 ps-3">
            <li *ngFor="let m of p.medications" class="small py-1">{{ m }}</li>
          </ul>
          <div class="d-flex align-items-center justify-content-between">
            <span class="text-muted small"><i class="bi bi-calendar-x"></i> Expire le {{ p.expiresAt }}</span>
            <button class="btn btn-outline-primary btn-sm">
              <i class="bi bi-download"></i> PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PrescriptionsComponent {
  prescriptions: Prescription[] = [
    { id: 'ORD-2026-001', doctor: 'Dr. Chen', date: '20 Mar 2026', medications: ['Metformine 500mg - 2x/jour', 'Amlodipine 5mg - 1x/jour'], renewable: true, expiresAt: '20 Sep 2026' },
    { id: 'ORD-2026-002', doctor: 'Dr. Kim', date: '10 Mar 2026', medications: ['Amoxicilline 500mg - 3x/jour pendant 7j'], renewable: false, expiresAt: '10 Avr 2026' },
  ];
}
