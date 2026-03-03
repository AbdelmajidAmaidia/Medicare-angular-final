import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pharmacy-orders.component.html',
})
export class PharmacyOrdersComponent {
  orders = [
    { id: 'PO-001', medication: 'Lisinopril 10mg', quantity: '30 tablets', prescribedBy: 'Dr. Michael Chen', orderedDate: 'Dec 15, 2024', status: 'In Transit' },
    { id: 'PO-002', medication: 'Cetirizine 10mg', quantity: '60 tablets', prescribedBy: 'Dr. Sarah Williams', orderedDate: 'Dec 10, 2024', status: 'Delivered' },
    { id: 'PO-003', medication: 'Vitamin D3 2000IU', quantity: '90 capsules', prescribedBy: 'Dr. Robert Johnson', orderedDate: 'Dec 8, 2024', status: 'Processing' },
  ];
}
