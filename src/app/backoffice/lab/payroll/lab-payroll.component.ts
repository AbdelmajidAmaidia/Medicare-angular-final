/**
 * @file lab-payroll.component.ts
 * @description Fiche de paie du technicien de laboratoire.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-payroll',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container" style="max-width:600px">
      <div class="page-header mb-4">
        <h1 class="page-title">Ma Fiche de Paie</h1>
        <p class="page-subtitle">Mars 2026</p>
      </div>
      <div class="panel p-4" style="background:#fff;border:1px solid #e2e8f0;border-radius:12px">
        <div class="d-flex justify-content-between mb-2 py-2 border-bottom">
          <span class="text-muted">Salaire de base</span>
          <span class="fw-semibold">3 500 €</span>
        </div>
        <div class="d-flex justify-content-between mb-2 py-2 border-bottom">
          <span class="text-muted">Primes de performance</span>
          <span class="fw-semibold text-success">+200 €</span>
        </div>
        <div class="d-flex justify-content-between mb-2 py-2 border-bottom">
          <span class="text-muted">Cotisations sociales</span>
          <span class="fw-semibold text-danger">-300 €</span>
        </div>
        <div class="d-flex justify-content-between py-2 mt-2">
          <span class="fw-bold fs-5">Net à payer</span>
          <span class="fw-bold fs-5 text-success">3 400 €</span>
        </div>
        <div class="mt-4">
          <span class="status-badge status--active">Payé le 28 Mars 2026</span>
        </div>
      </div>
    </div>
  `,
})
export class LabPayrollComponent {}
