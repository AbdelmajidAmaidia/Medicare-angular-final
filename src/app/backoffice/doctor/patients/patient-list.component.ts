import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent {
  patients = [
    { name: 'John Smith', age: 45, condition: 'Hypertension', lastVisit: 'Dec 10, 2024', status: 'Active' },
    { name: 'Maria Garcia', age: 32, condition: 'Diabetes Type 2', lastVisit: 'Dec 8, 2024', status: 'Active' },
    { name: 'David Lee', age: 58, condition: 'Cardiac Arrhythmia', lastVisit: 'Nov 28, 2024', status: 'Monitoring' },
    { name: 'Emma Wilson', age: 28, condition: 'Asthma', lastVisit: 'Nov 15, 2024', status: 'Stable' },
    { name: 'James Brown', age: 67, condition: 'COPD', lastVisit: 'Nov 10, 2024', status: 'Critical' },
  ];
}
