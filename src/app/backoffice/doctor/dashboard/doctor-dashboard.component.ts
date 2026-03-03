import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-dashboard.component.html',
})
export class DoctorDashboardComponent {
  stats = [
    { label: "Today's Appointments", value: '8' },
    { label: 'Total Patients', value: '142' },
    { label: 'Pending Reviews', value: '5' },
    { label: 'Monthly Earnings', value: '$12,450' },
  ];

  todayAppointments = [
    { patient: 'John Smith', age: 45, type: 'Follow-up', time: '9:00 AM', status: 'Arrived' },
    { patient: 'Maria Garcia', age: 32, type: 'New Patient', time: '10:00 AM', status: 'Waiting' },
    { patient: 'David Lee', age: 58, type: 'Consultation', time: '11:00 AM', status: 'Scheduled' },
    { patient: 'Emma Wilson', age: 28, type: 'Follow-up', time: '2:00 PM', status: 'Scheduled' },
    { patient: 'James Brown', age: 67, type: 'Urgent', time: '3:30 PM', status: 'Scheduled' },
  ];
}
