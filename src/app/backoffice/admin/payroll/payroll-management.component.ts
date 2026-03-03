import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll-management.component.html',
})
export class PayrollManagementComponent {
  payroll = [
    { name: 'Dr. Michael Chen', role: 'Doctor', baseSalary: 8000, consultations: 45, bonus: 1125, total: 9125, status: 'Pending' },
    { name: 'Dr. Sarah Williams', role: 'Doctor', baseSalary: 7500, consultations: 38, bonus: 950, total: 8450, status: 'Pending' },
    { name: 'Lab Tech Johnson', role: 'Lab', baseSalary: 4500, consultations: 320, bonus: 480, total: 4980, status: 'Processed' },
    { name: 'Pharma Smith', role: 'Pharmacy', baseSalary: 5000, consultations: 0, bonus: 800, total: 5800, status: 'Pending' },
  ];

  processPayroll(name: string) {
    const p = this.payroll.find(p => p.name === name);
    if (p) p.status = 'Processed';
  }
}
