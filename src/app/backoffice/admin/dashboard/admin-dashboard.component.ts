import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
  stats = [
    { label: 'Total Users', value: '12,450' },
    { label: 'Active Doctors', value: '280' },
    { label: 'Appointments Today', value: '1,240' },
    { label: 'Monthly Revenue', value: '$284,500' },
  ];

  recentAlerts = [
    { type: 'error', message: 'Server load at 85%', time: '5 min ago' },
    { type: 'warning', message: '12 doctor verifications pending', time: '1 hour ago' },
    { type: 'success', message: 'Daily backup completed', time: '2 hours ago' },
    { type: 'info', message: 'New platform version available', time: '3 hours ago' },
  ];
}
