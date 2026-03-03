import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FinancialTransaction {
  date: string;
  type: string;
  from?: string;
  to?: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-financial-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-admin.component.html',
})
export class FinancialAdminComponent {
  summary = { totalRevenue: 284500, platformFees: 28450, doctorPayouts: 198150, labPayouts: 34200, pharmacyPayouts: 23700 };

  transactions: FinancialTransaction[] = [
    { date: 'Dec 15', type: 'Platform Fee', from: 'Dr. Michael Chen', amount: 25, status: 'Processed' },
    { date: 'Dec 15', type: 'Doctor Payout', to: 'Dr. Sarah Williams', amount: 3200, status: 'Processed' },
    { date: 'Dec 14', type: 'Lab Payout', to: 'City Lab Center', amount: 1800, status: 'Processing' },
    { date: 'Dec 14', type: 'Platform Fee', from: 'Dr. Robert Johnson', amount: 18, status: 'Processed' },
  ];

  getParty(t: FinancialTransaction): string {
    return t.from ?? t.to ?? '';
  }
}
