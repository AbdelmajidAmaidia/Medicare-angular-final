import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-dashboard.component.html',
})
export class LabDashboardComponent {
  stats = [
    { label: 'Samples Today', value: '24' },
    { label: 'Results Pending', value: '8' },
    { label: 'Completed Today', value: '16' },
    { label: 'Critical Results', value: '2' },
  ];

  pendingTests = [
    { id: 'LAB-001', patient: 'John Smith', test: 'CBC + Metabolic Panel', priority: 'Routine', received: '8:15 AM' },
    { id: 'LAB-002', patient: 'Maria Garcia', test: 'HbA1c', priority: 'Routine', received: '8:30 AM' },
    { id: 'LAB-003', patient: 'Emma Wilson', test: 'Chest X-Ray Analysis', priority: 'Urgent', received: '9:00 AM' },
  ];
}
