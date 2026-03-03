import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pharmacy-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pharmacy-dashboard.component.html',
})
export class PharmacyDashboardComponent {
  stats = [
    { label: 'Orders Today', value: '38' },
    { label: 'Pending Delivery', value: '12' },
    { label: 'Low Stock Items', value: '5' },
    { label: "Today's Revenue", value: '$4,280' },
  ];

  recentOrders = [
    { id: 'ORD-001', patient: 'Sarah Martinez', items: 'Lisinopril 10mg x30', time: '9:15 AM', status: 'Processing' },
    { id: 'ORD-002', patient: 'John Smith', items: 'Metformin 500mg x60', time: '9:30 AM', status: 'Ready' },
    { id: 'ORD-003', patient: 'Maria Garcia', items: 'Atorvastatin 20mg x30', time: '10:00 AM', status: 'Dispatched' },
    { id: 'ORD-004', patient: 'Emma Wilson', items: 'Cetirizine 10mg x60', time: '10:20 AM', status: 'Delivered' },
  ];
}
