import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Delivery { id: string; patient: string; address: string; medications: string; rider: string; dispatchTime: string; eta: string; status: string; }

@Component({
  selector: 'app-delivery-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-management.component.html',
})
export class DeliveryManagementComponent {
  deliveries: Delivery[] = [
    { id: 'DEL-001', patient: 'Sarah Martinez', address: '123 Oak Street', medications: 'Lisinopril 10mg x30', rider: 'Alex Johnson', dispatchTime: '10:15 AM', eta: '11:00 AM', status: 'In Transit' },
    { id: 'DEL-002', patient: 'John Smith', address: '456 Maple Ave', medications: 'Metformin 500mg x60', rider: 'Maria Lopez', dispatchTime: '10:30 AM', eta: '11:15 AM', status: 'In Transit' },
    { id: 'DEL-003', patient: 'Emma Wilson', address: '789 Pine Road', medications: 'Cetirizine 10mg x60', rider: 'David Park', dispatchTime: '9:45 AM', eta: '10:30 AM', status: 'Delivered' },
  ];
}
