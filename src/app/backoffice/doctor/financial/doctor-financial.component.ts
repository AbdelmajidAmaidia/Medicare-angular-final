import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-financial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-financial.component.html',
})
export class DoctorFinancialComponent {
  summary = { monthlyEarnings: 12450, pendingPayments: 2850, totalPatients: 142, avgPerConsultation: 175 };

  transactions = [
    { date: 'Dec 15', patient: 'John Smith', service: 'Follow-up', amount: 150, status: 'Paid' },
    { date: 'Dec 14', patient: 'Maria Garcia', service: 'New Patient', amount: 250, status: 'Paid' },
    { date: 'Dec 13', patient: 'David Lee', service: 'Consultation', amount: 200, status: 'Pending' },
    { date: 'Dec 12', patient: 'Emma Wilson', service: 'Follow-up', amount: 150, status: 'Paid' },
  ];
}
