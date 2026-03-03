import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-scheduler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-scheduler.component.html',
})
export class DoctorSchedulerComponent {
  schedule = [
    { time: '9:00 AM', patient: 'John Smith', type: 'Follow-up', duration: '30 min', status: 'Confirmed' },
    { time: '10:00 AM', patient: 'Maria Garcia', type: 'New Patient', duration: '60 min', status: 'Confirmed' },
    { time: '11:00 AM', patient: 'David Lee', type: 'Consultation', duration: '45 min', status: 'Waiting' },
    { time: '2:00 PM', patient: 'Emma Wilson', type: 'Follow-up', duration: '30 min', status: 'Confirmed' },
    { time: '3:30 PM', patient: 'James Brown', type: 'Urgent', duration: '60 min', status: 'Confirmed' },
  ];
}
