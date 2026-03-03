import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billing-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing-history.component.html',
})
export class BillingHistoryComponent {
  invoices = [
    { id: 'INV-001', date: 'Dec 10, 2024', description: 'Cardiology Consultation', amount: 250, status: 'Paid' },
    { id: 'INV-002', date: 'Nov 28, 2024', description: 'Blood Panel Lab Test', amount: 85, status: 'Paid' },
    { id: 'INV-003', date: 'Nov 15, 2024', description: 'Skin Check Consultation', amount: 180, status: 'Pending' },
    { id: 'INV-004', date: 'Oct 22, 2024', description: 'Chest X-Ray', amount: 320, status: 'Paid' },
  ];

  get totalPaid(): number {
    return this.invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  }
}
