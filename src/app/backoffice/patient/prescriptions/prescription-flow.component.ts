import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prescription-flow.component.html',
})
export class PrescriptionFlowComponent {
  prescriptions = [
    { id: 'RX-001', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', prescribedBy: 'Dr. Michael Chen', date: 'Dec 10, 2024', refills: 2, status: 'Active' },
    { id: 'RX-002', medication: 'Atorvastatin 20mg', dosage: '1 tablet at bedtime', prescribedBy: 'Dr. Michael Chen', date: 'Dec 10, 2024', refills: 5, status: 'Active' },
    { id: 'RX-003', medication: 'Cetirizine 10mg', dosage: '1 tablet as needed', prescribedBy: 'Dr. Sarah Williams', date: 'Nov 28, 2024', refills: 0, status: 'Expired' },
  ];
}
