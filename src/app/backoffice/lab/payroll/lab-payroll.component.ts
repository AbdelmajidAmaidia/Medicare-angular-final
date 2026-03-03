import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-payroll.component.html',
})
export class LabPayrollComponent {
  payrollData = [
    { period: 'December 2024', baseSalary: 4500, testsCompleted: 320, bonus: 480, total: 4980, status: 'Pending' },
    { period: 'November 2024', baseSalary: 4500, testsCompleted: 298, bonus: 447, total: 4947, status: 'Paid' },
    { period: 'October 2024', baseSalary: 4500, testsCompleted: 312, bonus: 468, total: 4968, status: 'Paid' },
  ];
}
