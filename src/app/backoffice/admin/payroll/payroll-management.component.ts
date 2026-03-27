/**
 * @file payroll-management.component.ts
 * @description Gestion de la paie des professionnels de santé.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/** Entrée de paie d'un employé */
export interface PayrollEntry {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  net: number;
  month: string;
  status: 'Payé' | 'En attente';
}

@Component({
  selector: 'app-payroll-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payroll-management.component.html',
})
export class PayrollManagementComponent {
  selectedMonth = 'Mars 2026';

  payrollEntries: PayrollEntry[] = [
    { id: 'PAY-001', name: 'Dr. Michael Chen', role: 'Médecin', baseSalary: 8000, bonuses: 1200, deductions: 500, net: 8700, month: 'Mars 2026', status: 'En attente' },
    { id: 'PAY-002', name: 'Thomas Johnson', role: 'Technicien Labo', baseSalary: 3500, bonuses: 200, deductions: 300, net: 3400, month: 'Mars 2026', status: 'En attente' },
    { id: 'PAY-003', name: 'Sophie Smith', role: 'Pharmacien', baseSalary: 4000, bonuses: 400, deductions: 350, net: 4050, month: 'Mars 2026', status: 'Payé' },
    { id: 'PAY-004', name: 'Dr. Pierre Dupont', role: 'Médecin', baseSalary: 7500, bonuses: 800, deductions: 480, net: 7820, month: 'Mars 2026', status: 'Payé' },
  ];

  get totalNet(): number {
    return this.payrollEntries.reduce((sum, e) => sum + e.net, 0);
  }

  markAsPaid(id: string): void {
    const entry = this.payrollEntries.find(e => e.id === id);
    if (entry) { entry.status = 'Payé'; }
  }
}
