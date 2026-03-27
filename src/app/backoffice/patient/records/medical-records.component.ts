/**
 * @file medical-records.component.ts
 * @description Dossier médical du patient (antécédents, allergies, traitements).
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-file-medical" style="margin-right:.5rem;color:#3b82f6"></i>Mon Dossier Médical</h1>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem" class="responsive-grid">
        <section class="panel p-4" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px">
          <h2 style="font-size:1rem;font-weight:600;color:#0f172a;margin:0 0 1rem;display:flex;align-items:center;gap:.5rem">
            <i class="bi bi-clipboard-heart" style="color:#3b82f6"></i> Antécédents Médicaux
          </h2>
          <ul class="list-unstyled mb-0">
            <li *ngFor="let h of history" class="d-flex align-items-center gap-2 py-2 border-bottom">
              <i class="bi bi-dot text-danger fs-4"></i>
              <div>
                <strong class="small">{{ h.condition }}</strong>
                <span class="text-muted small d-block">Depuis {{ h.since }}</span>
              </div>
            </li>
          </ul>
        </section>
        <section class="panel p-4" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px">
          <h2 style="font-size:1rem;font-weight:600;color:#0f172a;margin:0 0 1rem;display:flex;align-items:center;gap:.5rem">
            <i class="bi bi-shield-exclamation" style="color:#f59e0b"></i> Allergies
          </h2>
          <ul class="list-unstyled mb-0">
            <li *ngFor="let a of allergies" class="d-flex align-items-center gap-2 py-2 border-bottom">
              <span class="badge bg-warning text-dark">{{ a.severity }}</span>
              <span class="small fw-semibold">{{ a.allergen }}</span>
            </li>
          </ul>
        </section>
        <section class="panel p-4" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;grid-column:1/-1">
          <h2 style="font-size:1rem;font-weight:600;color:#0f172a;margin:0 0 1rem;display:flex;align-items:center;gap:.5rem">
            <i class="bi bi-capsule" style="color:#22c55e"></i> Traitements en Cours
          </h2>
          <div class="table-responsive">
            <table class="data-table" aria-label="Traitements">
              <thead><tr><th>Médicament</th><th>Dosage</th><th>Fréquence</th><th>Depuis</th><th>Prescrit par</th></tr></thead>
              <tbody>
                <tr *ngFor="let t of treatments">
                  <td class="fw-semibold">{{ t.name }}</td>
                  <td>{{ t.dosage }}</td>
                  <td>{{ t.frequency }}</td>
                  <td class="text-muted small">{{ t.since }}</td>
                  <td>{{ t.doctor }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  `,
})
export class MedicalRecordsComponent {
  history = [
    { condition: 'Hypertension artérielle', since: '2020' },
    { condition: 'Diabète type 2', since: '2022' },
  ];

  allergies = [
    { allergen: 'Pénicilline', severity: 'Modérée' },
    { allergen: 'Aspirine', severity: 'Légère' },
  ];

  treatments = [
    { name: 'Metformine 500mg', dosage: '2 cp/jour', frequency: 'Matin & soir', since: 'Jan 2023', doctor: 'Dr. Chen' },
    { name: 'Amlodipine 5mg', dosage: '1 cp/jour', frequency: 'Matin', since: 'Mar 2021', doctor: 'Dr. Kim' },
  ];
}
