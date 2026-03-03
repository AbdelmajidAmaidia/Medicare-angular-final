import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-records.component.html',
})
export class MedicalRecordsComponent {
  records = [
    { date: 'Dec 10, 2024', type: 'Lab Result', doctor: 'Dr. Michael Chen', description: 'Blood Panel – All normal', status: 'Final' },
    { date: 'Nov 28, 2024', type: 'Prescription', doctor: 'Dr. Sarah Williams', description: 'Lisinopril 10mg – 30 days', status: 'Active' },
    { date: 'Nov 15, 2024', type: 'Consultation', doctor: 'Dr. Robert Johnson', description: 'Annual skin check', status: 'Completed' },
    { date: 'Oct 22, 2024', type: 'Radiology', doctor: 'Dr. Lisa Anderson', description: 'Chest X-Ray – Normal', status: 'Final' },
  ];
}
