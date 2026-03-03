import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WalletTransaction { date: string; description: string; type: string; amount: number; balance: number; }

@Component({
  selector: 'app-pharmacy-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pharmacy-wallet.component.html',
})
export class PharmacyWalletComponent {
  balance = 28450;
  pendingPayout = 6200;

  transactions: WalletTransaction[] = [
    { date: 'Dec 15', description: 'Order #ORD-038 Payment', type: 'Credit', amount: 156, balance: 28450 },
    { date: 'Dec 15', description: 'Order #ORD-037 Payment', type: 'Credit', amount: 89, balance: 28294 },
    { date: 'Dec 14', description: 'Weekly Payout Transfer', type: 'Debit', amount: -5200, balance: 28205 },
    { date: 'Dec 14', description: 'Order #ORD-036 Payment', type: 'Credit', amount: 220, balance: 33405 },
  ];
}
