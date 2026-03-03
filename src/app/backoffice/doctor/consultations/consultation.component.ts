import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation.component.html',
})
export class ConsultationComponent {
  activeConsultation = {
    patient: 'John Smith',
    age: 45,
    condition: 'Hypertension follow-up',
    notes: '',
    diagnosis: '',
    prescription: '',
  };
  
  consultationHistory = [
    { date: 'Dec 10, 2024', patient: 'Maria Garcia', diagnosis: 'Type 2 Diabetes', duration: '45 min' },
    { date: 'Dec 8, 2024', patient: 'David Lee', diagnosis: 'Cardiac Arrhythmia', duration: '60 min' },
    { date: 'Nov 28, 2024', patient: 'Emma Wilson', diagnosis: 'Asthma exacerbation', duration: '30 min' },
  ];

  saveConsultation() {
    alert('Consultation saved successfully.');
  }
}
