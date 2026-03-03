import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-dashboard.component.html',
})
export class PatientDashboardComponent {
  stats = [
    { label: 'Upcoming Appointments', value: '3' },
    { label: 'Active Prescriptions', value: '5' },
    { label: 'Pending Lab Results', value: '2' },
    { label: 'Unread Messages', value: '1' },
  ];

  appointments = [
    { doctor: 'Dr. Michael Chen', specialty: 'Cardiology', date: 'Dec 20, 2024', time: '10:00 AM', status: 'Confirmed' },
    { doctor: 'Dr. Sarah Williams', specialty: 'General Practice', date: 'Dec 22, 2024', time: '2:30 PM', status: 'Pending' },
    { doctor: 'Dr. Robert Johnson', specialty: 'Dermatology', date: 'Dec 28, 2024', time: '11:00 AM', status: 'Confirmed' },
  ];
}
