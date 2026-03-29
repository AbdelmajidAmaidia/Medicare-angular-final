/**
 * @file lab-results.component.ts
 * @description Saisie et gestion des résultats d'analyses.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LabResult {
  id: string;
  patient: string;
  testType: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'Normal' | 'Anormal' | 'Critique';
  date: string;
}

@Component({
  selector: 'app-lab-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header mb-4">
        <h1 class="page-title"><i class="bi bi-clipboard-data" style="margin-right:.5rem;color:#3b82f6"></i>Saisie des Résultats</h1>
      </div>
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table" aria-label="Résultats d'analyses">
            <thead>
              <tr><th>Patient</th><th>Examen</th><th>Valeur</th><th>Unité</th><th>Norme</th><th>Statut</th><th>Date</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of results">
                <td class="fw-semibold">{{r.patient}}</td>
                <td>{{r.testType}}</td>
                <td class="fw-bold">{{r.value}}</td>
                <td class="text-muted small">{{r.unit}}</td>
                <td class="text-muted small">{{r.normalRange}}</td>
                <td>
                  <span class="status-badge"
                    [class.status--active]="r.status==='Normal'"
                    [class.status--pending]="r.status==='Anormal'"
                    [class.status--suspended]="r.status==='Critique'">
                    {{r.status}}
                  </span>
                </td>
                <td class="text-muted small">{{r.date}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class LabResultsComponent {
  results: LabResult[] = [
    { id: 'R001', patient: 'John Smith', testType: 'Glycémie à jeun', value: '5.8', unit: 'mmol/L', normalRange: '3.9–6.1', status: 'Normal', date: '22 Mar 2026' },
    { id: 'R002', patient: 'Maria Garcia', testType: 'HbA1c', value: '7.2', unit: '%', normalRange: '<6.5', status: 'Anormal', date: '22 Mar 2026' },
    { id: 'R003', patient: 'David Lee', testType: 'Créatinine', value: '2.8', unit: 'mg/dL', normalRange: '0.7–1.3', status: 'Critique', date: '22 Mar 2026' },
  ];
}
