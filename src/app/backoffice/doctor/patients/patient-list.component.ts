/**
 * @file patient-list.component.ts
 * @description Liste des patients du médecin avec recherche et filtrage.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/** Patient du médecin */
export interface DoctorPatient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  nextVisit: string;
  status: 'Stable' | 'Suivi requis' | 'Urgent';
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent {
  searchTerm = '';

  patients: DoctorPatient[] = [
    { id: 'PAT-001', name: 'John Smith', age: 45, condition: 'Hypertension', lastVisit: '10 Mar 2026', nextVisit: '10 Avr 2026', status: 'Stable' },
    { id: 'PAT-002', name: 'Maria Garcia', age: 32, condition: 'Diabète Type 2', lastVisit: '15 Mar 2026', nextVisit: '15 Avr 2026', status: 'Suivi requis' },
    { id: 'PAT-003', name: 'David Lee', age: 58, condition: 'Insuffisance Cardiaque', lastVisit: '20 Mar 2026', nextVisit: '27 Mar 2026', status: 'Urgent' },
    { id: 'PAT-004', name: 'Emma Wilson', age: 28, condition: 'Asthme', lastVisit: '1 Mar 2026', nextVisit: '1 Mai 2026', status: 'Stable' },
  ];

  get filteredPatients(): DoctorPatient[] {
    const t = this.searchTerm.toLowerCase();
    return !t ? this.patients : this.patients.filter(p => p.name.toLowerCase().includes(t) || p.condition.toLowerCase().includes(t));
  }

  getStatusClass(status: DoctorPatient['status']): string {
    const map: Record<DoctorPatient['status'], string> = {
      'Stable': 'status--active',
      'Suivi requis': 'status--pending',
      'Urgent': 'status--urgent',
    };
    return map[status];
  }
}
